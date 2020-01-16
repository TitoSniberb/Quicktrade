import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { IProducto, IMotor, ITecnologia, IInmobiliaria } from '../interfaces';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  productos: (IProducto | IMotor | ITecnologia | IInmobiliaria)[];

  constructor(private _activatedRoute: ActivatedRoute, private _ProductoService : ProductoService) { }

  ngOnInit() {
    this.productos = this._ProductoService.getProductos();
  }

}
