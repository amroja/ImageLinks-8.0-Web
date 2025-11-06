import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-search-tools',
  templateUrl: './search-tools.component.html',
  styleUrls: ['./search-tools.component.css'],
  imports: [MatIcon, MatButton, MatMenu, MatMenuItem, MatMenuTrigger],
})
export class SearchToolsComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
