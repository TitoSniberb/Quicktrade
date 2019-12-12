import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  option: string = "";

  constructor() {}

  save_Option(value){
    this.option = value;
  }
  
}
