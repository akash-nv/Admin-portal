import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime',
  pure: true, // Ensures it doesn't re-run unnecessarily,
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {
    private datePipe = inject(DatePipe);

  transform(value: Date | string | number, format: string): string {
    const now = new Date();
    const inputDate = new Date(value);
    const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        if(!diffInSeconds) {
            return `Now`;      
        }
      return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    // If it's more than a week, return the exact date and time
    return this.datePipe.transform(new Date(), format) || '';
  }
}
