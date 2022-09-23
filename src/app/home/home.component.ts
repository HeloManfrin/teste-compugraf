import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { HomeService } from './home.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  name = 'Angular 5';
  cotacao = [
    {
      name: '($) dolar ',
      value: 'dolar',
    },
    {
      name: '(R$) real ',
      value: 'real',
    },
  ];
  cotac = false;
  currency: string;
  myDate: any;
  today = new Date();
  dateYesterday = new Date(this.today);
  responseValue;
  valueDolar;
  resultCotacao;
  selected: any;
  formCotacao: FormGroup;
  constructor(
    public activeRoute: ActivatedRoute,
    private homeService: HomeService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit() {
    this.initForm();
    this.getCotacao();
  }

  valueChange(event) {
    //this.selected = event.target.value;
  }

  getCotacao() {
    this.getdate();
    this.homeService.getCotacao(this.myDate).subscribe({
      next: (response) => {
        let resp = response.value;
        this.responseValue = resp.map((e) => {
          this.valueDolar = e.cotacaoCompra;
        });
      },
      error: (e) => alert('Cotação indisponivel, tente novamente mais tarde'),
    });
  }
  getdate() {
    this.dateYesterday.setDate(this.dateYesterday.getDate() - 1);
    this.today.toDateString();
    this.dateYesterday.toDateString();
    this.myDate = formatDate(this.dateYesterday, 'MM-dd-yyy', 'pt-BR');
  }
  Cotar() {
    let val = this.formCotacao.get('valorCotacao').value;
    if (this.selected === 'dolar') {
      this.currency = '$';
      this.resultCotacao = val * this.valueDolar;
    } else {
      this.currency = 'R$';
      this.resultCotacao = val / this.valueDolar;
    }
    this.cotac = true;
  }
  comprar() {
    this.router.navigate(['/cadastro']);
  }
  initForm() {
    this.formCotacao = this.formBuilder.group({
      valorCotacao: [null, Validators.compose([Validators.required])],
      valueCheck: [null, Validators.compose([Validators.required])],
    });
  }
}
