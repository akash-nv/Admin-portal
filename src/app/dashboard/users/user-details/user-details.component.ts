import { Component, inject, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../ui-components/breadcrumb/breadcrumb.service';
import { MatTabsModule } from '@angular/material/tabs';
import { ComingSoonComponent } from "../../coming-soon/coming-soon.component";
import { AuditsComponent } from "../../audits/audits.component";
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { NotesComponent } from "../../notes/notes.component";
import { UserAssigmentComponent } from "./user-assigment/user-assigment.component";

@Component({
  selector: 'app-user-permission',
  standalone: true,
  imports: [
    MatIconModule,
    MatTabsModule,
    ComingSoonComponent,
    AuditsComponent,
    NotesComponent,
    UserAssigmentComponent
],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserPermissionComponent {
  
}
