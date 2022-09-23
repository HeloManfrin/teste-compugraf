import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CadastroService } from './cadastro.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  valueFrete;
  responseCadastro;
  responseCadastroDis;
  responseValue;
  freteTable = false;
  formCadastro: FormGroup;
  cep: string;
  bairro: string;
  estado: string;
  rua: string;
  constructor(
    public activeRoute: ActivatedRoute,
    private cadastroService: CadastroService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.initForm();
  }
  getFrete(rua, bairro, estado) {
    let val = this.formCadastro.get('cep').value;

    this.cadastroService.getFrete(rua, bairro, estado).subscribe({
      next: (response) => {
        let rs = response;
        this.responseCadastro = parseFloat(
          rs.rows[0].elements[0].distance.value
        );
        this.responseCadastroDis = rs.rows[0].elements[0].distance.text;
        this.responseCadastro = this.responseCadastro / 1000;
        this.valueFrete = this.responseCadastro.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        });
        this.freteTable = true;
      },
      error(err) {
        alert('Cep Inválido');
      },
    });
  }

  getCep() {
    let val = this.formCadastro.get('cep').value;

    this.cadastroService.getCadastro(val).subscribe({
      next: (response) => {
        this.responseValue = response;
        this.rua = this.responseValue.logradouro;
        this.bairro = this.responseValue.bairro;
        this.estado = this.responseValue.estado;
        this.getFrete(this.rua, this.bairro, this.estado);
      },
      error(err) {
        alert('Cep Inválido');
      },
    });
  }

  initForm(): void {
    this.formCadastro = this.formBuilder.group({
      nome: [null, Validators.compose([Validators.required])],
      cep: [null, Validators.compose([Validators.required])],
    });
  }

  contratar() {
    alert('Obrigada!Serviço contrado com sucesso!');
  }
}
