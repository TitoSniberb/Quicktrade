import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id: string;

  constructor(){}

  ngOnInit(){
    this.id = "mKilGUHPNfex87XCNefC601AUhX2";
  }
}