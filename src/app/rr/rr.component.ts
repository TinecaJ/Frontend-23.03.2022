import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-rr',
  templateUrl: './rr.component.html',
  styleUrls: ['./rr.component.css']
})
export class RrComponent implements OnInit {

  name: string;
  position: number;
  weight: number;
  symbol: string;
  constructor() { }

  ngOnInit(): void {
  }

}
