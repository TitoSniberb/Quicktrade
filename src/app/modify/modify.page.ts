import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {

  nombre: string = "";
  descripcion: string = "";
  precio: number = null;

  constructor(private _toast : ToastController, private _ProductosService : ProductoService,) { }

  ngOnInit() {
  }

  async toast_IsEmpty() {
    const toast = await this._toast.create({
      message: 'Hay campos vacios.',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async toast_Inserted() {
    const toast = await this._toast.create({
      message: 'El producto se ha modificado correctamente.',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  isEmpty(){
    if(this.nombre == "" || this.descripcion == "" || this.precio == null){
      return true;

    } else return false;
  }

  onModify(nom: string, desc: string, pre: number){
    if(this.isEmpty()){
      this.toast_IsEmpty();
    }
    else {
      let id = this.nombre;
      this._ProductosService.modifyProduct(id, nom, desc, pre);
      this.toast_Inserted();
    }
    
  }
}
