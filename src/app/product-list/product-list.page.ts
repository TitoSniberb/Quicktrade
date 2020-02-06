import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { IProducto, IMotor, ITecnologia, IInmobiliaria } from '../interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  productos: (IProducto | IMotor | ITecnologia | IInmobiliaria)[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _ProductoService : ProductoService,
    private _toast : ToastController,) { }

  ngOnInit() {
    let ref = this._ProductoService.getProductos();

    ref.once("value", snapshot => { //once para que lo haga una sola vez
      snapshot.forEach(child => { //para cada child, recupera todo su valor desde la base de datos. Por ej value = "Nissan Skyline". Pueden ser objetos
        let value = child.val();
        this.productos.push(value); //hace el push al array productos
      })
    } )
  }
  //<!--A  ---------------------------------------------------- -->
  async toast_MeGusta() {
    const toast = await this._toast.create({
      message: 'Añadido a me gusta',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  onClick(){
    this.toast_MeGusta();

    this._ProductoService.likeProduct();
  }
  //<!-- Fin A  ---------------------------------------------------- -->
}
