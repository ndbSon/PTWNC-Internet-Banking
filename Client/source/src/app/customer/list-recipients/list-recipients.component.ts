import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-recipients',
  templateUrl: './list-recipients.component.html',
  styleUrls: ['./list-recipients.component.scss']
})
export class ListRecipientsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('list-reci');
  }

}
