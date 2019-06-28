import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RegisterProvider {

  urlRegister: any = 'https://testbankapi.firebaseio.com/clients.json'

  constructor(public http: HttpClient) {
  }

  postRegister(userData: any) { //Registro de los usuarios en la base de datos de firebase de Accenture
    return this.http.post(this.urlRegister, userData).pipe(result => {
      return result
    })
  }

  getUsers(): any {
    return this.http.get(this.urlRegister).pipe(result => { //Datos de los usuarios de la base de datos de firebase de Accenture
      return result
    })
  }

}
