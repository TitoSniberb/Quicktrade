import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../interfaces';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-mis-chats',
  templateUrl: './mis-chats.page.html',
  styleUrls: ['./mis-chats.page.scss'],
})
export class MisChatsPage implements OnInit {

  // EJERCICIO B
  usuarios: IUsuario[] = [];

  constructor(
    private _ProductoService : ProductoService,
    ) {}

  ngOnInit() {
    this.descargarDatos();
  }

  descargarDatos(){
    this.usuarios = [];

    let ref = this._ProductoService.getUsuarios();

    ref.once("value", snap => {
      snap.forEach(child => {

        let value = child.val();
        this.usuarios.push(value);
      })
    })
  }

  //-- FIN EJERCICIO B -->
}
