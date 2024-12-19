import {
  isPlatformServer,
  NgClass,
  NgStyle,
  NgTemplateOutlet,
} from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
  Signal,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  WritableSignal,
  afterNextRender,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  EditorInitEvent,
  EditorSelectionChangeEvent,
  EditorTextChangeEvent,
} from './quill.interface';
import QuillBetterTable from 'quill-better-table';
import Quill from 'quill';
import { PopoverDirective } from '../../core/directive/popover.directive';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';
import hljs from 'highlight.js';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
// import BlotFormatter from 'quill-blot-formatter';
import ImageUploader from 'quill-image-uploader';
// import { Mention, MentionBlot } from 'quill-mention';
import { ThemeService } from '../../core/services/theme.service';

const fileTypeMap: { [key: string]: string } = {
  'image/jpg': 'image',
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/gif': 'image',
  'video/mp4': 'video',
  'video/webm': 'video',
  'video/mkv': 'video',
};

const links: { [key: string]: string } = {
  image:
    'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  video:
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  pdf: 'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf',
};

Quill.register(
  {
    'modules/better-table': QuillBetterTable,
    // 'modules/blotFormatter': BlotFormatter,
    'modules/imageUploader': ImageUploader,
    // 'blots/mention': MentionBlot,
    // 'modules/mention': Mention,
  },
  true
);

export declare type Nullable<T = void> = T | null | undefined;
function isElement(obj: any) {
  return typeof HTMLElement === 'object'
    ? obj instanceof HTMLElement
    : obj &&
        typeof obj === 'object' &&
        obj !== null &&
        obj.nodeType === 1 &&
        typeof obj.nodeName === 'string';
}

function findSingle(element: any, selector: string): any {
  return isElement(element) ? element.querySelector(selector) : null;
}

export const EDITOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Editor),
  multi: true,
};
/**
 * Editor groups a collection of contents in tabs.
 * @group Components
 */
@Component({
  selector: 'app-quill-editor',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    SafeHtmlPipe,
    PopoverDirective,
    MatTooltip,
    MatIcon,
    NgTemplateOutlet,
  ],
  providers: [EDITOR_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'p-element',
  },
})
export class Editor implements AfterContentInit, ControlValueAccessor {
  themeService = inject(ThemeService);
  appTheme: Signal<string> = computed(() => this.themeService.currentTheme());
  icons: any = Quill.import('ui/icons');
  mentionList = input<any[]>([]);
  /**
   * Inline style of the container.
   * @group Props
   */
  @Input() style: { [klass: string]: any } | null | undefined;
  /**
   * Style class of the container.
   * @group Props
   */
  @Input() styleClass: string = '';
  /**
   * Placeholder text to show when editor is empty.
   * @group Props
   */
  @Input() placeholder: string | undefined = 'Type anything to remember';
  /**
   * Whitelist of formats to display, see here for available options.
   * @group Props
   */
  @Input() formats: string[] | undefined;
  /**
   * Modules configuration of Editor, see here for available options.
   * @group Props
   */
  @Input() modules: object | undefined;
  /**
   * DOM Element or a CSS selector for a DOM Element, within which the editor’s p elements (i.e. tooltips, etc.) should be confined. Currently, it only considers left and right boundaries.
   * @group Props
   */
  @Input() bounds: HTMLElement | string | undefined;
  /**
   * DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars (i.e. overflow-y: auto), if is has been changed from the default ql-editor with custom CSS. Necessary to fix scroll jumping bugs when Quill is set to auto grow its height, and another ancestor container is responsible from the scrolling..
   * @group Props
   */
  @Input() scrollingContainer: HTMLElement | string | undefined;
  /**
   * Shortcut for debug. Note debug is a static method and will affect other instances of Quill editors on the page. Only warning and error messages are enabled by default.
   * @group Props
   */
  @Input() debug: string | undefined;

  @Input() theme: 'snow' | 'bubble' = 'snow';
  /**
   * Whether to instantiate the editor to read-only mode.
   * @group Props
   */
  @Input() get readonly(): boolean {
    return this._readonly();
  }
  set readonly(val: boolean) {
    this._readonly.set(val);

    if (this.quill) {
      if (this._readonly()) this.quill.disable();
      else this.quill.enable();
    }
  }
  /**
   * Callback to invoke when the quill modules are loaded.
   * @param {EditorInitEvent} event - custom event.
   * @group Emits
   */
  @Output() onInit: EventEmitter<EditorInitEvent> =
    new EventEmitter<EditorInitEvent>();
  /**
   * Callback to invoke when text of editor changes.
   * @param {EditorTextChangeEvent} event - custom event.
   * @group Emits
   */
  @Output() onTextChange: EventEmitter<EditorTextChangeEvent> =
    new EventEmitter<EditorTextChangeEvent>();
  /**
   * Callback to invoke when selection of the text changes.
   * @param {EditorSelectionChangeEvent} event - custom event.
   * @group Emits
   */
  @Output() onSelectionChange: EventEmitter<EditorSelectionChangeEvent> =
    new EventEmitter<EditorSelectionChangeEvent>();

