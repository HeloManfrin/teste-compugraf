# Compugraf

Projeto criado com [Angular CLI](https://github.com/angular/angular-cli) versão 14.2.2.

## Install

Rodar o comando `npm install para a instalação das dependências do projeto.

## Development server

Rodar o comando `ng serve` para iniciar o servidor. Navegar para `http://localhost:4200/`.

## Build

Rodar o comando `ng build` para criar um build do proketo. Os artefatos serão armazenados em `dist/`.

## Obs:

Devido a problemas de cors com a api do google, utilizei desse artefato pra conseguir rodar o projeto local e fazer a requisição sem problemas.
( o comando apenas desabilita a função de segurança do navegador).

Abrir o cmd.
Entrar na pasta do chrome.
Exemplo: C:\Program Files (x86)\Google\Chrome\Application

Digitar o comando abaixo
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

Usar a nova instancia para consumir o serviço de frete.
