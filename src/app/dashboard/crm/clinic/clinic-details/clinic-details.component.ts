import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../core/services/customer.service';
import { BreadcrumbService } from '../../../../ui-components/breadcrumb/breadcrumb.service';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BreadcrumbComponent } from '../../../../ui-components/breadcrumb/breadcrumb.component';
import { NotesComponent } from "../../../notes/notes.component";
import { ClinicProfileComponent } from "./clinic-profile/clinic-profile.component";
import { ClinicContactsComponent } from "./clinic-contacts/clinic-contacts.component";
import { ClinicStatsComponent } from "./clinic-stats/clinic-stats.component";

@Component({
  selector: 'app-clinic-details',
  standalone: true,
  imports: [
    MatIcon,
    BreadcrumbComponent,
    MatTabsModule,
    NotesComponent,
    ClinicProfileComponent,
    ClinicContactsComponent,
    ClinicStatsComponent
],
  templateUrl: './clinic-details.component.html',
  styleUrl: './clinic-details.component.scss'
})
export class ClinicDetailsComponent implements OnInit {
  private readonly customerService = inject(CustomerService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly breadcrumbService = inject(BreadcrumbService);

  isSavingRecord: WritableSignal<boolean> = signal(false);

  dialogRef: any;
  clinicData: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if(params['customerId'])
        this.breadcrumbService.addBreadcrumb({label: "James", url: `/customers/${params['customerId']}`})

      if(params['clinicId']) {
        this.clinicData = this.customerService.clinicData.find(obj => obj.csiClinicObjId === params['clinicId'])
        console.log(this.clinicData)
        this.breadcrumbService.addBreadcrumb({label: this.clinicData.clinicName})
      }
    })
  }
}
