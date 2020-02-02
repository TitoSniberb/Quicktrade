import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { IProducto, IMotor, ITecnologia, IInmobiliaria } from '../interfaces';
@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements OnInit {

  productos: (IProducto | IMotor | ITecnologia | IInmobiliaria)[] = [];
  option: string = "";

  constructor(private _activatedRoute: ActivatedRoute, private _ProductoService : ProductoService) { }

  ngOnInit() {
    let ref = this._ProductoService.getProductos();

    ref.orderByChild("propietario").equalTo("mKilGUHPNfex87XCNefC601AUhX2").once("value", snap => {
      snap.forEach(child => {
        this.productos.push(child.val());
      })
    })
  }

  onDelete(nombre: string){
    this._ProductoService.deleteProduct(nombre);
  }

}
