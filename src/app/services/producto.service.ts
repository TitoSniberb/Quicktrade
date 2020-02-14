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

    setProducto(producto: (IProducto | IMotor | ITecnologia | IInmobiliaria)) : string{
      let ref = this._db.database.ref("productos"); //productos es la referencia a la base de datos. Producto esta dentro de "productos"
      let nuevaref : string = ref.push(producto).key;
      return nuevaref;
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

    //<!--D  ---------------------------------------------------- -->
    likeProduct(){
      let ref = this._db.database.ref("productos");

      ref.orderByChild("propietario").equalTo("test").once("value", snap => {
        snap.forEach(child => {
          let clave = child.key;
          ref.child(clave).child("fav").set("test");
        })
      });

      let ref2 = this._db.database.ref("usuarios");
      
      ref2.orderByChild("id").equalTo("mKilGUHPNfex87XCNefC601AUhX2").once("value", snap => {
        snap.forEach(child => {
          let clave = child.key;

          let cantFav = child.val().cantidadFav;
          ref2.child(clave).child("cantidadFav").set(cantFav + 1);
        })
      });
    }

    dislikeProduct(){
      let ref = this._db.database.ref("productos");

      ref.orderByChild("propietario").equalTo("mKilGUHPNfex87XCNefC601AUhX2").once("value", snap => {
        snap.forEach(child => {
          let clave = child.key;
          ref.child(clave).child("fav").set("");
        })
      });

      let ref2 = this._db.database.ref("usuarios");
      
      ref2.orderByChild("id").equalTo("mKilGUHPNfex87XCNefC601AUhX2").once("value", snap => {
        snap.forEach(child => {
          let clave = child.key;

          let cantFav = child.val().cantidadFav;
          if(cantFav > 0){
            ref2.child(clave).child("cantidadFav").set(cantFav - 1);
          }
        })
      });
    }
    
    isLiked(propietarioId){
      let ref = this._db.database.ref("productos");
      let i = 0;
      let val = [];

      ref.orderByChild("fav").equalTo(propietarioId).once("value", snap => {
        snap.forEach(child => {
          let clave = child.key;
          if(ref.child(clave).equalTo(propietarioId)) val.push(i);
          i++;
        })
      })

      return val;
    }
//<!--Fin D  ---------------------------------------------------- -->

//<!--E  ---------------------------------------------------- -->
    getUsuarios(){
      let ref = this._db.database.ref("usuarios");
      
      return ref;
    }
//<!--Fin E  ---------------------------------------------------- -->

  
 
}