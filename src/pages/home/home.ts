import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  formGroup: FormGroup;
  todosData: any[] = [];
  done: boolean = false;
  // oldTodos: any[] = [];
  savedTodos;
  constructor(public navCtrl: NavController) {}

  ngOnInit () {
    this.formGroup = new FormGroup({
      todos: new FormControl('', Validators.required)
    });
    this.savedTodos = localStorage.getItem('todosData');
    this.todosData = (localStorage.getItem('todosData') !== null) ? JSON.parse(this.savedTodos) : [];

  }

  onSubmit(form: FormGroup) {
    console.log(this.formGroup.value.todos);
    this.todosData.push({text: this.formGroup.value.todos, done: false});
    console.log(this.todosData);
    localStorage.setItem('todosData', JSON.stringify(this.todosData));
    form.reset();
  }
  // todoList = this.todosData.slice();

  remaining () {
    let count = 0;
    this.todosData.forEach(function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
  archive () {

    let oldTodos = this.todosData;
    let newTodos = [];
    this.todosData = [];
    oldTodos.forEach(function(todo) {
      if (!todo.done) {
        newTodos.push(todo);
        console.log('this.todosData ', oldTodos)
      }
    });
    this.todosData = newTodos;
    localStorage.setItem('todosData', JSON.stringify(this.todosData));
  };

  captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
    const contentDataURL = canvas.toDataURL('image/png')
    const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    const position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, width, height)
    pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }


}
