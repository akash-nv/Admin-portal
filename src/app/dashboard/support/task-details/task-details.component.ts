import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Editor } from '../../../ui-components/quill-editor/quill-editor.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SplitterComponent } from '../../../ui-components/splitter/splitter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInput } from '@angular/material/input';
import {
  DatePipe,
  NgStyle,
  NgTemplateOutlet,
  UpperCasePipe,
} from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '../../../ui-components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from '../../../ui-components/breadcrumb/breadcrumb.service';
import { InitialsPipe } from '../../../core/pipes/initials.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  darkenHSL,
  getRandomLightColor,
} from '../../../core/helpers/random-color.helper';
import { DropDownAnimation, rotateAnimation } from '../../animation';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RelativeTimePipe } from '../../../core/pipes/relative-time.pipe';
import { MatSelectModule } from '@angular/material/select';

const MY_DAYJS_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD', // Format for parsing input dates
  },
  display: {
    dateInput: 'MMM DD', // Format displayed in the input field
    monthYearLabel: 'MMM YYYY', // Format for month/year in the calendar
    dateA11yLabel: 'DD MMM YYYY', // Accessibility label for dates
    monthYearA11yLabel: 'MMMM YYYY', // Accessibility label for month/year
  },
};

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    MatIcon,
    Editor,
    MatTabsModule,
    SplitterComponent,
    MatInput,
    MatDatepickerModule,
    MatMenuModule,
    NgStyle,
    MatDividerModule,
    UpperCasePipe,
    MatTooltip,
    BreadcrumbComponent,
    InitialsPipe,
    MatFormFieldModule,
    MatInput,
    DatePipe,
    FormsModule,
    RelativeTimePipe,
    NgTemplateOutlet,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DAYJS_FORMATS },
    DatePipe,
  ],
  animations: [DropDownAnimation, rotateAnimation],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  breadcrumbService = inject(BreadcrumbService);
  cdr = inject(ChangeDetectorRef);
  isReadonly = true;
  today = new Date();
  isWrapFields = false;
  detailsContainerEle = viewChild.required<ElementRef>('detailsContainer');
  isSource: WritableSignal<boolean> = signal(false);
  isTicketInfo: WritableSignal<boolean> = signal(true);

  status = new FormControl<any>(0);
  assignees = new FormControl<any>({});
  collaborator = new FormControl<any>([]);
  priority = new FormControl<any>(-1);
  selectedBadges = new FormControl<any>([]);
  environment = new FormControl<string>('Developemnt');
  areaOfIssue = new FormControl<string>('Assessment');
  clinic = new FormControl<string>('clinic 1');
  PreferredContact = new FormControl<string>('Email');

  title =
    "Investigate the reported issue by replicating the customer's scenario.";
  priorities = [
    { label: 'Urgent', color: 'red', selected: true },
    { label: 'High', color: 'orange', selected: false },
    { label: 'Normal', color: 'blue', selected: false },
    { label: 'Low', color: 'gray', selected: false },
  ];

  buckets = [
    { label: 'todo', color: '#6b7280', selected: true },
    { label: 'in progress', color: '#3b82f6', selected: false },
    { label: 'in review', color: '#6366f1', selected: false },
    { label: 'done', color: '#22c55e', selected: false },
  ];

  badges: Array<any> = [
    { label: 'Sell', selected: true },
    { label: 'Bug', selected: false },
    { label: 'Inquiry', selected: false },
    { label: 'Payment', selected: false },
    { label: 'Subscription', selected: false },
  ];

  collaborators: Array<any> = [
    {
      value: 'John Doe',
      email: 'john.doe@example.com',
      selected: false,
    },
    {
      value: 'Jane Smith',
      email: 'jane.smith@example.com',
      selected: true,
    },
    {
      value: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      selected: false,
    },
    {
      value: 'Bob Brown',
      email: 'bob.brown@example.com',
      selected: true,
    },
    {
      value: 'Charlie Williams',
      email: 'charlie.williams@example.com',
      selected: false,
    },
    {
      value: 'Emma Davis',
      email: 'emma.davis@example.com',
      selected: true,
    },
    {
      value: 'Liam Miller',
      email: 'liam.miller@example.com',
      selected: false,
    },
    {
      value: 'Sophia Wilson',
      email: 'sophia.wilson@example.com',
      selected: true,
    },
    {
      value: 'Ethan Moore',
      email: 'ethan.moore@example.com',
      selected: false,
    },
    {
      value: 'Olivia Taylor',
      email: 'olivia.taylor@example.com',
      selected: true,
    },
    {
      value: 'Noah Anderson',
      email: 'noah.anderson@example.com',
      selected: false,
    },
    {
      value: 'Isabella Thomas',
      email: 'isabella.thomas@example.com',
      selected: true,
    },
    {
      value: 'Mason Jackson',
      email: 'mason.jackson@example.com',
      selected: false,
    },
    {
      value: 'Mia White',
      email: 'mia.white@example.com',
      selected: true,
    },
    {
      value: 'Lucas Harris',
      email: 'lucas.harris@example.com',
      selected: false,
    },
  ];

  data = `A customer reported experiencing an issue while filling out the dry eye assessment form. The issue might involve:

<ul><li>Difficulty submitting the form.</li><li>Missing or unclear instructions.</li><li>Validation errors or incorrect field behavior.</li><li>A problem with accessibility or responsiveness on specific devices/browsers.</li></ul>`;

  comments = [
    {
      name: 'Liam Carter',
      time: new Date().toISOString(),
      content: `We should confirm whether the issue occurs consistently or intermittently. This could help narrow down whether it's a system-wide bug or something specific to their setup.`,
    },
    {
      name: 'Sophia Turner',
      time: new Date(Date.now() - 1000).toISOString(),
      content: `Let’s ensure we are using the same version of the application as the customer to replicate their scenario accurately. Any version mismatch could lead to inconsistencies in testing.`,
    },
    {
      name: 'Noah Ellis',
      time: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      content: `It might be helpful to ask the customer for screenshots or a video of the issue. Sometimes visual evidence can clarify things we might miss during replication.`,
    },
    {
      name: 'Olivia Morgan',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      content: `Should we simulate their network conditions as well? A slow or unstable connection might be contributing to the issue.`,
    },
    {
      name: 'Ethan Scott',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      content: `Don’t forget to check the logs while replicating the scenario. They might provide critical insights into what’s causing the issue.`,
    },
    {
      name: 'Mia Bennett',
      time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      content: `It could be a good idea to replicate the scenario on multiple devices and operating systems to rule out any platform-specific bugs.`,
    },
    {
      name: 'Ava Wilson',
      time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      content: `Let’s verify if the customer is using any third-party extensions or plugins that might conflict with our application. Those are often overlooked but can cause issues.`,
    },
    {
      name: 'Lucas Adams',
      time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      content: `We should document every step while replicating the issue. This will make it easier to report our findings or guide the development team toward a solution.`,
    },
    {
      name: 'Isabella Ross',
      time: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      content: `If we can't replicate the issue, should we consider setting up a remote session with the customer to observe the problem directly?`,
    },
    {
      name: 'Henry Clark',
      time: new Date(Date.UTC(2020, 0, 1)).toISOString(),
      content: `Let’s also double-check the application’s configurations and settings on our end. A mismatch in default settings might be causing the issue.`,
    },
  ];

  activities = [
    {
      name: 'Sophia Bennett',
      action: 'Mentioned',
      mentionedUser: 'Jordan Smith',
      time: new Date().toISOString(),
      comment: `Hey Jordan, can you help us brainstorm ideas for the Employee statistics page layout? Your input on analytics design would be super valuable!`,
    },
    {
      name: 'Ethan Carter',
      action: 'Added a comment',
      time: new Date(Date.now() - 1000).toISOString(),
      comment: `I think we should focus on making the KPI section interactive. Maybe include filters for specific date ranges or departments. Thoughts?`,
    },
    {
      name: 'Olivia Harris',
      action: 'Mentioned',
      mentionedUser: 'Mia Johnson',
      time: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      comment: `Mia, what are your thoughts on including a feature for team comparisons in the statistics page?`,
    },
    {
      name: 'Liam Walker',
      action: 'Uploaded a file',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      fileName: 'KPI-Design-Mockup.pdf',
      comment: `Here's a draft of the initial KPI design layout for review. Let me know what needs adjustment!`,
    },
    {
      name: 'Emma Wilson',
      action: 'Added a comment',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      comment: `Should we include a "performance trends" section? It might help visualize progress over time more effectively.`,
    },
    {
      name: 'Noah Brown',
      action: 'Mentioned',
      mentionedUser: 'Ava Reynolds',
      time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      comment: `Ava, can you provide insights into how we should structure the employee feedback metrics?`,
    },
    {
      name: 'Sophia Bennett',
      action: 'Added a comment',
      time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      comment: `The design should prioritize simplicity. We want the platform to be intuitive for all users, especially those who are less tech-savvy.`,
    },
    {
      name: 'Lucas Adams',
      action: 'Attached a link',
      time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      link: 'https://example.com/inspiration-ideas',
      comment: `I found this great article on dashboard designs. Might be worth reviewing for inspiration.`,
    },
    {
      name: 'Henry Clark',
      action: 'Mentioned',
      mentionedUser: 'Calum Tyler',
      time: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      comment: `Calum, should we add customizable KPI widgets to the page? That way, teams can focus on their priorities.`,
    },
    {
      name: 'Olivia Morgan',
      action: 'Added a comment',
      time: new Date(Date.UTC(2020, 0, 1)).toISOString(),
      comment: `Don’t forget to test the design on mobile devices. Many managers might access the dashboard on their phones.`,
    },
  ];

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['ticketId']) {
        this.breadcrumbService.addBreadcrumb({
          label: 'Tickets',
          url: `/support/tickets`,
        });
        this.breadcrumbService.addBreadcrumb({
          label: 'CSI-T-123456',
          url: `/support/tickets/${params['ticketId']}`,
        });
      }
    });

    this.collaborators.forEach((collaborator) => {
      const bgColor = getRandomLightColor(); // Random light background
      const color = darkenHSL(bgColor, 30);
      collaborator.bgColor = '';
    });
  }

  onResize(event: any) {
    if (event.sizes[0] < 50) {
      this.isWrapFields = true;
    } else {
      this.isWrapFields = false;
    }
  }

  nextBucket(event: any) {
    event.stopPropagation();
    if (this.status.value === this.buckets.length -1) this.status.setValue(0);
    else this.status.setValue(this.status.value + 1);
  }

  syncContent(event: any, header: any) {
    if (event.target) {
      header.innerText = event.target.value;
      header.scrollTop = event.target.scrollTop;
      this.cdr.detectChanges();
    }
  }

  preventEnter(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
}
