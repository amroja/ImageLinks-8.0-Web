import { Component, OnInit } from '@angular/core';
import { ViewToolsComponent } from './view-tools/view-tools.component';
import { ManageToolsComponent } from './manage-tools/manage-tools.component';
import { PagesToolsComponent } from './pages-tools/pages-tools.component';
import { WorkflowToolsComponent } from './workflow-tools/workflow-tools.component';
import { SearchToolsComponent } from './search-tools/search-tools.component';
import { MediaToolsComponent } from './media-tools/media-tools.component';
import { FormsModule } from '@angular/forms';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.css'],
  imports: [
    ViewToolsComponent,
    ManageToolsComponent,
    PagesToolsComponent,
    WorkflowToolsComponent,
    SearchToolsComponent,
    MediaToolsComponent,
    FormsModule,
    MatTabGroup,
    MatTab,
  ],
})
export class NavigationTabsComponent implements OnInit {
  constructor() {}
  selectedTab = 'view';
  ngOnInit() {}
  onTabChange(tabName: string) {
    this.selectedTab = tabName;
  }
}
