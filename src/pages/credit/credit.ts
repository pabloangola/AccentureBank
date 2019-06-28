import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
})
export class CreditPage {

  dataUser: any; //variable que recibe los datos de registro de un usuario

  constructor(public navParams: NavParams) {
    this.dataUser = this.navParams.get('userData') //Parametros que envia la pagina de registro
  }

}
