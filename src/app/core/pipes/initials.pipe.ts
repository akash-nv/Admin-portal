import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    const names = value.split(' '); // Split the name by spaces
    
    // Get the first initial
    const firstInitial = names[0].charAt(0).toUpperCase();
    
    // Determine the second character
    let secondInitial = '';
    if (names.length > 1) {
      // If there's a second word, use its first character
      secondInitial = names[1].charAt(0).toUpperCase();
    } else {
      // If there's no second word, use the last character of the first word
      secondInitial = names[0].slice(-1).toUpperCase();
    }
    
    return firstInitial + secondInitial;
  }
}
