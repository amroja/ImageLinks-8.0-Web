import { Component, OnInit, signal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TranslateModule } from '@ngx-translate/core';
import { InboxComponent } from './inbox/inbox.component';
import { ViewOnlyComponent } from './view-only/view-only.component';
import { OutboxComponent } from './outbox/outbox.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { ManagerMonitorComponent } from './manager-monitor/manager-monitor.component';
import { CreatedByMeComponent } from './created-by-me/created-by-me.component';
import { GeneralizationComponent } from './generalization/generalization.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { NavigationTabsComponent } from '../components/navigation-tabs/navigation-tabs.component';
@Component({
  selector: 'app-Task-And-Document-Trackers',
  templateUrl: './Task-And-Document-Trackers.component.html',
  styleUrls: ['./Task-And-Document-Trackers.component.css'],
  imports: [
    MaterialModule,
    CommonModule,
    TablerIconsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    // Add child components
    InboxComponent,
    ViewOnlyComponent,
    OutboxComponent,
    FollowUpComponent,
    ManagerMonitorComponent,
    CreatedByMeComponent,
    GeneralizationComponent,
    CompletedTasksComponent,
    NavigationTabsComponent,
  ],
})
export class TaskAndDocumentTrackersComponent implements OnInit {
  sidePanelOpened = signal<boolean>(true);
  public showSidebar = signal<boolean>(false);
  inputFg: UntypedFormGroup;
  selectedCategory = signal<string>('all');
  todos = signal<any[]>([]);
  searchText = signal<string | null>(null);
  editSave = signal<string>('Edit');

  totalTodos = signal<number>(0);
  totalCompleted = signal<number>(0);
  totalIncomplete = signal<number>(0);

  constructor(public fb: UntypedFormBuilder, public snackBar: MatSnackBar) {
    this.todos.set([]);
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  mobileSidebar(): void {
    this.showSidebar.set(!this.showSidebar);
  }

  ngOnInit(): void {
    this.inputFg = this.fb.group({
      mess: [],
    });
  }

  selectionlblClick(val: string): void {
    this.selectedCategory.set(val);
  }

  getCategoryTitle(): string {
    const titles: { [key: string]: string } = {
      all: 'Inbox',
      uncomplete: 'View Only',
      outbox: 'Outbox',
      followup: 'Follow Up',
      manager: 'Manager Monitor',
      created: 'Created by Me',
      generalization: 'Generalization',
      complete: 'Completed Tasks',
    };
    return titles[this.selectedCategory()] || '';
  }

  addTodo(): void {
    const message = this.inputFg.get('mess')?.value;
    if (message) {
      this.inputFg.reset();
      this.totalTodos.set(this.todos().length);
      this.totalCompleted.set(
        this.todos().filter((todo) => todo.completionStatus).length
      );
      this.totalIncomplete.set(
        this.todos().filter((todo) => !todo.completionStatus).length
      );
      this.openSnackBar('Todo successfully added!', 'Close');
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  allTodos(): void {
    const completionStatus = (<HTMLInputElement>event!.target).checked;
    this.todos.update((todos) =>
      todos.map((todo) => ({ ...todo, completionStatus }))
    );
    this.updateCounts();
  }

  toggleTodoCompletion(todo: any): void {
    todo.completionStatus = !todo.completionStatus;
    this.updateCounts();
  }

  private updateCounts(): void {
    const allTodos = this.todos();
    this.totalTodos.set(allTodos.length);
    this.totalCompleted.set(
      allTodos.filter((todo) => todo.completionStatus).length
    );
    this.totalIncomplete.set(
      allTodos.filter((todo) => !todo.completionStatus).length
    );
  }

  editTodo(todo: any): void {
    if (todo.edit) {
      todo.edit = false;
      this.openSnackBar('Todo successfully edited!', 'Close');
      this.updateCounts();
    } else {
      todo.edit = true;
    }
  }

  deleteTodo(id: number): void {}

  remainingList(): number {
    return this.todos().filter((todo) => !todo.completionStatus).length;
  }
}
