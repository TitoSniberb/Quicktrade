import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { UsuarioService } from '../services/usuario.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  //<!--  EJERCICIO D -->
  emisor: string = "mKilGUHPNfex87XCNefC601AUhX2";
  destinatario: string = "";
  mensaje: string = "";

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _usuarioService: UsuarioService,
    private _toast : ToastController,
    ) { }

  ngOnInit() {
    this.destinatario = this._activatedRoute.snapshot.paramMap.get('correo')
  }

  onSend(msj: string){

    let mensaje : object = {
      emisor: this.emisor,
      destinatario: this.destinatario,
      mensaje: msj
    }
    this._usuarioService.setMensaje(mensaje);
    this.toast_Enviado();
  }

  async toast_Enviado() {
    const toast = await this._toast.create({
      message: 'Mensaje enviado!.',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
  //<!-- FIN EJERCICIO D -->
}
