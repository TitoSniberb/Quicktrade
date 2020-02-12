import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';
import { MeGustaService } from '../services/megusta.service';
import { IFavorito } from '../interfaces';

import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  uid: string;
  productosMG: IFavorito[] = [];

  constructor(
    private _toast: ToastController, 
    private _activatedRoute: ActivatedRoute,
    private AFauth: AngularFireAuth,
    private _productosService: ProductoService,
    private _mgService: MeGustaService){}

  ngOnInit(){
    this.uid = this.AFauth.auth.currentUser.uid;
/*
    let ref2 = this._mgService.getProductos().orderByChild("usuario").equalTo(this.id);

    ref2.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();
        this.productosMG.push(value);
      })
    })
*/
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