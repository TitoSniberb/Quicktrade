import { Component } from '@angular/core';
import { IProducto, IInmobiliaria, IMotor, ITecnologia} from '../interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  option: string = "";
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

  productos: (IProducto | IMotor | ITecnologia | IInmobiliaria)[] = [
    {
      "id": 1,
      "nombre": "Nissan Skyline R32",
      "descripcion": "Monumento historico del automovilismo.",
      "categoria": "Motor",
      "tipo": "Coche",
      "kilometraje": 123000,
      "edad": 24,
      "precio": 30000,  
    },
    {
      "id": 2,
      "nombre": "Logitech G403",
      "descripcion": "Raton con sensor de alta precision.",
      "categoria": "Tecnologia",
      "estado": "Perfecto",
      "precio": 30000,  
    },
    {
      "id": 3,
      "nombre": "Casa",
      "descripcion": "Hogar para vivir.",
      "categoria": "Inmobiliaria",
      "metros_Cuadrados": 245,
      "aseos": 3,
      "habitaciones": 9,
      "localidad": "Silla",
      "precio": 150000,  
    },
    {
      "id": 4,
      "nombre": "Toyota Supra MK4",
      "descripcion": "Monumento historico del automovilismo.",
      "categoria": "Motor",
      "tipo": "Coche",
      "kilometraje": 75802,
      "edad": 26,
      "precio": 60000,  
    },
  ]

  constructor(private _toast : ToastController){}

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

  insert_Product(){

    let motor: IMotor={
      "id": this.productos.length + 1,
      "nombre": this.nombre,
      "descripcion": this.descripcion,
      "categoria": this.option,
      "tipo": this.tipo,
      "kilometraje": this.kilometraje,
      "edad": this.age,
      "precio": this.precio, 
    };

    let inmobiliaria: IInmobiliaria={
      "id": this.productos.length + 1,
      "nombre": this.nombre,
      "descripcion": this.descripcion,
      "categoria": this.option,
      "metros_Cuadrados": this.metros_Cuadrados,
      "aseos": this.numero_Aseos,
      "habitaciones": this.numero_Habitaciones,
      "localidad": this.localidad,
      "precio": 150000, 
    }

    let tecnologia: ITecnologia={
      "id": this.productos.length + 1,
      "nombre": this.nombre,
      "descripcion": this.descripcion,
      "categoria": this.option,
      "estado": this.estado,
      "precio": this.precio,
    }

    let hogar: IProducto={
      "id": this.productos.length + 1,
      "nombre": this.nombre,
      "descripcion": this.descripcion,
      "categoria": this.option,
      "precio": this.precio,
    }

    if(this.isEmpty() == false){

      if(this.option == "Motor"){
        this.productos.push(motor)
        this.toast_Inserted();

      } else if(this.option == "Tecnologia"){
        this.productos.push(tecnologia)
        this.toast_Inserted();

      } else if(this.option == "Inmobiliaria"){
        this.productos.push(inmobiliaria)
        this.toast_Inserted();

      } else{
        this.productos.push(hogar)
        this.toast_Inserted();
      };

    } else{
      this.toast_IsEmpty();
    }

  }
  
}