import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatIcon, MatProgressSpinner, MatButton, RouterLink],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  fb = inject(FormBuilder);

  isReseting: WritableSignal<boolean> = signal(false);
  newPasswordForm: FormGroup = this.fb.group({
    password: ["", [Validators.required, Validators.minLength(8)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
  })

  changePassword() {}
}
