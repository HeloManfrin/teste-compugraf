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
  responseValue;
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
  getFrete(rua, cidade, bairro) {
    console.log('frete');
    let val = this.formCadastro.get('cep').value;

    this.cadastroService.getFrete().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  getCep() {
    let val = this.formCadastro.get('cep').value;

    this.cadastroService.getCadastro(val).subscribe({
      next: (response) => {
        this.responseValue = response;
        console.log(this.responseValue);
        this.rua = this.responseValue.logradouro;
        this.bairro = this.responseValue.bairro;
        this.estado = this.responseValue.estado;
        this.getFrete(this.rua, this.bairro, this.estado);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  initForm(): void {
    this.formCadastro = this.formBuilder.group({
      nome: [null, Validators.compose([Validators.required])],
      cep: [null, Validators.compose([Validators.required])],
    });
  }
}
