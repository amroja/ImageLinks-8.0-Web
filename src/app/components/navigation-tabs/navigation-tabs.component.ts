import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { ViewToolsComponent } from './view-tools/view-tools.component';
import { ManageToolsComponent } from './manage-tools/manage-tools.component';
import { PagesToolsComponent } from './pages-tools/pages-tools.component';
import { WorkflowToolsComponent } from './workflow-tools/workflow-tools.component';
import { SearchToolsComponent } from './search-tools/search-tools.component';
import { MediaToolsComponent } from './media-tools/media-tools.component';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    ViewToolsComponent,
    ManageToolsComponent,
    PagesToolsComponent,
    WorkflowToolsComponent,
    SearchToolsComponent,
    MediaToolsComponent,
  ],
})
export class NavigationTabsComponent implements OnInit {
  tabs = ['View', 'Manage', 'Pages', 'Workflow', 'Search', 'Media'];
  selectedTabIndex = 0;
  selectedTab = 'view';

  ngOnInit(): void {}

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    this.selectedTab = this.tabs[index].toLowerCase();
  }

  getCategoryTitle(): string {
    return this.tabs[this.selectedTabIndex];
  }
}
