import { Component, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Editor } from '../../ui-components/quill-editor/quill-editor.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatChipsModule,
    Editor,
    FormsModule,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule
],
animations: [
  trigger('expandCollapse', [
    state('collapsed', style({ height: '100px', overflow: 'hidden', opacity: 1 })),
    state('expanded', style({ height: '*', overflow: 'hidden', opacity: 1 })),
    transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
  ])
],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  searchText = new FormControl('');
  today = new Date();
  isEdit = false;
  data = `<p class="mb-4">
          This note is focused on brainstorming creative ideas for our upcoming project. The primary goal is to
          generate as many innovative ideas as possible, no matter how unconventional they may seem. Here are some
          thoughts from the session:
        </p>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Idea 1:</strong> Leverage AI to create personalized customer journeys.</li>
          <li><strong>Idea 2:</strong> Implement augmented reality in our marketing campaigns.</li>
          <li><strong>Idea 3:</strong> Develop a community platform for customer engagement.</li>
          <li><strong>Idea 4:</strong> Experiment with gamification to improve user retention.</li>
          <!-- Add more content as needed -->
        </ul>
        <p class="mt-4">
          Further action items include setting up a follow-up meeting to discuss feasibility, assigning research
          roles, and drafting a preliminary roadmap for potential project phases.
        </p>`
  addNote: WritableSignal<boolean> = signal(false);
}
