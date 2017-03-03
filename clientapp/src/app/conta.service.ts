import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Conta } from './conta';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ContaService {

  private contaUrl = 'https://bluebankbyui.mybluemix.net/api/contas';

  constructor(private http: Http) { }

  getContas() : Promise <Conta[]>
  {
    return this.http.get(this.contaUrl)
      .toPromise()
      .then(response => response.json() as Conta)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
