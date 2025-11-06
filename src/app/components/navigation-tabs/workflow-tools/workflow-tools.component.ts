import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-workflow-tools',
  templateUrl: './workflow-tools.component.html',
  styleUrls: ['./workflow-tools.component.css'],
  imports: [MatIcon, MatButton],
})
export class WorkflowToolsComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
