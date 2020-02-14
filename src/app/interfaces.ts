export interface IProducto{
    "id": string,
    "propietario": string,
    "nombre": string,
    "descripcion": string,
    "categoria": string,
    "precio": number,   
    "uid": string
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

export interface IFavorito {
    "producto": string,
    "usuario": string
}

export interface IUsuario{
    "id": string,
    "nombre": string,
    "correo": string
}