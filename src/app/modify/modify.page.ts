import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { ToastController } from '@ionic/angular';
import { IProducto, IMotor, ITecnologia, IInmobiliaria } from '../interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {

  id: string;

  item: object = {};

  constructor(private _activatedRoute: ActivatedRoute, private _toast : ToastController, private _productosService : ProductoService,) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    let ref = this._productosService.getProducto(this.id);

    ref.once("value", snap => {
        this.item = snap.val();
    })
  }

  async toast_IsEmpty() {
    const toast = await this._toast.create({
      message: 'Hay campos vacios.',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async toast_Inserted() {
    const toast = await this._toast.create({
      message: 'El producto se ha modificado correctamente.',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  onModify(){

    let ref = this._productosService.getProductos();
    ref.child(this.id).set(this.item);
  }
    
  
}
