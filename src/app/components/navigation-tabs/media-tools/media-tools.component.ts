import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-media-tools',
  templateUrl: './media-tools.component.html',
  styleUrls: ['./media-tools.component.css'],
  imports: [MatIcon, MatButton, MatMenu, MatMenuItem, MatMenuTrigger],
})
export class MediaToolsComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
