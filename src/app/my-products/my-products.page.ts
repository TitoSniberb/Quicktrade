import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { IProducto, IMotor, ITecnologia, IInmobiliaria } from '../interfaces';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements OnInit {

  productos: (IProducto | IMotor | ITecnologia | IInmobiliaria)[] = [];
  option: string = "";
  uid: string;

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _ProductoService : ProductoService,
    private AFauth:AngularFireAuth
    ) { }

  ngOnInit() {
    this.uid = this.AFauth.auth.currentUser.uid;
    
    let ref = this._ProductoService.getProductos();

    ref.orderByChild("uid").equalTo(this.uid).once("value", snap => {

      snap.forEach(child => {
        
        this.productos.push(child.val());
      })
    })
  }

  onDelete(nombre: string){
    this._ProductoService.deleteProduct(nombre);
  }

}
