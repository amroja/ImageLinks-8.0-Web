import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-view-tools',
  templateUrl: './view-tools.component.html',
  styleUrls: ['./view-tools.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatFormField,
    MatInput,
    MatPrefix,
  ],
})
export class ViewToolsComponent implements OnInit {
  @Output() viewModeChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  viewMode: 'grid' | 'list' = 'list';
  searchText = '';

  constructor() {}

  ngOnInit() {}

  onSelectAll() {
    console.log('Select All clicked');
  }

  onSelectNone() {
    console.log('Select None clicked');
  }

  onFolderClick() {
    console.log('Folder clicked');
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.viewModeChange.emit(mode);
  }

  onSearch() {
    this.searchChange.emit(this.searchText);
  }
}
