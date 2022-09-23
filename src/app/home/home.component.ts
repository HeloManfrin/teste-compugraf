import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
      name: 'dolar',
      value: 'dolar',
    },
    {
      name: 'real',
      value: 'real',
    },
  ];
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
    private http: HttpClient
  ) {}
  ngOnInit() {
    console.log(this.myDate);

    // this.selected = undefined;
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
    this.initForm();
    this.getCotacao();
  }

  valueChange(event) {
    console.log(
      'selected value',
      event.target.value,
      'value of selected',
      this.selected
    );
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
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
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
      this.currency = 'R$';

      this.resultCotacao = val * this.valueDolar;
    } else {
      this.currency = '$';
      this.resultCotacao = val / this.valueDolar;
    }
  }

  initForm() {
    this.formCotacao = this.formBuilder.group({
      valorCotacao: [null, Validators.compose([Validators.required])],
    });
  }
}
