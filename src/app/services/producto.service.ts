import { Injectable } from '@angular/core';
import { IProducto, IMotor, ITecnologia, IInmobiliaria } from '../interfaces';

@Injectable()

export class ProductoService{

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

    getProductos(): IProducto[]{
        return this.productos;
    }

    getProducto(id: number): IProducto{ 
        return this.productos.find(x => x.id == id); //Filtra por id
    }
    
}