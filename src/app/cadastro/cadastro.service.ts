import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getCadastro(Cep) {
    console.log(Cep);
    return this.http.get<any>(`https://api.postmon.com.br/v1/cep/${Cep}`);
  }

  getFrete() {
    return this.http.get<any>(
      `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=RuaAraucária,JardimFranca,SP&origins=Avenida Angélica, Consolação, SP&units=km&key=AIzaSyCDRj_KIK2nNjJ13n4nfWLG1NJurPlY5_k`,
      { headers: this.headers }
    );
  }
}
