import { Injectable } from '@angular/core';
import { IProducto, IMotor, ITecnologia, IInmobiliaria } from '../interfaces';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()

export class ProductoService{

    /*productos: (IProducto | IMotor | ITecnologia | IInmobiliaria)[] = [
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
      ]*/

      constructor(private _db: AngularFireDatabase){

      }

    getProductos(): firebase.database.Reference{
      let ref = this._db.database.ref("productos");
      
      return ref;
    }

    getProducto(id): firebase.database.Reference{ 
      //return this.productos.find(x => x.id == id); //Filtra por id
      let ref = this._db.database.ref("productos/" + id);

      return ref;
    }

    setProducto(producto: IProducto){
      let ref = this._db.database.ref("productos"); //productos es la referencia a la base de datos. Producto esta dentro de "productos"
      ref.push(producto);
    }

    deleteProduct(nombre: string){
      let ref = this._db.database.ref("productos");

      ref.orderByChild("nombre").equalTo(nombre).once("value", snap => {
        snap.forEach(child => {
          ref.child(child.key).remove();
        })
      })
    }

    modifyProduct(id: string, nom: string, desc: string, pre: number){
      let ref = this._db.database.ref("productos");

      ref.orderByChild("nombre").equalTo(id).once("value", snap => {
        snap.forEach(child => {
          ref.child(child.key).set({
            nombre: nom,
            descripcion: desc,
            precio: pre
          })
        })
      })
    }
}