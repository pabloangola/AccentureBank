import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorProvider {

  totalDates: any = {}

  constructor(public http: HttpClient) {
  }

  // Valida la edad del usuario
  validateDate(day: any) {
    var date = Date.now() - Date.parse(day)
    var age = new Date(date);
    return Math.abs(age.getUTCFullYear() - 1970)
  }
}