  onFocus = output();
  onBlur = output();

  value: Nullable<string>;

  delayedCommand: Function | null = null;

  _readonly: WritableSignal<boolean> = signal(false);

  onModelChange: Function = () => {};

  onModelTouched: Function = () => {};

  quill: any;

  dynamicQuill: any;

  headerTemplate: Nullable<TemplateRef<any>>;

  private get isAttachedQuillEditorToDOM(): boolean | undefined {
    return this.quillElements?.editorElement?.isConnected;
  }

  private quillElements!: {
    editorElement: HTMLElement;
    toolbarElement: HTMLElement;
  };

  @ViewChild('bubbleContent') bubbleContentRef!: TemplateRef<any>;
  @ViewChild('qlTableFormatter') qlTableFormatterRef!: TemplateRef<any>;
  @ViewChild(PopoverDirective) popoverDirective!: PopoverDirective;

  qlTableRect: WritableSignal<any> = signal(null);
  qlTableRowRect: WritableSignal<any> = signal(null);
  qlTableColRect: WritableSignal<any> = signal(null);

  constructor(
    public el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    /**
     * Read or write the DOM once, when initializing non-Angular (Quill) library.
     */
    afterNextRender(() => {
      this.initQuillElements();
      this.initQuillEditor();
    });
  }

  ngAfterContentInit() {
    // this.templates.forEach((item) => {
    //     switch (item.getType()) {
    //         case 'header':
    //             this.headerTemplate = item.template;
    //             break;
    //     }
    // });
  }

  writeValue(value: any): void {
    this.value = value;

    if (this.quill) {
      if (value) {
        const command = (): void => {
          this.quill.setContents(
            this.quill.clipboard.convert(
              this.dynamicQuill.version.startsWith('2')
                ? { html: this.value }
                : this.value
            )
          );
        };

        if (this.isAttachedQuillEditorToDOM) {
          command();
        } else {
          this.delayedCommand = command;
        }
      } else {
        const command = (): void => {
          this.quill.setText('');
        };

        if (this.isAttachedQuillEditorToDOM) {
          command();
        } else {
          this.delayedCommand = command;
        }
      }
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  getQuill() {
    return this.quill;
  }

  private initQuillEditor(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    /**
     * Importing Quill at top level, throws `document is undefined` error during when
     * building for SSR, so this dynamically loads quill when it's in browser module.
     */
    if (!this.dynamicQuill) {
      import('quill')
        .then((quillModule: any) => {
          this.dynamicQuill = quillModule.default;
          this.createQuillEditor();
        })
        .catch((e) => console.error(e.message));
    } else {
      this.createQuillEditor();
    }
  }

  private createQuillEditor(): void {
    this.initQuillElements();

    const { toolbarElement, editorElement } = this.quillElements;
    let defaultModule = { toolbar: toolbarElement };
    let modules = this.modules
      ? { ...defaultModule, ...this.modules }
      : defaultModule;
    this.quill = new this.dynamicQuill(editorElement, {
      modules: {
        ...modules,
        syntax: { hljs },
        table: false,
        'better-table': {
        operationMenu: {
          items: {
            unmergeCells: {
              text: 'Another unmerge cells name'
            }
          }
        }
      },
      },
      placeholder: this.placeholder,
      readOnly: this.readonly,
      theme: this.theme,
      formats: this.formats,
      bounds: this.bounds,
      debug: this.debug,
      scrollingContainer: this.scrollingContainer,
    });

    const isQuill2 = this.dynamicQuill.version.startsWith('2');

    if (this.value) {
      this.quill.setContents(
        this.quill.clipboard.convert(
          isQuill2 ? { html: this.value } : this.value
        )
      );
    }

    this.quill.on(
      'text-change',
      (delta: any, oldContents: any, source: any) => {
        if (source === 'user') {
          let html = isQuill2
            ? this.quill.getSemanticHTML()
            : findSingle(editorElement, '.ql-editor').innerHTML;
          let text = this.quill.getText().trim();
          if (html === '<p><br></p>') {
            html = null;
          }

          this.onTextChange.emit({
            htmlValue: html,
            textValue: text,
            delta: delta,
            source: source,
          });

          this.onModelChange(html);
          this.onModelTouched();
        }
      }
    );

    this.quill.on(
      'selection-change',
      (range: string, oldRange: string, source: string) => {
        if (range?.length && !this.readonly && this.theme === 'bubble') {
          this.getSelectedTextPosition();
        }
        if (range) {
          this.onFocus.emit();
          this.getTableSelection();
        } else {
          this.onBlur.emit();
        }
        this.onSelectionChange.emit({
          range: range,
          oldRange: oldRange,
          source: source,
        });
      }
    );

    this.onInit.emit({
      editor: this.quill,
    });
  }

  private initQuillElements(): void {
    if (!this.quillElements) {
      this.quillElements = {
        editorElement: findSingle(
          this.el.nativeElement,
          'div.p-editor-content'
        ),
        toolbarElement: findSingle(
          this.el.nativeElement,
          'div.p-editor-toolbar'
        ),
      };
    }
  }

  insertTable() {
    let tableModule = this.getQuill().getModule('better-table');
    tableModule.insertTable(3, 3);
  }

  getSelectedTextPosition(): DOMRect | null {
    const selection = window.getSelection();

    // Check if there's a valid selection
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0); // Get the first range
      const rect = range.getBoundingClientRect(); // Get the bounding rectangle
      this.popoverDirective.openPopover(this.bubbleContentRef, rect);
      return rect;
    }

    return null;
  }

