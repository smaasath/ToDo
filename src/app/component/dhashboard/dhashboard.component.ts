import { Component, OnInit } from '@angular/core';
import { Task, TaskData } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dhashboard',
  templateUrl: './dhashboard.component.html',
  styleUrls: ['./dhashboard.component.css']
})
export class DhashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskObjData: TaskData = new Task();
  taskArr: Task[] = [];
  Tasktitle: string = '';
  Taskdescription: string = '';
  EditTasktitle: string = '';
  EditTaskdescription: string = '';

  // create form validation
  createform = new FormGroup({
    title: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required])

  })

  // edit form validation
  editform = new FormGroup({
    title: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required])

  })

  constructor(private crudservice: CrudService, private spinner: NgxSpinnerService) { }


  ngOnInit(): void {

  
    this.taskObjData = new TaskData();
    this.taskArr = [];
    this.getAllTask();
  }


// get all task using crudservice.getTasks
  getAllTask() {
    this.spinner.show();
    this.crudservice.getTasks().subscribe(res => {
      this.taskArr = res
      // .sort((a, b) => {
      //   const dateA = new Date(a.createdAt);
      //   const dateB = new Date(b.createdAt);
      //   return dateA.getTime() - dateB.getTime();
      // });
     
      
    }, err => {
      alert("unable to get list of task");
    })
    this.spinner.hide();
  }
  // sortedTasks(bb:Task) {
  //   return bb.slice().sort((a, b) => {
  //     const dateA = new Date(a.createdAt);
  //     const dateB = new Date(b.createdAt);
  //     return dateA.getTime() - dateB.getTime();
  //   });
  // }

  // Add new task using crudservice.addTask
  addNewTask() {
    this.spinner.show();
    this.taskObjData.title = this.Tasktitle;
    this.taskObjData.description = this.Taskdescription;
    this.crudservice.addTask(this.taskObjData).subscribe(res => {
      this.ngOnInit();
      this.Tasktitle = '';
      this.Taskdescription = '';

    }, err => {
      alert(err)
    })
  }

  // Edit task using crudservice.description
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

  // Delete task using crudservice.deleteTask
  deleteTask(task: Task) {
    this.spinner.show();
    this.crudservice.deleteTask(task).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("failed to delete")
    })
  }

  getTaskDetail(task: Task) {
    this.taskObj = task;
    this.EditTasktitle = task.title
    this.EditTaskdescription = task.description;
  }


}
