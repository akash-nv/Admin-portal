import { Component, inject, signal, viewChild, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OtpInputComponent } from "../../ui-components/otp-input/otp-input.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInput,
    MatIcon,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    RouterLink,
    OtpInputComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  signinForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })
  isLogging: WritableSignal<boolean> = signal(false);
  isOTP: WritableSignal<boolean> = signal(false);
  otp = viewChild.required(OtpInputComponent);

  doSignin() {
    if(this.signinForm.valid && this.signinForm.value.email === 'aftab@csidryeye.com' && this.signinForm.value.password === 'CSI@123') {
      this.isLogging.set(true);
      this.authService.signin(this.signinForm.value).subscribe({
        next: () => {
          this.isLogging.set(false);
          this.isOTP.set(true);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

  submitOTP(OTP: string = '') {
    if(this.otp().otpFormGroup.valid) {
      this.isLogging.set(true);
      setTimeout(() => {
        this.isLogging.set(false);
        this.router.navigate(['welcome']);
      }, 4000)
    }
  }
}
