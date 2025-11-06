import { Component, OnInit } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { TablerIconComponent } from 'angular-tabler-icons';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css'],
  imports: [
    MatSidenavContent,
    MatToolbar,
    TablerIconComponent,
    MatCheckbox,
    MatDivider,
  ],
})
export class CompletedTasksComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
