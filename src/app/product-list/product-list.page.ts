import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { IProducto, IMotor, ITecnologia, IInmobiliaria, IFavorito } from '../interfaces';
import { ToastController } from '@ionic/angular';
import { MeGustaService } from '../services/megusta.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  productos: (IProducto | IMotor | ITecnologia | IInmobiliaria)[] = [];
  productosMG: IFavorito[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _ProductoService : ProductoService,
    private _toast : ToastController,
    private _mgService : MeGustaService) { }

  ngOnInit() {
    this.descargarDatos();
  }

  descargarDatos(){

    this.productosMG = [];
    this.productos = [];

    let ref = this._ProductoService.getProductos();

    ref.once("value", snapshot => { //once para que lo haga una sola vez
      snapshot.forEach(child => { //para cada child, recupera todo su valor desde la base de datos. Por ej value = "Nissan Skyline". Pueden ser objetos
        let value = child.val();
        this.productos.push(value); //hace el push al array productos
      })
    });

    let ref2 = this._mgService.getProductos().orderByChild("usuario").equalTo("mKilGUHPNfex87XCNefC601AUhX2");
    ref2.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();
        this.productosMG.push(value);
      })
    })
  }

  //<!--A  ---------------------------------------------------- -->
  async toast_MeGusta() {
    const toast = await this._toast.create({
      message: 'Añadido a favoritos',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
  //<!-- Fin A  ---------------------------------------------------- -->

  async toast_sorry() {
    const toast = await this._toast.create({
      message: 'Este producto ya esta en favoritos',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  comprobarFavorito(nombre: string){
    //Compruebo si el producto esta en la lista
    let existe: boolean = false;

    for (let i = 0; i < this.productosMG.length; i++) {
      if (nombre == this.productosMG[i].producto) {
        existe=true;
      }
    }
    return existe;
  }
  
  meGusta(nombre: string){
    let favorito : object = {
      producto: nombre,
      usuario: "mKilGUHPNfex87XCNefC601AUhX2"
    }
    this._mgService.setProducto(favorito);
    this.toast_MeGusta();

    this.descargarDatos();
  }

  noMeGusta(nombre: string){
    
    let ref = this._mgService.getProductos();

    ref.orderByChild("producto").equalTo(nombre).once("value", snapshot => {
      this.productosMG = [];
      snapshot.forEach(child => {
        let clave = child.key;
        ref.child(clave).remove();
      })
    })

    console.log("Ya no me gusta")

    this.descargarDatos();
  }

}
