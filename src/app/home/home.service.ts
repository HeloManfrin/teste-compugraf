import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectableObservable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getCotacao(date) {
    console.log(date);
    return this.http.get<any>(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&$select=cotacaoCompra`
    );
  }
  // sendPartner(partner) {
  //   return this.http.post<any>(`${environment.urlApi}dados-cliente/selecionar-corretor`, partner);
  // }
}
