import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDesc'
})
export class DateDescPipe implements PipeTransform {

  transform(value: string | number | Date, ...args: unknown[]): string {
    var date: Date = new Date(value);
    var pastDate: number = date.getTime();
    var diff: number = Date.now() - pastDate;
    if (diff < 1000 * 60 * 60) return 'Just now';
    if (diff < 1000 * 60 * 60 * 24 + 1000) return 'Today';
    if (diff < 1000 * 60 * 60 * 24 * 7) return 'This week';
    
    return  date.toDateString();
  }
}
