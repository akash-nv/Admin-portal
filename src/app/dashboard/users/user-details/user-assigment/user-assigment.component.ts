import { Component, inject, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTooltip } from '@angular/material/tooltip';
import { BreadcrumbService } from '../../../../ui-components/breadcrumb/breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-user-assigment',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatCheckbox,
    MatButtonModule,
    MatSlideToggle,
    MatFormFieldModule,
    MatIcon,
    MatTooltip,
    ReactiveFormsModule,
    FormsModule,
    MatInput
  ],
  templateUrl: './user-assigment.component.html',
  styleUrl: './user-assigment.component.scss'
})
export class UserAssigmentComponent {
  activatedRoute = inject(ActivatedRoute);
  breadcrumbService = inject(BreadcrumbService);
  accordion = viewChild.required(MatAccordion);
  checked = false;
  isChecked = false;
  search = new FormControl('');
  isExpandedAll: WritableSignal<boolean> = signal(false);
  today = new Date();
  customers = signal([
    {
      customerName: "Dr. Al-Ghoul",
      customerId: "1",
      isChecked: true,
      allNowAndFuture: true,
      allNow: true,
      clinics: [
        {
          clinicName: "Clinic 1 Dr. Al-Ghoul",
          clinicId: "1",
          isChecked: true
        },
        {
          clinicName: "Clinic 2 Dr. Al-Ghoul",
          clinicId: "2",
          isChecked: true
        },
        {
          clinicName: "Clinic 3 Dr. Al-Ghoul",
          clinicId: "3",
          isChecked: true
        },
        {
          clinicName: "Clinic 4 Dr. Al-Ghoul",
          clinicId: "4",
          isChecked: true
        }
      ]
    },
    {
      customerName: "Dr. Smith",
      customerId: "2",
      isChecked: false,
      allNowAndFuture: false,
      allNow: true,
      clinics: [
        {
          clinicName: "Clinic 1 Dr. Smith",
          clinicId: "5",
          isChecked: true
        },
        {
          clinicName: "Clinic 2 Dr. Smith",
          clinicId: "6",
          isChecked: true
        }
      ]
    },
    {
      customerName: "Dr. Johnson",
      customerId: "3",
      isChecked: false,
      allNowAndFuture: false,
      allNow: false,
      clinics: [
        {
          clinicName: "Clinic 1 Dr. Johnson",
          clinicId: "7",
          isChecked: false
        },
        {
          clinicName: "Clinic 2 Dr. Johnson",
          clinicId: "8",
          isChecked: true
        },
        {
          clinicName: "Clinic 3 Dr. Johnson",
          clinicId: "9",
          isChecked: true
        }
      ]
    },
    {
      customerName: "Dr. Lee",
      customerId: "4",
      isChecked: true,
      allNowAndFuture: true,
      allNow: true,
      clinics: [
        {
          clinicName: "Clinic 1 Dr. Lee",
          clinicId: "10",
          isChecked: true
        }
      ]
    },
    {
      customerName: "Dr. Garcia",
      customerId: "5",
      isChecked: true,
      allNowAndFuture: true,
      allNow: true,
      clinics: [
        {
          clinicName: "Clinic 1 Dr. Garcia",
          clinicId: "11",
          isChecked: true
        },
        {
          clinicName: "Clinic 2 Dr. Garcia",
          clinicId: "12",
          isChecked: true
        },
        {
          clinicName: "Clinic 3 Dr. Garcia",
          clinicId: "13",
          isChecked: true
        },
        {
          clinicName: "Clinic 4 Dr. Garcia",
          clinicId: "14",
          isChecked: true
        }
      ]
    },
    {
      customerName: "Dr. Patel",
      customerId: "6",
      isChecked: true,
      allNowAndFuture: true,
      allNow: true,
      clinics: [
        {
          clinicName: "Clinic 1 Dr. Patel",
          clinicId: "15",
          isChecked: true
        },
        {
          clinicName: "Clinic 2 Dr. Patel",
          clinicId: "16",
          isChecked: true
        }
      ]
    }
  ]
  );

  constructor() {
    this.activatedRoute.params.subscribe((params: any) => {
      if(params['userId'])
        this.breadcrumbService.addBreadcrumb({label: "User's Permission"})
    })


  }

  toggle() {
    if(this.isExpandedAll()) {
      this.accordion().closeAll();
      this.isExpandedAll.set(false);
    } else {
      this.accordion().openAll();
      this.isExpandedAll.set(true);
    }
  }

  goBack() {
    window.history.back();
  }
}