  textFormat(type: string) {
    const range = this.getQuill().getSelection(); // Get the selected range
    if (range) {
      const isTyped = this.getQuill().getFormat(range)[type]; // Check if bold is applied
      this.getQuill().format(type, !isTyped); // Toggle bold
    }
  }

  toggleFormat(type: string, value: any) {
    const range = this.getQuill().getSelection(); // Get the selected range
    if (range) {
      const isMatch = this.checkStatus(type) === value;
      this.getQuill().format(type, isMatch ? false : value); // Toggle bold
    }
  }

  textLink() {
    const range = this.getQuill().getSelection(); // Get the selected range
    if (range && range.length > 0) {
      const isLinked = this.getQuill().getFormat(range)['link'];
      if (!isLinked) {
        const url = prompt('Enter the URL:'); // Prompt user for a URL
        this.getQuill().format('link', url);
      } else {
        this.getQuill().format('link', false);
      }
    } else {
      alert('Please select some text to link!');
    }
  }

  codeFormat(type: string) {
    const range = this.getQuill().getSelection(); // Get the selected range
    if (range && range.length > 0) {
      const currentFormat = this.getQuill().getFormat(range);
      const isCodeBlock = currentFormat[type];
      this.getQuill().format(type, isCodeBlock ? false : true); // Apply inline code formatting
    } else {
      alert('Please select text to format as inline code.');
    }
  }

  checkStatus(type: string) {
    const range = this.getQuill()?.getSelection(); // Get the selected range
    if (range) {
      return this.getQuill().getFormat(range)[type];
    }
    return false;
  }

  fileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      try {
        // Insert a temporary placeholder
        const range = this.getQuill().getSelection(true);
        const placeholderId = `placeholder-${Date.now()}`;
        this.getQuill().insertEmbed(
          range.index,
          fileTypeMap[file.type],
          placeholderId
        );

        // Upload the image
        const uploadedImageUrl = this.uploadImageToServer(file);

        // Replace the placeholder with the uploaded image
        this.replaceImagePlaceholder(
          placeholderId,
          uploadedImageUrl,
          fileTypeMap[file.type]
        );
        // this.embedFilePreview(links.video, fileTypeMap.mp4, file.name);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  }

  uploadImageToServer(file: any) {
    // const formData = new FormData();
    // formData.append('image', file);

    // Replace with your actual image upload API endpoint
    return links[fileTypeMap[file.type]];
  }

  // Replace placeholder with the uploaded image
  replaceImagePlaceholder(
    placeholderId: any,
    uploadedImageUrl: string,
    type: string
  ) {
    const delta = this.getQuill().getContents();
    delta.ops.forEach((op: any, index: number) => {
      if (op.insert && op.insert[type] === placeholderId) {
        this.getQuill().deleteText(index, 1); // Remove the placeholder
        this.getQuill().insertEmbed(index, type, uploadedImageUrl); // Insert the uploaded image
      }
    });
  }

  getTableSelection() {
    const range = this.getQuill().getSelection(true);
    let module = this.quill.getModule('better-table');
    module.getTable()  // current selection
    console.log(module.getTable(range));
  }

  @HostListener('document:mouseover', ['$event'])
  onTableEvent(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Check if the hovered element matches the table selector
    if (target && target.matches('table.quill-better-table td, table.quill-better-table td p')) {
        // this.createOverlay(event);
    } else {
      // this.qlTableColRect.set(null);
      // this.qlTableRowRect.set(null);
      // this.qlTableRect.set(null); 
    }
  }

  @HostListener('document:mouseleave', ['$event'])
  onTableEventLeave(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target && target.matches('table.quill-better-table')) {
      this.qlTableColRect.set(null);
      this.qlTableRowRect.set(null);
      this.qlTableRect.set(null); 
    }
  }

  createOverlay(event: any) {
    const rowId = event.target.getAttribute('data-row')
    const row = document.querySelector(`[data-row=${rowId}]`) as any;
    this.qlTableColRect.set(event.target.getBoundingClientRect());
    this.qlTableRowRect.set(row.getBoundingClientRect());
    this.qlTableRect.set(row.parentElement.getBoundingClientRect()); 
  }
}
