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

  nombre: string = "";
  descripcion: string = "";
  tipo: string = "";
  kilometraje: number = null;
  age: number = null;
  metros_Cuadrados: number = null;
  numero_Aseos: number = null;
  numero_Habitaciones: number = null;
  localidad: string = "";
  estado: string = "";
  precio: number = null;

  producto: (IProducto | IMotor | ITecnologia | IInmobiliaria);

  constructor(private _activatedRoute: ActivatedRoute, private _toast : ToastController, private _productosService : ProductoService,) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    let ref = this._productosService.getProductos().orderByKey().equalTo(this.id);

    ref.once("value", snap => {
      snap.forEach(child => {
        this.producto=child.val();
      })
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

  isEmpty(){
    if(this.nombre == "" || this.descripcion == "" || this.precio == null){
      return true;

    } else return false;
  }

  onModify(){
    if(this.isEmpty()){
      this.toast_IsEmpty();
    }
    else {
      let ref = this._ProductosService.getProductos();

      ref.child(this.key).set(this.item);
      console.log("Producto modificado correctamente")
      this.router.navigateByUrl('/mis-productos');
      this.toast_Inserted();
    }
    
  }
}
