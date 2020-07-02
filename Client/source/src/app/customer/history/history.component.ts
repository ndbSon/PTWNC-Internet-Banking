import { Component, OnInit, ViewChild } from '@angular/core';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @ViewChild(DaterangepickerDirective, { static: true })
  pickerDirective: DaterangepickerDirective;

  
  constructor() { }
  
  selected = {
      startDate: moment('2015-11-18T00:00Z'),
      endDate: moment('2015-11-26T00:00Z'),
  };

  ngModelChange(e): void {
      console.log(e);
  }

  change(e): void {
      console.log(e);
  }

  open(): void {
      this.pickerDirective.open();
  }

  clear(e): void {
      this.selected = null;
  }

  ngOnInit() {
  }

}
