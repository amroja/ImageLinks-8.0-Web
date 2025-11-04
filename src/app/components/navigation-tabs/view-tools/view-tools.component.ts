import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-view-tools',
  templateUrl: './view-tools.component.html',
  styleUrls: ['./view-tools.component.css'],
  imports: [MatToolbarRow, MatIcon, MatToolbar],
})
export class ViewToolsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
