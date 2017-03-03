##MEMORANDO

Para desenvolver a aplicação "blue bank" foi divido em duas partes.

Para a parte back-end utilizou-se NodeJS (Express framework) com a implementação de API Rest. Esta API será consumida pelo front-end feito em Angular 2.
Acredito que com esta abordagem a estrutura de código fica melhor dividida ficando o cliente e o server bem independentes em sua evolução.

No desenvolvimento do back-end foi utilizado a abordagem TDD para desenvolvimento. Com esta abordagem, a qualidade do código e a confiança do
desenvolvimento são melhorados e consequentemente futuras modificações no código podem ser mais consistentes.

A parte front-end não foi utilizada a abordagem TDD, apesar de ser possível aplicá-la também. Para criar a estrutura do código front-end utilizou-se uma
ferramenta de apoio do Angular2 (@angular/cli). Esta ferramenta torna a codificação mais rápida e prática.
Integrou-se junto ao Angular2, o angular-material2 para os templates. Isto facilita no momento de criar o layout e componentes da página.

## Explicando a estrutura do código
bluebank
	.|.
	test
	   .|.
	   integration
		           .|.
			         routes - contém os testes de integração para as chamadas à API Rest por http.
			         helper.js - arquivo auxiliar para o framework mocha ao executar testes de integração
			         mocha.opts - arquivo com parâmetros para o framework mocha para executar testes de integração
	   unit
		    .|.
		    models - contém testes unitários para algumas operações realizadas nos modelos ao interagir com banco
		    services - contém testes unitários para funcionalidades de negócio, no caso o teste para transferência de fundos entre contas
		    helper.js - arquivo auxiliar para o framework mocha ao excutar testes unitários
		    mocha.opts - arquivo com parâmetros para o framework mocha para executar testes unitários
	src -	contém todo o código para back-end
	clientapp - contém todo o códgio para front-end
  .babelrc - configuração para babel (babel foi utilizado para utilizar alguns recursos atuais do javascript)
  .manifest.yml - configuração para deploy no Bluemix

##Observações
A parte fron-end não está totalmente finalizada. Foi criado a estrutura e a página inicial de contas com a integração para acessar a API de contas fornecida pelo back-end.


##Instruções deploy e execução
Para o front-end é necessário realizar o build com a ferramenta "@angula/cli" para poder utilizá-lo no deploy.
Para o back-end é utilizado a seção "scripts" do arquivo package.json para executar.
  npm start - iniciar aplicação
	npm run test-integration - rodar os testes de integração
  npm run test-unit - rodar os testes unitários

Para executar os testes é necessário ter um banco local - (bluebank_test).

O deploy da aplicação foi feita no ambiente Bluemix e estará acessível por
http://bluebankbyui.mybluemix.net:7070
