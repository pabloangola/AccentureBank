import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterProvider, ValidatorProvider, AlertsProvider } from '../../providers/providers'
import { CreditPage } from '../credit/credit';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  validForm: FormGroup;
  minOldYear: number = 18;
  day: any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public registerProvider: RegisterProvider,
    public alertsProvider: AlertsProvider, public validatorProvider: ValidatorProvider,
    private loadingCtrl: LoadingController) {

    //Validacion del formulario y definicion del mismo
    this.validForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      identification: ['', Validators.compose([Validators.pattern('^[0-9]{10,12}'), Validators.required])],
      birthdate: ['', Validators.required]
    });

  }

  registerUser() {
    //Verifica si el formulario fue diligenciado
    if (!this.validForm.valid) {
      for (let key of Object.keys(this.validForm.controls)) {
        this.validForm.controls[key].markAsTouched();
      }
      return
    }
    let loading = this.loadingCtrl.create({  //Creacion de loading para las salida de datos
      spinner: 'hide',
      content: `<img src="assets/imgs/loading.gif" />`
    });
    loading.present();
    //Verifica el formulario y le envia al servicio
    this.day = this.validatorProvider.validateDate(this.validForm.controls.birthdate.value) //Validacion de la fecha de nacimiento
    if (this.minOldYear > this.day) {
      loading.dismiss();
      this.alertsProvider.toastController("No cuentas con la edad suficiente para solicitar un credito");
      return //Si tiene error retorna el toastController con una descricion del error
    }

    this.registerProvider.getUsers().subscribe(users => { //Servicio que trae los datos de usuario para verificar si el documento ya esta inscrito en la base de datos
      console.log(users);
      for (let user of users) {
        if (user.identification == this.validForm.controls.identification.value) {
          loading.dismiss();
          this.alertsProvider.toastController("El usuario ya se encuentra registrado");
          return //Si tiene error retorna el toastController con una descricion del error
        }
      }
      // objeto requerido por el servicio
      console.log(this.validForm.controls.firstname);
      let userData = {
        firstname: this.validForm.controls.firstname.value,
        lastname: this.validForm.controls.lastname.value,
        identification: this.validForm.controls.identification.value,
        birthdate: this.validForm.controls.birthdate.value
      }

      this.registerProvider.postRegister(userData).subscribe(data => { //Servicio que envia los datos de usuario ya verificados para su ingreso en la base de datosF
        loading.dismiss();
        this.alertsProvider.toastController("El usuario se ha registrado exitosamente");
        this.navCtrl.push(CreditPage, {
          userData: this.validForm.controls
        });
        //Si el servicio responde correctamente lo envia a la pagina de solicitud de credito
      }, error => {
        //Si tiene error retorna el toastController con una descricion del error
        loading.dismiss();
        this.alertsProvider.toastController("Ocurrio un error al registrar el usuario");
      })
    })
  }

}
