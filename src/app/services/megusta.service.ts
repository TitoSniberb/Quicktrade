import { Injectable } from '@angular/core';
import { IProducto, IMotor, IInmobiliaria, ITecnologia } from '../interfaces';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()

export class MeGustaService {

  constructor(private _db: AngularFireDatabase) {

  }

  setProducto(producto) {
    let ref = this._db.database.ref("productosMeGusta");
    ref.push(producto);
  }

  getProductos(): firebase.database.Reference {
    let ref = this._db.database.ref("productosMeGusta");
    return ref;
  }
}