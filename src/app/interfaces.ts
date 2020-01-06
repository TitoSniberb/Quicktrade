export interface IProducto{
    "id": number,
    "nombre": string,
    "descripcion": string,
    "categoria": string,
    "precio": number,   
}

export interface IMotor extends IProducto{
    "tipo": string,
    "kilometraje": number,
    "edad": number,
}

export interface IInmobiliaria extends IProducto{
    "metros_Cuadrados": number,
    "aseos": number,
    "habitaciones": number,
    "localidad": string,
}

export interface ITecnologia extends IProducto{
    "estado": string,
}