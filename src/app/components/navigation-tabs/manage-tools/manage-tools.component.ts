import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-manage-tools',
  templateUrl: './manage-tools.component.html',
  styleUrls: ['./manage-tools.component.css'],
  imports: [MatIcon, MatButton, MatMenu, MatMenuItem, MatMenuTrigger],
})
export class ManageToolsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onNewDocument() {
    console.log('New Document clicked');
  }

  onLock() {
    console.log('Lock clicked');
  }

  onRefresh() {
    console.log('Refresh clicked');
  }

  onSettings() {
    console.log('Settings clicked');
  }

  onDelete() {
    console.log('Delete clicked');
  }

  onHistory() {
    console.log('History clicked');
  }

  onEdit() {
    console.log('Edit clicked');
  }

  onCode() {
    console.log('Code clicked');
  }

  onNewFile() {
    console.log('New File clicked');
  }

  onCopy() {
    console.log('Copy clicked');
  }

  onEmail() {
    console.log('Email clicked');
  }
}
