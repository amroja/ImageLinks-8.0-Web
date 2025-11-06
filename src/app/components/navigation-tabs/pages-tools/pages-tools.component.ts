import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-pages-tools',
  templateUrl: './pages-tools.component.html',
  styleUrls: ['./pages-tools.component.css'],
  imports: [MatIcon, MatButton, MatMenu, MatMenuItem, MatMenuTrigger],
})
export class PagesToolsComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
