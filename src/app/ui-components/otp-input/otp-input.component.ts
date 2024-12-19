import { Component, OnInit, ViewChildren, QueryList, ElementRef, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss']
})
export class OtpInputComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  otpFormGroup = this.fb.group({
    otpFormArray: this.fb.array([])
  })
  otpLength = 6; // Length of OTP
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;  // For managing focus
  onOTP = output<string>({alias: 'getOTP'})

  constructor() {}

  ngOnInit(): void {
    // Initialize FormArray with a FormControl for each OTP digit
    for (let i = 0; i < this.otpLength; i++) {
      (this.otpFormGroup.get('otpFormArray') as FormArray).push(new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern(/^[0-9]$/)]));
    }
  }

  getArray() {
    return (this.otpFormGroup.get('otpFormArray') as FormArray).controls;
  }

  // Handle input event and move to the next field
  onInput(event: any, index: number) {
    const input = event.target;
    if (input.value.length === 1) {
      this.moveToNext(index);
    } else if(input.value.length > 1) {
      input.value = input.value.slice(0,1);
      (this.otpFormGroup.get('otpFormArray') as FormArray).at(index).setValue(input.value);
    }
    this.collectOtp();
  }

  // Handle key down event for backspace to move to the previous field
  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !(this.otpFormGroup.get('otpFormArray') as FormArray).at(index).value) {
      this.moveToPrevious(index);
    } else if(event.key === '.') {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  // Collect the OTP as a string from the FormArray
  collectOtp() {
    const otpValues = (this.otpFormGroup.get('otpFormArray') as FormArray).value.join('');
    if(otpValues.length === this.otpLength) {
      this.onOTP.emit(otpValues);
    }
    // console.log('Collected OTP:', otpValues);
  }

  // Move to the next input field
  moveToNext(index: number) {
    if (index < this.otpLength - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  // Move to the previous input field
  moveToPrevious(index: number) {
    if (index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  // Handle paste event to fill in all OTP inputs
  onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text');
    if (pastedData && pastedData.length === this.otpLength) {
      pastedData.split('').forEach((char, index) => {
        (this.otpFormGroup.get('otpFormArray') as FormArray).at(index).setValue(char);
        this.otpInputs.toArray()[index].nativeElement.focus();
      });
      this.collectOtp();
    }
  }
}
