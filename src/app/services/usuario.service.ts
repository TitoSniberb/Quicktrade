import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //<!-- FIN EJERCICIO D -->
  constructor(private _db: AngularFireDatabase) { }

  setMensaje(mensaje) {
    let ref = this._db.database.ref("mensajes");
    ref.push(mensaje);
  }
  //<!-- FIN EJERCICIO D -->
}
