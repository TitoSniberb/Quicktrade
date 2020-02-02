import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { IProducto, IMotor, ITecnologia, IInmobiliaria } from '../interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string;
  producto: (IProducto | IMotor | ITecnologia | IInmobiliaria);

  constructor(private _activatedRoute: ActivatedRoute, private _productoService: ProductoService) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    let ref = this._productoService.getProductos().orderByKey().equalTo(this.id);

    ref.once("value", snap => {
      snap.forEach(child => {
        this.producto=child.val();
      })
    })
  }

}
