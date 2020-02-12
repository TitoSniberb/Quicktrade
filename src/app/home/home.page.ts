import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';
import { isNgTemplate } from '@angular/compiler';
import { MeGustaService } from '../services/megusta.service';
import { IFavorito } from '../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id: string;
  productosMG: IFavorito[] = [];

  constructor(private _toast: ToastController, 
    private _productosService: ProductoService,
    private _mgService: MeGustaService){}

  ngOnInit(){
    this.id = "mKilGUHPNfex87XCNefC601AUhX2";

    let ref2 = this._mgService.getProductos().orderByChild("usuario").equalTo(this.id);

    ref2.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();
        this.productosMG.push(value);
      })
    })
  }

  calcularProductos(){

    this.toast_HowManyFavs();
  }

//--E  ---------------------------------------------------- 
  async toast_HowManyFavs() {
    const toast = await this._toast.create({
      message: 'Actualmente tienes ' + this.productosMG.length + ' productos en favoritos.',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  //--Fin E  ---------------------------------------------------- 
}