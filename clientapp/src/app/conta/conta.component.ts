import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContaService } from '../conta.service';
import { Conta } from '../conta';

const CONTAS: Conta[] = [
  { id: 1, numeroConta: 1, codigoAgencia: 1, cpf: '12345678901'},
  { id: 2, numeroConta: 2, codigoAgencia: 1, cpf: '12345678901'},
  { id: 3, numeroConta: 3, codigoAgencia: 1, cpf: '12345678901'},
  { id: 4, numeroConta: 4, codigoAgencia: 1, cpf: '12345678901'},
  { id: 5, numeroConta: 5, codigoAgencia: 1, cpf: '12345678901'}
];

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
  contas = null;

  constructor(private router : Router, private contaService : ContaService) { }

  ngOnInit() {
    this.getContas();
  }

  getContas() : void
  {
    this.contaService.getContas().then (contas =>
      this.contas = contas
    );
  }


  goToDetail(conta:Conta): void {
    this.router.navigate(['/contas', conta.id]);
  }

}
