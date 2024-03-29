import { Component, OnInit } from '@angular/core';
import { IProducto, IMotor, ITecnologia, IInmobiliaria } from '../interfaces';
import { ToastController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  option: string = "";
  
  id: string = "";
  propietario: string = "";
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

  productos: (IProducto | IMotor | ITecnologia | IInmobiliaria)[] = [];

  constructor(
    private _toast : ToastController,
    private _ProductosService : ProductoService,
    private _db: AngularFireDatabase,
    private _activatedRoute: ActivatedRoute,
    private AFauth:AngularFireAuth
    ){

    }

    ngOnInit(){
    }

    actualizarClave(clave: string){
      let ref = this._db.database.ref("productos/" + clave + "/id");
      ref.set(clave);
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
        message: 'El producto se ha insertado correctamente.',
        duration: 2000,
        position: 'bottom',
      });
      toast.present();
    }
  
    save_Option(value){
      this.option = value;
    }
  /*
    isEmpty(){
      if(this.nombre == "" || this.descripcion == "" || this.option == "" || this.precio == null){
        return true;
  
      } else{
        if(this.option == "Motor"){
          if(this.tipo == "") return true;
          else return false;
  
        }else if(this.option == "Tecnologia"){
          if(this.estado == "") return true;
          else return false;
  
        }else if(this.option == "Inmobiliaria"){
          if(this.metros_Cuadrados == null || this.numero_Aseos == null || this.numero_Habitaciones == null || this.localidad == "") return true;
          else return false;
  
        }else return false;
      }
    }
  */
    insert_Product(){
      if(this.option == "Motor"){
        this._ProductosService.setProducto({
          "id": this.id,
          "propietario": this._activatedRoute.snapshot.paramMap.get('id'),
          "nombre": this.nombre,
          "descripcion": this.descripcion,
          "categoria": this.option,
          "tipo": this.tipo,
          "kilometraje": this.kilometraje,
          "edad": this.age,
          "precio": this.precio, 
          "uid": this.AFauth.auth.currentUser.uid
        });
      }
      
      if(this.option == "Inmobiliaria"){
        this._ProductosService.setProducto({
          "id": this.id,
          "propietario": this._activatedRoute.snapshot.paramMap.get('id'),
          "nombre": this.nombre,
          "descripcion": this.descripcion,
          "categoria": this.option,
          "metros_Cuadrados": this.metros_Cuadrados,
          "aseos": this.numero_Aseos,
          "habitaciones": this.numero_Habitaciones,
          "localidad": this.localidad,
          "precio": 150000, 
          "uid": this.AFauth.auth.currentUser.uid
        });
      }

      if(this.option == "Tecnologia"){
        this._ProductosService.setProducto({
          "id": this.id,
          "propietario": this._activatedRoute.snapshot.paramMap.get('id'),
          "nombre": this.nombre,
          "descripcion": this.descripcion,
          "categoria": this.option,
          "estado": this.estado,
          "precio": this.precio,
          "uid": this.AFauth.auth.currentUser.uid
        });
      }

      if(this.option == "Hogar"){
        this._ProductosService.setProducto({
          "id": this.id,
          "propietario": this._activatedRoute.snapshot.paramMap.get('id'),
          "nombre": this.nombre,
          "descripcion": this.descripcion,
          "categoria": this.option,
          "precio": this.precio,
          "uid": this.AFauth.auth.currentUser.uid
        });
      }
/*
      if(this.isEmpty() == false){
  
        if(this.option == "Motor"){
          //this.productos.push(motor)
          this._ProductosService.setProducto(motor);
          this.toast_Inserted();
  
        } else if(this.option == "Tecnologia"){
          //this.productos.push(tecnologia)
          this._ProductosService.setProducto(tecnologia);
          this.toast_Inserted();
  
        } else if(this.option == "Inmobiliaria"){
          //this.productos.push(inmobiliaria)
          this._ProductosService.setProducto(inmobiliaria);
          this.toast_Inserted();
  
        } else{
          //this.productos.push(hogar)
          this._ProductosService.setProducto(hogar);
          this.toast_Inserted();
        };
  
      } else{
        this.toast_IsEmpty();
      }
  */
    }
}
