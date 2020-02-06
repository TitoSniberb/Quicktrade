import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id: string;

  cantidad: number = 0;

  constructor(private _toast: ToastController, private _productosService: ProductoService){}

  ngOnInit(){
    this.id = "mKilGUHPNfex87XCNefC601AUhX2";

    //--E  ---------------------------------------------------- 
    let ref = this._productosService.getUsuarios();

    ref.once("value", snap => {
      this.cantidad = snap.val().cantidadFav;
    })
    //--E  ---------------------------------------------------- 
  }
//--E  ---------------------------------------------------- 
  async toast_HowManyFavs() {
    const toast = await this._toast.create({
      message: 'Actualmente tienes ' + this.cantidad + ' productos en favoritos.',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  favsQuantity(){
    this.toast_HowManyFavs();
  }
  //--Fin E  ---------------------------------------------------- 
}