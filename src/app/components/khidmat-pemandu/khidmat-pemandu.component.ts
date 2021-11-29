import { Component, OnInit } from '@angular/core';
export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-khidmat-pemandu',
  templateUrl: './khidmat-pemandu.component.html',
  styleUrls: ['./khidmat-pemandu.component.css']
})
export class KhidmatPemanduComponent implements OnInit {

  
  folders: Section[] = [
    {
      name: 'IQMAL',
      updated: new Date('1/1/16'),
    },
    {
      name: 'AZRI',
      updated: new Date('1/17/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'IQMAL',
      updated: new Date('2/20/16'),
    },
    {
      name: 'IQMAL',
      updated: new Date('1/18/16'),
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
