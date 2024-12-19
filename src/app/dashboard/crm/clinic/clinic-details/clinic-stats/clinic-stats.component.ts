import { Component, ChangeDetectionStrategy, input, WritableSignal, signal, inject, Signal, computed } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatricsComponent } from '../../../../reports/matrics/matrics.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { map, Observable, startWith } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ResponsiveDrawerComponent } from "../../../../../ui-components/responsive-drawer/responsive-drawer.component";
import { ThemeService } from '../../../../../core/services/theme.service';

@Component({
  selector: 'app-clinic-stats',
  standalone: true,
  imports: [MatIcon, MatricsComponent, MatTooltip, MatMenuModule, MatSlideToggle, MatAutocompleteModule, MatFormFieldModule, MatInput, MatSelectModule, AsyncPipe, ReactiveFormsModule, MatButtonModule, NgClass, ResponsiveDrawerComponent],
  templateUrl: './clinic-stats.component.html',
  styleUrl: './clinic-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicStatsComponent {
  themeService = inject(ThemeService);
  clinicData = input<any>({});
  myControl = new FormControl('');
  options: string[] = ['Clinical Usage', 'User Activity', 'Patient communication', 'Questionnaire activity', 'Assessment activity', 'Support tickets', 'Invoices'];
  filteredOptions!: Observable<string[]>;
  theme: Signal<string> = computed(() => this.themeService.currentTheme());

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  clinicMatrix = [
    {
      title: 'Paid Clinics',
      value: 10,
    },
    {
      title: 'Unpaid Clinics',
      value: 5,
    },
    {
      title: 'Total Clinics',
      value: 15,
    },
  ];

  ticketMatrix = [
    {
      title: 'Open',
      value: 10,
      icon: `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 280q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`,
    },
    {
      title: 'Pending',
      value: 5,
      icon: `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-420q25 0 42.5-17.5T340-480q0-25-17.5-42.5T280-540q-25 0-42.5 17.5T220-480q0 25 17.5 42.5T280-420Zm200 0q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm200 0q25 0 42.5-17.5T740-480q0-25-17.5-42.5T680-540q-25 0-42.5 17.5T620-480q0 25 17.5 42.5T680-420ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`,
    },
    {
      title: 'Closed',
      value: 15,
      icon: `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>`,
    },
  ];

  invoiceMatrix = [
    {
      title: 'Overdue',
      value: 10,
    },
    {
      title: 'Due',
      value: 5,
    },
    {
      title: 'Paid',
      value: 15,
    },
  ];

  usage = [
    {
      title: 'This month',
      tags: [
        {
          title: 'Total patients',
          description: 'Total patients in your CSI clinic portal',
          value: 400,
          comparison: this.getComparisonValue('Total patients', 'Last month'),
          outOf: 100,
        },
        {
          title: 'New patients',
          description: 'New patients added this month',
          value: 10,
          comparison: this.getComparisonValue('New patients', 'Last month'),
          outOf: 100,
        },
        {
          title: 'Questionnaires sent',
          description: 'Questionnaire invites sent to patients',
          value: 60,
          comparison: this.getComparisonValue(
            'Questionnaires sent',
            'Last month'
          ),
          outOf: 100,
        },
        {
          title: 'Questionnaires opened',
          description: 'Questionnaire invites opened by patients',
          value: 40,
          comparison: this.getComparisonValue(
            'Questionnaires opened',
            'Last month'
          ),
          outOf: 100,
        },
        {
          title: 'Questionnaires started',
          description: 'Questionnaires started by patients',
          value: 30,
          comparison: this.getComparisonValue(
            'Questionnaires started',
            'Last month'
          ),
          outOf: 100,
        },
        {
          title: 'Questionnaires filled',
          description: 'Questionnaires completed by patients',
          value: 13,
          comparison: this.getComparisonValue(
            'Questionnaires filled',
            'Last month'
          ),
          outOf: 100,
        },
        {
          title: 'Intake forms sent',
          description: 'Intake form invites sent to patients',
          value: 45,
          comparison: this.getComparisonValue(
            'Intake forms sent',
            'Last month'
          ),
          outOf: 100,
        },
        {
          title: 'Intake forms opened',
          description: 'Intake form invites opened by patients',
          value: 30,
          comparison: this.getComparisonValue(
            'Intake forms opened',
            'Last month'
          ),
          outOf: 100,
        },
        {
          title: 'Intake forms started',
          description: 'Intake forms started by patients',
          value: 20,
          comparison: this.getComparisonValue(
            'Intake forms started',
            'Last month'
          ),
          outOf: 100,
        },
        {
          title: 'Intake forms filled',
          description: 'Intake forms completed by patients',
          value: 10,
          comparison: this.getComparisonValue(
            'Intake forms filled',
            'Last month'
          ),
          outOf: 100,
        },
        {
          title: 'Assessments',
          description: 'Assessments completed by clinic staff',
          value: 30,
          comparison: this.getComparisonValue('Assessments', 'Last month'),
          outOf: 100,
        },
        {
          title: 'Billed patients',
          description: 'Patients billed after assessments',
          value: 10,
          comparison: this.getComparisonValue('Billed patients', 'Last month'),
          outOf: 100,
        },
        {
          title: 'Referrals sent',
          description: 'Referrals sent to other clinics',
          value: 12,
          comparison: this.getComparisonValue('Referrals sent', 'Last month'),
          outOf: 100,
        },
        {
          title: 'Referrals received',
          description: 'Referrals received from other clinics',
          value: 11,
          comparison: this.getComparisonValue(
            'Referrals received',
            'Last month'
          ),
          outOf: 100,
        },
      ],
    },
    {
      title: 'Last month',
      tags: [
        {
          title: 'Total patients',
          description: 'Total patients in your CSI clinic portal',
          value: 300,
          comparison: this.getComparisonValue('Total patients', 'This month'),
          outOf: 100,
        },
        {
          title: 'New patients',
          description: 'New patients added last month',
          value: 6,
          comparison: this.getComparisonValue('New patients', 'This month'),
          outOf: 100,
        },
        {
          title: 'Questionnaires sent',
          description: 'Questionnaire invites sent to patients',
          value: 50,
          comparison: this.getComparisonValue(
            'Questionnaires sent',
            'This month'
          ),
          outOf: 100,
        },
        {
          title: 'Questionnaires opened',
          description: 'Questionnaire invites opened by patients',
          value: 30,
          comparison: this.getComparisonValue(
            'Questionnaires opened',
            'This month'
          ),
          outOf: 100,
        },
        {
          title: 'Questionnaires started',
          description: 'Questionnaires started by patients',
          value: 20,
          comparison: this.getComparisonValue(
            'Questionnaires started',
            'This month'
          ),
          outOf: 100,
        },
        {
          title: 'Questionnaires filled',
          description: 'Questionnaires completed by patients',
          value: 8,
          comparison: this.getComparisonValue(
            'Questionnaires filled',
            'This month'
          ),
          outOf: 100,
        },
        {
          title: 'Intake forms sent',
          description: 'Intake form invites sent to patients',
          value: 45,
          comparison: this.getComparisonValue(
            'Intake forms sent',
            'This month'
          ),
          outOf: 100,
        },
        {
          title: 'Intake forms opened',
          description: 'Intake form invites opened by patients',
          value: 30,
          comparison: this.getComparisonValue(
            'Intake forms opened',
            'This month'
          ),
          outOf: 100,
        },
        {
          title: 'Intake forms started',
          description: 'Intake forms started by patients',
          value: 20,
          comparison: this.getComparisonValue(
            'Intake forms started',
            'This month'
          ),
          outOf: 100,
        },
        {
          title: 'Intake forms filled',
          description: 'Intake forms completed by patients',
          value: 10,
          comparison: this.getComparisonValue(
            'Intake forms filled',
            'This month'
          ),
          outOf: 100,
        },
        {
          title: 'Assessments',
          description: 'Assessments completed by clinic staff',
          value: 5,
          comparison: this.getComparisonValue('Assessments', 'This month'),
          outOf: 100,
        },
        {
          title: 'Billed patients',
          description: 'Patients billed after assessments',
          value: 6,
          comparison: this.getComparisonValue('Billed patients', 'This month'),
          outOf: 100,
        },
        {
          title: 'Referrals sent',
          description: 'Referrals sent to other clinics',
          value: 12,
          comparison: this.getComparisonValue('Referrals sent', 'This month'),
          outOf: 100,
        },
        {
          title: 'Referrals received',
          description: 'Referrals received from other clinics',
          value: 11,
          comparison: this.getComparisonValue(
            'Referrals received',
            'This month'
          ),
          outOf: 100,
        },
      ],
    },
  ];

  userActivity = [
    {
      title: 'This month',
      tags: [
        {
          title: 'Successful logins',
          description: 'Successful logins to the CSI clinic portal',
          value: 70,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Successful logins',
            'Last month'
          ),
        },
        {
          title: 'Failed logins',
          description: 'Failed logins to the CSI clinic portal',
          value: 20,
          outOf: 100,
          comparison: this.getComparisonValue('Failed logins', 'Last month'),
        },
        {
          title: 'Reset password requests',
          description: 'Reset password requests for the CSI clinic portal',
          value: 10,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Reset password requests',
            'Last month'
          ),
        },
        {
          title: 'Reset password success',
          description: 'Reset password requests completed successfully',
          value: 3,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Reset password success',
            'Last month'
          ),
        },
        {
          title: 'Session duration (Minutes)',
          description: 'Average duration of user session in minutes',
          value: 10,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Session duration (Minutes)',
            'Last month'
          ),
        },
        {
          title: 'Page visits per session',
          description: 'Average number of pages visited per session',
          value: 35,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Page visits per session',
            'Last month'
          ),
        },
        {
          title: 'New users',
          description: 'New users added to the CSI clinic portal',
          value: 10,
          outOf: 100,
          comparison: this.getComparisonValue('New users', 'Last month'),
        },
        {
          title: 'Deleted users',
          description: 'Users deleted from the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue('Deleted users', 'Last month'),
        },
        {
          title: 'Enabled users',
          description: 'Users enabled in the CSI clinic portal',
          value: 10,
          outOf: 100,
          comparison: this.getComparisonValue('Enabled users', 'Last month'),
        },
        {
          title: 'Disabled users',
          description: 'Users disabled in the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue('Disabled users', 'Last month'),
        },
        {
          title: 'Enabled doctors',
          description: 'Doctors enabled in the CSI clinic portal',
          value: 10,
          outOf: 100,
          comparison: this.getComparisonValue('Enabled doctors', 'Last month'),
        },
        {
          title: 'Disabled doctors',
          description: 'Doctors disabled in the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue('Disabled doctors', 'Last month'),
        },
        {
          title: 'Enabled staff',
          description: 'Staff enabled in the CSI clinic portal',
          value: 10,
          outOf: 100,
          comparison: this.getComparisonValue('Enabled staff', 'Last month'),
        },
        {
          title: 'Disabled staff',
          description: 'Staff disabled in the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue('Disabled staff', 'Last month'),
        },
        {
          title: 'Daily active users',
          description: 'Daily active users in the CSI clinic portal',
          value: 10,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Daily active users',
            'Last month'
          ),
        },
        {
          title: 'Daily inactive users',
          description: 'Daily inactive users in the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Daily inactive users',
            'Last month'
          ),
        },
        {
          title: 'Weekly active users',
          description: 'Weekly active users in the CSI clinic portal',
          value: 10,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Weekly active users',
            'Last month'
          ),
        },
        {
          title: 'Weekly inactive users',
          description: 'Weekly inactive users in the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Weekly inactive users',
            'Last month'
          ),
        },
        {
          title: 'Monthly active users',
          description: 'Monthly active users in the CSI clinic portal',
          value: 10,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Monthly active users',
            'Last month'
          ),
        },
        {
          title: 'Monthly inactive users',
          description: 'Monthly inactive users in the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Monthly inactive users',
            'Last month'
          ),
        },
      ],
    },
    {
      title: 'Last month',
      tags: [
        {
          title: 'Successful logins',
          description: 'Successful logins to the CSI clinic portal',
          value: 55,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Successful logins',
            'Last month'
          ),
        },
        {
          title: 'Failed logins',
          description: 'Failed logins to the CSI clinic portal',
          value: 12,
          outOf: 100,
          comparison: this.getComparisonValue('Failed logins', 'Last month'),
        },
        {
          title: 'Reset password requests',
          description: 'Reset password requests for the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Reset password requests',
            'Last month'
          ),
        },
        {
          title: 'Reset password success',
          description: 'Reset password requests completed successfully',
          value: 2,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Reset password success',
            'Last month'
          ),
        },
        {
          title: 'Session duration (Minutes)',
          description: 'Average duration of user session in minutes',
          value: 23,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Session duration (Minutes)',
            'Last month'
          ),
        },
        {
          title: 'Page visits per session',
          description: 'Average number of pages visited per session',
          value: 12,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Page visits per session',
            'Last month'
          ),
        },
        {
          title: 'New users',
          description: 'New users added to the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue('New users', 'Last month'),
        },
        {
          title: 'Deleted users',
          description: 'Users deleted from the CSI clinic portal',
          value: 1,
          outOf: 100,
          comparison: this.getComparisonValue('Deleted users', 'Last month'),
        },
        {
          title: 'Enabled users',
          description: 'Users enabled in the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue('Enabled users', 'Last month'),
        },
        {
          title: 'Disabled users',
          description: 'Users disabled in the CSI clinic portal',
          value: 1,
          outOf: 100,
          comparison: this.getComparisonValue('Disabled users', 'Last month'),
        },
        {
          title: 'Enabled doctors',
          description: 'Doctors enabled in the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue('Enabled doctors', 'Last month'),
        },
        {
          title: 'Disabled doctors',
          description: 'Doctors disabled in the CSI clinic portal',
          value: 1,
          outOf: 100,
          comparison: this.getComparisonValue('Disabled doctors', 'Last month'),
        },
        {
          title: 'Enabled staff',
          description: 'Staff enabled in the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue('Enabled staff', 'Last month'),
        },
        {
          title: 'Disabled staff',
          description: 'Staff disabled in the CSI clinic portal',
          value: 1,
          outOf: 100,
          comparison: this.getComparisonValue('Disabled staff', 'Last month'),
        },
        {
          title: 'Daily active users',
          description: 'Daily active users in the CSI clinic portal',
          value: 7,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Daily active users',
            'Last month'
          ),
        },
        {
          title: 'Daily inactive users',
          description: 'Daily inactive users in the CSI clinic portal',
          value: 7,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Daily inactive users',
            'Last month'
          ),
        },
        {
          title: 'Weekly active users',
          description: 'Weekly active users in the CSI clinic portal',
          value: 23,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Weekly active users',
            'Last month'
          ),
        },
        {
          title: 'Weekly inactive users',
          description: 'Weekly inactive users in the CSI clinic portal',
          value: 4,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Weekly inactive users',
            'Last month'
          ),
        },
        {
          title: 'Monthly active users',
          description: 'Monthly active users in the CSI clinic portal',
          value: 12,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Monthly active users',
            'Last month'
          ),
        },
        {
          title: 'Monthly inactive users',
          description: 'Monthly inactive users in the CSI clinic portal',
          value: 3,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Monthly inactive users',
            'Last month'
          ),
        },
      ],
    },
  ];

  patientCommunication = [
    {
      title: 'This month',
      tags: [
        {
          title: 'Total texts',
          description: 'Total texts sent to patients',
          value: 1000,
          comparison: this.getComparisonValue('Total texts', 'Last month'),
        },
        {
          title: 'Failed texts',
          description: 'Failed / undelivered texts to patients',
          value: 35,
          comparison: this.getComparisonValue('Failed texts', 'Last month'),
        },
        {
          title: 'Delivery rate',
          description: 'Percentage of texts delivered to patients',
          value: 90,
          outOf: 100,
          comparison: this.getComparisonValue('Delivery rate', 'Last month'),
        },
        {
          title: 'Open rate',
          description: 'Percentage of texts opened by patients',
          value: 30,
          outOf: 100,
          comparison: this.getComparisonValue('Open rate', 'Last month'),
        },
        {
          title: 'Welcome texts',
          description: 'Welcome texts sent to patients',
          value: 10,
          outOf: 1000,
          comparison: this.getComparisonValue('Welcome texts', 'Last month'),
        },
        {
          title: 'Questionnaire texts',
          description: 'Questionnaire invite texts sent to patients',
          value: 30,
          outOf: 1000,
          comparison: this.getComparisonValue(
            'Questionnaire texts',
            'Last month'
          ),
        },
        {
          title: 'Intake form texts',
          description: 'Intake form invite texts sent to patients',
          value: 13,
          outOf: 1000,
          comparison: this.getComparisonValue(
            'Intake form texts',
            'Last month'
          ),
        },
        {
          title: 'Patient app enrollment texts',
          description: 'Patient app enrollment invite texts sent to patients',
          value: 13,
          outOf: 1000,
          comparison: this.getComparisonValue(
            'Patient app enrollment texts',
            'Last month'
          ),
        },
        {
          title: 'Total emails',
          description: 'Total emails sent to patients',
          value: 300,
          comparison: this.getComparisonValue('Total emails', 'Last month'),
        },
        {
          title: 'Bounced emails',
          description: 'Emails that failed to be delivered to patients',
          value: 31,
          comparison: this.getComparisonValue('Bounced emails', 'Last month'),
        },
        {
          title: 'Delivery rate',
          description: 'Percentage of emails delivered to patients',
          value: 90,
          outOf: 100,
          comparison: this.getComparisonValue('Delivery rate', 'Last month'),
        },
        {
          title: 'Open rate',
          description: 'Percentage of emails opened by patients',
          value: 30,
          outOf: 100,
          comparison: this.getComparisonValue('Open rate', 'Last month'),
        },
        {
          title: 'Welcome emails',
          description: 'Welcome emails sent to patients',
          value: 10,
          outOf: 300,
          comparison: this.getComparisonValue('Welcome emails', 'Last month'),
        },
        {
          title: 'Questionnaire emails',
          description: 'Questionnaire invite emails sent to patients',
          value: 30,
          outOf: 300,
          comparison: this.getComparisonValue(
            'Questionnaire emails',
            'Last month'
          ),
        },
        {
          title: 'Intake form emails',
          description: 'Intake form invite emails sent to patients',
          value: 13,
          outOf: 300,
          comparison: this.getComparisonValue(
            'Intake form emails',
            'Last month'
          ),
        },
        {
          title: 'Patient app enrollment emails',
          description: 'Patient app enrollment invite emails sent to patients',
          value: 13,
          outOf: 300,
          comparison: this.getComparisonValue(
            'Patient app enrollment emails',
            'Last month'
          ),
        },
        {
          title: 'Referrals sent emails',
          description: 'Referrals sent emails sent to clinics',
          value: 13,
          outOf: 300,
          comparison: this.getComparisonValue(
            'Referrals sent emails',
            'Last month'
          ),
        },
        {
          title: 'Referrals received emails',
          description: 'Referrals received emails from clinics',
          value: 13,
          outOf: 300,
          comparison: this.getComparisonValue(
            'Referrals received emails',
            'Last month'
          ),
        },
      ],
    },
    {
      title: 'Last month',
      tags: [
        {
          title: 'Total texts',
          description: 'Total texts sent to patients',
          value: 1000,
          comparison: this.getComparisonValue('Total texts', 'This month'),
        },
        {
          title: 'Failed texts',
          description: 'Failed / undelivered texts to patients',
          value: 35,
          comparison: this.getComparisonValue('Failed texts', 'This month'),
        },
        {
          title: 'Delivery rate',
          description: 'Percentage of texts delivered to patients',
          value: 90,
          outOf: 100,
          comparison: this.getComparisonValue('Delivery rate', 'This month'),
        },
        {
          title: 'Open rate',
          description: 'Percentage of texts opened by patients',
          value: 30,
          outOf: 100,
          comparison: this.getComparisonValue('Open rate', 'This month'),
        },
        {
          title: 'Welcome texts',
          description: 'Welcome texts sent to patients',
          value: 10,
          outOf: 900,
          comparison: this.getComparisonValue('Welcome texts', 'This month'),
        },
        {
          title: 'Questionnaire texts',
          description: 'Questionnaire invite texts sent to patients',
          value: 30,
          outOf: 900,
          comparison: this.getComparisonValue(
            'Questionnaire texts',
            'This month'
          ),
        },
        {
          title: 'Intake form texts',
          description: 'Intake form invite texts sent to patients',
          value: 13,
          outOf: 900,
          comparison: this.getComparisonValue(
            'Intake form texts',
            'This month'
          ),
        },
        {
          title: 'Patient app enrollment texts',
          description: 'Patient app enrollment invite texts sent to patients',
          value: 13,
          outOf: 900,
          comparison: this.getComparisonValue(
            'Patient app enrollment texts',
            'This month'
          ),
        },
        {
          title: 'Total emails',
          description: 'Total emails sent to patients',
          value: 300,
          comparison: this.getComparisonValue('Total emails', 'This month'),
        },
        {
          title: 'Bounced emails',
          description: 'Emails that failed to be delivered to patients',
          value: 31,
          comparison: this.getComparisonValue('Bounced emails', 'This month'),
        },
        {
          title: 'Delivery rate',
          description: 'Percentage of emails delivered to patients',
          value: 90,
          outOf: 100,
          comparison: this.getComparisonValue('Delivery rate', 'This month'),
        },
        {
          title: 'Open rate',
          description: 'Percentage of emails opened by patients',
          value: 30,
          outOf: 100,
          comparison: this.getComparisonValue('Open rate', 'This month'),
        },
        {
          title: 'Welcome emails',
          description: 'Welcome emails sent to patients',
          value: 10,
          outOf: 300,
          comparison: this.getComparisonValue('Welcome emails', 'This month'),
        },
        {
          title: 'Questionnaire emails',
          description: 'Questionnaire invite emails sent to patients',
          value: 30,
          outOf: 300,
          comparison: this.getComparisonValue(
            'Questionnaire emails',
            'This month'
          ),
        },
        {
          title: 'Intake form emails',
          description: 'Intake form invite emails sent to patients',
          value: 13,
          outOf: 300,
          comparison: this.getComparisonValue(
            'Intake form emails',
            'This month'
          ),
        },
        {
          title: 'Patient app enrollment emails',
          description: 'Patient app enrollment invite emails sent to patients',
          value: 13,
          outOf: 300,
          comparison: this.getComparisonValue(
            'Patient app enrollment emails',
            'This month'
          ),
        },
        {
          title: 'Referrals sent emails',
          description: 'Referrals sent emails sent to clinics',
          value: 13,
          outOf: 300,
          comparison: this.getComparisonValue(
            'Referrals sent emails',
            'This month'
          ),
        },
        {
          title: 'Referrals received emails',
          description: 'Referrals received emails from clinics',
          value: 13,
          outOf: 300,
          comparison: this.getComparisonValue(
            'Referrals received emails',
            'This month'
          ),
        },
      ],
    },
  ];

  questionnaireActivity = [
    {
      title: 'This month',
      tags: [
        {
          title: 'Questionnaires sent',
          description: 'Questionnaire invites sent to patients',
          value: 1000,
          comparison: this.getComparisonValue(
            'Questionnaires sent',
            'Last month'
          ),
        },
        {
          title: 'Questionnaires opened',
          description: 'Questionnaire invites opened by patients',
          value: 300,
          comparison: this.getComparisonValue(
            'Questionnaires opened',
            'Last month'
          ),
        },
        {
          title: 'Questionnaires started',
          description: 'Questionnaires started by patients',
          value: 130,
          comparison: this.getComparisonValue(
            'Questionnaires started',
            'Last month'
          ),
        },
        {
          title: 'Questionnaires completed',
          description: 'Questionnaires completed by patients',
          value: 100,
          comparison: this.getComparisonValue(
            'Questionnaires completed',
            'Last month'
          ),
        },
        {
          title: 'Started but not completed',
          description: 'Questionnaires started but not completed by patients',
          value: 10,
          comparison: this.getComparisonValue(
            'Started but not completed',
            'Last month'
          ),
        },
        {
          title: 'Opened after expiration',
          description: 'Questionnaires opened after expiration',
          value: 10,
          comparison: this.getComparisonValue(
            'Opened after expiration',
            'Last month'
          ),
        },
        {
          title: 'Completion rate via text',
          description: 'Percentage of questionnaires completed via text',
          value: 90,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Completion rate via text',
            'Last month'
          ),
        },
        {
          title: 'Completion rate via email',
          description: 'Percentage of questionnaires completed via email',
          value: 30,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Completion rate via email',
            'Last month'
          ),
        },
        {
          title: 'DEQ - completed',
          description: 'Questionnaires completed of type - DEQ',
          value: 10,
          comparison: this.getComparisonValue('DEQ - completed', 'Last month'),
        },
        {
          title: 'OSDI - completed',
          description: 'Questionnaires completed of type - OSDI',
          value: 10,
          comparison: this.getComparisonValue('OSDI - completed', 'Last month'),
        },
        {
          title: 'SPEED - completed',
          description: 'Questionnaires completed of type - SPEED',
          value: 10,
          comparison: this.getComparisonValue(
            'SPEED - completed',
            'Last month'
          ),
        },
        {
          title: 'SPEED II - completed',
          description: 'Questionnaires completed of type - SPEED II',
          value: 10,
          comparison: this.getComparisonValue(
            'SPEED II - completed',
            'Last month'
          ),
        },
        {
          title: 'OSDI and SPEED - completed',
          description: 'Questionnaires completed of type - OSDI and SPEED',
          value: 10,
          comparison: this.getComparisonValue(
            'OSDI and SPEED - completed',
            'Last month'
          ),
        },
        {
          title: 'DERFS - completed',
          description: 'Questionnaires completed of type - DERFS',
          value: 10,
          comparison: this.getComparisonValue(
            'DERFS - completed',
            'Last month'
          ),
        },
        {
          title: 'CDERFS - completed',
          description: 'Questionnaires completed of type - CDERFS',
          value: 10,
          comparison: this.getComparisonValue(
            'CDERFS - completed',
            'Last month'
          ),
        },
        {
          title: 'Other - completed',
          description: 'Questionnaires completed of type - Other',
          value: 10,
          comparison: this.getComparisonValue(
            'Other - completed',
            'Last month'
          ),
        },
        {
          title: 'Patient time (Minutes)',
          description: 'Average time to complete questionnaires',
          value: 10,
          comparison: this.getComparisonValue(
            'Patient time (Minutes)',
            'Last month'
          ),
        },
        {
          title: 'Completeness score',
          description: 'Average completeness score of questionnaires',
          value: 10,
          comparison: this.getComparisonValue(
            'Completeness score',
            'Last month'
          ),
        },
        {
          title: 'First open time (Days)',
          description: 'Average delay from questionnaire invite to first open',
          value: 10,
          comparison: this.getComparisonValue(
            'First open time (Days)',
            'Last month'
          ),
        },
        {
          title: 'Turnaround time (Days)',
          description: 'Average time from questionnaire invite to submission',
          value: 10,
          comparison: this.getComparisonValue(
            'Turnaround time (Days)',
            'Last month'
          ),
        },
      ],
    },
    {
      title: 'Last month',
      tags: [
        {
          title: 'Questionnaires sent',
          description: 'Questionnaire invites sent to patients',
          value: 800,
          comparison: this.getComparisonValue(
            'Questionnaires sent',
            'This month'
          ),
        },
        {
          title: 'Questionnaires opened',
          description: 'Questionnaire invites opened by patients',
          value: 240,
          comparison: this.getComparisonValue(
            'Questionnaires opened',
            'This month'
          ),
        },
        {
          title: 'Questionnaires started',
          description: 'Questionnaires started by patients',
          value: 104,
          comparison: this.getComparisonValue(
            'Questionnaires started',
            'This month'
          ),
        },
        {
          title: 'Questionnaires completed',
          description: 'Questionnaires completed by patients',
          value: 80,
          comparison: this.getComparisonValue(
            'Questionnaires completed',
            'This month'
          ),
        },
        {
          title: 'Started but not completed',
          description: 'Questionnaires started but not completed by patients',
          value: 8,
          comparison: this.getComparisonValue(
            'Started but not completed',
            'This month'
          ),
        },
        {
          title: 'Opened after expiration',
          description: 'Questionnaires opened after expiration',
          value: 8,
          comparison: this.getComparisonValue(
            'Opened after expiration',
            'This month'
          ),
        },
        {
          title: 'Completion rate via text',
          description: 'Percentage of questionnaires completed via text',
          value: 72,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Completion rate via text',
            'This month'
          ),
        },
        {
          title: 'Completion rate via email',
          description: 'Percentage of questionnaires completed via email',
          value: 24,
          outOf: 100,
          comparison: this.getComparisonValue(
            'Completion rate via email',
            'This month'
          ),
        },
        {
          title: 'DEQ - completed',
          description: 'Questionnaires completed of type - DEQ',
          value: 8,
          comparison: this.getComparisonValue('DEQ - completed', 'This month'),
        },
        {
          title: 'OSDI - completed',
          description: 'Questionnaires completed of type - OSDI',
          value: 8,
          comparison: this.getComparisonValue('OSDI - completed', 'This month'),
        },
        {
          title: 'SPEED - completed',
          description: 'Questionnaires completed of type - SPEED',
          value: 8,
          comparison: this.getComparisonValue(
            'SPEED - completed',
            'This month'
          ),
        },
        {
          title: 'SPEED II - completed',
          description: 'Questionnaires completed of type - SPEED II',
          value: 8,
          comparison: this.getComparisonValue(
            'SPEED II - completed',
            'This month'
          ),
        },
        {
          title: 'OSDI and SPEED - completed',
          description: 'Questionnaires completed of type - OSDI and SPEED',
          value: 8,
          comparison: this.getComparisonValue(
            'OSDI and SPEED - completed',
            'This month'
          ),
        },
        {
          title: 'DERFS - completed',
          description: 'Questionnaires completed of type - DERFS',
          value: 8,
          comparison: this.getComparisonValue(
            'DERFS - completed',
            'This month'
          ),
        },
        {
          title: 'CDERFS - completed',
          description: 'Questionnaires completed of type - CDERFS',
          value: 8,
          comparison: this.getComparisonValue(
            'CDERFS - completed',
            'This month'
          ),
        },
        {
          title: 'Other - completed',
          description: 'Questionnaires completed of type - Other',
          value: 8,
          comparison: this.getComparisonValue(
            'Other - completed',
            'This month'
          ),
        },
        {
          title: 'Patient time (Minutes)',
          description: 'Average time to complete questionnaires',
          value: 8,
          comparison: this.getComparisonValue(
            'Patient time (Minutes)',
            'This month'
          ),
        },
        {
          title: 'Completeness score',
          description: 'Average completeness score of questionnaires',
          value: 8,
          comparison: this.getComparisonValue(
            'Completeness score',
            'This month'
          ),
        },
        {
          title: 'First open time (Days)',
          description: 'Average delay from questionnaire invite to first open',
          value: 8,
          comparison: this.getComparisonValue(
            'First open time (Days)',
            'This month'
          ),
        },
        {
          title: 'Turnaround time (Days)',
          description: 'Average time from questionnaire invite to submission',
          value: 8,
          comparison: this.getComparisonValue(
            'Turnaround time (Days)',
            'This month'
          ),
        },
      ],
    },
  ];

  assessmentActivity = [
    {
      title: 'This month',
      tags: [
        {
          title: 'Completed assessments',
          description: 'Assessments completed by clinic staff',
          value: 50,
          comparison: this.getComparisonValue(
            'Completed assessments',
            'This month'
          ),
        },
        {
          title: 'Linked to questionnaire',
          description: 'Assessments linked to questionnaires',
          value: 12,
          comparison: this.getComparisonValue(
            'Linked to questionnaire',
            'This month'
          ),
        },
        {
          title: 'Patient billed',
          description: 'Patients billed after assessment completion',
          value: 10,
          comparison: this.getComparisonValue('Patient billed', 'This month'),
        },
        {
          title: 'Patient app enrolled',
          description: 'Patients enrolled in the patient app',
          value: 2,
          comparison: this.getComparisonValue(
            'Patient app enrolled',
            'This month'
          ),
        },
        {
          title: 'Empty assessments',
          description: 'Assessments with no data',
          value: 25,
          comparison: this.getComparisonValue(
            'Empty assessments',
            'This month'
          ),
        },
        {
          title: 'Completeness score',
          description: 'Average completeness score of assessments',
          value: 60,
          comparison: this.getComparisonValue(
            'Completeness score',
            'This month'
          ),
        },
        {
          title: 'User time (Minutes)',
          description: 'Average time spent on assessments',
          value: 25,
          comparison: this.getComparisonValue(
            'User time (Minutes)',
            'This month'
          ),
        },
        {
          title: 'Edit count',
          description: 'Number of times assessments were edited',
          value: 1,
          comparison: this.getComparisonValue('Edit count', 'This month'),
        },
        {
          title: 'With medications entry',
          description: 'Assessments with medications entry',
          value: 5,
          comparison: this.getComparisonValue(
            'With medications entry',
            'This month'
          ),
        },
        {
          title: 'With attachments',
          description: 'Assessments with attachments',
          value: 10,
          comparison: this.getComparisonValue('With attachments', 'This month'),
        },
        {
          title: 'With recommendations',
          description: 'Assessments with recommendations',
          value: 5,
          comparison: this.getComparisonValue(
            'With recommendations',
            'This month'
          ),
        },
        {
          title: 'With goals',
          description: 'Assessments with goals',
          value: 3,
          comparison: this.getComparisonValue('With goals', 'This month'),
        },
        {
          title: 'Pre-operative screening',
          description: 'Assessments of type - Pre-operative screening',
          value: 1,
          comparison: this.getComparisonValue(
            'Pre-operative screening',
            'This month'
          ),
        },
        {
          title: 'ASCRS Pre-op',
          description: 'Assessments of type - ASCRS Pre-op',
          value: 1,
          comparison: this.getComparisonValue('ASCRS Pre-op', 'This month'),
        },
        {
          title: 'Screening',
          description: 'Assessments of type - Screening',
          value: 1,
          comparison: this.getComparisonValue('Screening', 'This month'),
        },
        {
          title: 'Silver standard',
          description: 'Assessments of type - Silver standard',
          value: 1,
          comparison: this.getComparisonValue('Silver standard', 'This month'),
        },
        {
          title: 'Gold standard',
          description: 'Assessments of type - Gold standard',
          value: 1,
          comparison: this.getComparisonValue('Gold standard', 'This month'),
        },
        {
          title: 'Treatment',
          description: 'Assessments of type - Treatment',
          value: 1,
          comparison: this.getComparisonValue('Treatment', 'This month'),
        },
        {
          title: 'Follow up',
          description: 'Assessments of type - Follow up',
          value: 1,
          comparison: this.getComparisonValue('Follow up', 'This month'),
        },
        {
          title: 'Other',
          description: 'Assessments of type - Other',
          value: 1,
          comparison: this.getComparisonValue('Other', 'This month'),
        },
      ],
    },
    {
      title: 'Last month',
      tags: [
        {
          title: 'Completed assessments',
          description: 'Assessments completed by clinic staff',
          value: 45,
          comparison: this.getComparisonValue(
            'Completed assessments',
            'Last month'
          ),
        },
        {
          title: 'Linked to questionnaire',
          description: 'Assessments linked to questionnaires',
          value: 11,
          comparison: this.getComparisonValue(
            'Linked to questionnaire',
            'Last month'
          ),
        },
        {
          title: 'Patient billed',
          description: 'Patients billed after assessment completion',
          value: 9,
          comparison: this.getComparisonValue('Patient billed', 'Last month'),
        },
        {
          title: 'Patient app enrolled',
          description: 'Patients enrolled in the patient app',
          value: 2,
          comparison: this.getComparisonValue(
            'Patient app enrolled',
            'Last month'
          ),
        },
        {
          title: 'Empty assessments',
          description: 'Assessments with no data',
          value: 23,
          comparison: this.getComparisonValue(
            'Empty assessments',
            'Last month'
          ),
        },
        {
          title: 'Completeness score',
          description: 'Average completeness score of assessments',
          value: 54,
          comparison: this.getComparisonValue(
            'Completeness score',
            'Last month'
          ),
        },
        {
          title: 'User time (Minutes)',
          description: 'Average time spent on assessments',
          value: 23,
          comparison: this.getComparisonValue(
            'User time (Minutes)',
            'Last month'
          ),
        },
        {
          title: 'Edit count',
          description: 'Number of times assessments were edited',
          value: 1,
          comparison: this.getComparisonValue('Edit count', 'Last month'),
        },
        {
          title: 'With medications entry',
          description: 'Assessments with medications entry',
          value: 5,
          comparison: this.getComparisonValue(
            'With medications entry',
            'Last month'
          ),
        },
        {
          title: 'With attachments',
          description: 'Assessments with attachments',
          value: 9,
          comparison: this.getComparisonValue('With attachments', 'Last month'),
        },
        {
          title: 'With recommendations',
          description: 'Assessments with recommendations',
          value: 5,
          comparison: this.getComparisonValue(
            'With recommendations',
            'Last month'
          ),
        },
        {
          title: 'With goals',
          description: 'Assessments with goals',
          value: 3,
          comparison: this.getComparisonValue('With goals', 'Last month'),
        },
        {
          title: 'Pre-operative screening',
          description: 'Assessments of type - Pre-operative screening',
          value: 1,
          comparison: this.getComparisonValue(
            'Pre-operative screening',
            'Last month'
          ),
        },
        {
          title: 'ASCRS Pre-op',
          description: 'Assessments of type - ASCRS Pre-op',
          value: 1,
          comparison: this.getComparisonValue('ASCRS Pre-op', 'Last month'),
        },
        {
          title: 'Screening',
          description: 'Assessments of type - Screening',
          value: 1,
          comparison: this.getComparisonValue('Screening', 'Last month'),
        },
        {
          title: 'Silver standard',
          description: 'Assessments of type - Silver standard',
          value: 1,
          comparison: this.getComparisonValue('Silver standard', 'Last month'),
        },
        {
          title: 'Gold standard',
          description: 'Assessments of type - Gold standard',
          value: 1,
          comparison: this.getComparisonValue('Gold standard', 'Last month'),
        },
        {
          title: 'Treatment',
          description: 'Assessments of type - Treatment',
          value: 1,
          comparison: this.getComparisonValue('Treatment', 'Last month'),
        },
        {
          title: 'Follow up',
          description: 'Assessments of type - Follow up',
          value: 1,
          comparison: this.getComparisonValue('Follow up', 'Last month'),
        },
        {
          title: 'Other',
          description: 'Assessments of type - Other',
          value: 1,
          comparison: this.getComparisonValue('Other', 'Last month'),
        },
      ],
    },
  ];

  getPercentageValue(tag: any, item: any): number {
    return Math.floor(Math.random() * (20 - -15 + 1)) + -15;
  }

  getComparisonValue(tag: any, item: any): any {
    const value = Math.floor(Math.random() * (20 - -15 + 1)) + -15;
    return {
      value,
      unit: '%',
      sentiment: value >= 0 ? 'positive' : 'negative',
      with: `Value (${value}) from previous period`,
    };
  }
}
