import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-dhashboard',
  templateUrl: './dhashboard.component.html',
  styleUrls: ['./dhashboard.component.css']
})
export class DhashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = [];
  Tasktitle: string = '';
  Taskdescription: string = '';
  EditTasktitle: string = '';
  EditTaskdescription: string = '';



  constructor(private crudservice: CrudService, private spinner: NgxSpinnerService) { }


  ngOnInit(): void {

    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();


  }

  getAllTask() {
    this.spinner.show();
    this.crudservice.getTasks().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("unable to get list of task");
    })
    this.spinner.hide();
  }

  addNewTask() {
    this.spinner.show();
    this.taskObj.title = this.Tasktitle;
    this.taskObj.description = this.Taskdescription;
    this.crudservice.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.Tasktitle = '';
      this.Taskdescription = '';
      
    }, err => {
      alert(err)
    })
  }

  editTask() {
    this.spinner.show();
    this.taskObj.title = this.EditTasktitle;
    this.taskObj.description = this.EditTaskdescription;
    this.crudservice.updateTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("failed to update task")
    })
  }

  deleteTask(task: Task) {
    this.spinner.show();
    this.crudservice.deleteTask(task).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("failed to delete")
    })
  }

  getTaskDetail(task: Task) {
    this.spinner.show();
    this.taskObj = task;
    this.EditTasktitle = task.title
    this.EditTaskdescription = task.description;
  }


}
