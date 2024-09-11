import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { TaskComponent } from '../tasks/task/task.component';
import { DUMMY_TASKS } from '../dummy-tasks';
import { NewTaskDialogComponent } from "../tasks/new-task-dialog/new-task-dialog.component";
import { NewTaskData } from '../tasks/task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskDialogComponent],
  templateUrl: './app-tasks.component.html',
  styleUrl: './app-tasks.component.css'
})

export class AppTasksComponent {
  @Input({required: true}) userId!: string;
  @Input({required: true}) name!: string;
  @Output() startAddingTask = new EventEmitter();

  tasks = DUMMY_TASKS;
  hasStartedNewTask = false;

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId)
  }

  onCompleteTask(id: string) {
    this.tasks=this.tasks.filter((task) => task.id !== id)
  }

  onStartAddTask() {
    this.hasStartedNewTask = true;
  }

  onAddTask(taskData: NewTaskData) {
    this.tasks.push(
      {
        id: new Date().getTime().toString(),
        userId: this.userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.dueDate
      }
    );
    this.hasStartedNewTask = false;
  }

  onCancelAddingTask() {
    this.hasStartedNewTask = false;
  }
}
