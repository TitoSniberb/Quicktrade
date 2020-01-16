import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { IProducto } from '../interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: number;
  producto: IProducto;

  constructor(private _activatedRoute: ActivatedRoute, private _productoService: ProductoService) { }

  ngOnInit() {
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');
    this._productoService.getProducto(this.id);
  }

}
