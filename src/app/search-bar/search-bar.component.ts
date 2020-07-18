import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less'],
})
export class SearchBarComponent implements OnInit {
  public searchBar: FormControl;
  constructor() {}

  ngOnInit(): void {
    this.searchBar = new FormControl();
  }
}
