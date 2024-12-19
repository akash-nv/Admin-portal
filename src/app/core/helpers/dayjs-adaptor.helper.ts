import { Injectable } from '@angular/core';
import { MatDateFormats, NativeDateAdapter } from '@angular/material/core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

export const DEFAULT_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'MM/DD/YYYY', // Default parsing format
  },
  display: {
    dateInput: 'MM/DD/YYYY', // Default input display format
    monthYearLabel: 'MMM YYYY', // Format for the month/year label in the calendar
    dateA11yLabel: 'MM/DD/YYYY', // Accessibility format for date
    monthYearA11yLabel: 'MMMM YYYY', // Accessibility format for month/year
  },
};

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);


@Injectable()
export class DayjsDateAdapter extends NativeDateAdapter {
    override parse(value: any, parseFormat: string): Date | null {
        if (!value || typeof value !== 'string') {
          return null;
        }
        const parsedDate = dayjs(value, parseFormat, true);
        return parsedDate.isValid() ? parsedDate.toDate() : null;
      }
    
      // Override the format method to format dates using Day.js
      override format(date: Date, displayFormat: string): string {
        console.log(displayFormat)
        return dayjs(date).format(displayFormat);
      }
}
