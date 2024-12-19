import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, input, InputSignal, output, signal, TemplateRef, WritableSignal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CustomerStatus } from '../../../../../core/helpers/enums';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OtpInputComponent } from '../../../../../ui-components/otp-input/otp-input.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-clinic-profile',
  standalone: true,
  imports: [DatePipe, MatIcon, TitleCasePipe, MatButtonModule, MatTooltip, MatDialogModule, OtpInputComponent, MatProgressSpinner],
  templateUrl: './clinic-profile.component.html',
  styleUrl: './clinic-profile.component.scss',
})
export class ClinicProfileComponent {
  private readonly dialog = inject(MatDialog);
  clinicData: InputSignal<any> = input();
  activation = output();

  CustomerStatus: any = CustomerStatus;
  isSavingRecord: WritableSignal<boolean> = signal(false);
  dialogRef: any;
  
  openDialog(templateRef: TemplateRef<any>, data: any = '') {
    this.dialogRef = this.dialog.open(templateRef, {data: data});
    this.dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  changeStatu(id: number) {
    this.activation.emit();
    this.dialogRef.close()
  }
}
