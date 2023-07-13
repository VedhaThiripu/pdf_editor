import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private datePipe: DatePipe
  ) { }

  convertDateFormat(dateobj) {
    if (dateobj) {
      return this.datePipe.transform((dateobj.year + '-' + (dateobj.month) + '-' + dateobj.day), 'dd-MM-yyyy')
    }
    return '-'
  }
}
