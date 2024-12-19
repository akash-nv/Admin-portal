import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { BreadcrumbComponent } from "../../../../ui-components/breadcrumb/breadcrumb.component";
import { ActivatedRoute} from '@angular/router';
import { BreadcrumbService } from '../../../../ui-components/breadcrumb/breadcrumb.service';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../../../core/services/customer.service';
import { CustomerStatus } from '../../../../core/helpers/enums';
import { NotesComponent } from "../../../notes/notes.component";
import { CustomerProfileComponent } from "./customer-profile/customer-profile.component";
import { CustomerStatsComponent } from "./customer-stats/customer-stats.component";

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [MatTabsModule, MatIcon, BreadcrumbComponent, MatButtonModule, NotesComponent, CustomerProfileComponent, CustomerStatsComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly customerService = inject(CustomerService);

  customerData: any;
  CustomerStatus: any = CustomerStatus;
  today = new Date();

  constructor() {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if(params['customerId']) {
        this.customerData = this.customerService.data.find(obj => obj.csiMainDocObjId === params['customerId'])
        this.breadcrumbService.addBreadcrumb({label: this.customerData.mainDoctor, url: `/CRM/customers/${params['customerId']}`})
      }
    })
  }
}
