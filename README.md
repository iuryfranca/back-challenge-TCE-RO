<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  <strong>back challenge TCE RO</strong>
</p>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#rocket-techs">Techs</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-getting-started">Getting Started</a> &#xa0; &#xa0;
</p>

<br>

## :dart: About

Olá, tudo bem? aqui é o Iury e esse é o projeto back-end do desafio para o projeto da creche do IFRO. Essa parte de back and eu não tenho muita experiência, mas consegui me virar ali no 30 para aprender e fazer o necessário: 

- Banco de conexão usado foi o postgres
- Open API implementado na url http://localhost:3333/api
- Módulo de User e Principal separados (microserviços) possibilitando mais modulos posteriotmente
- Possui validações padõres fornecidas pelo framework + validação customizadas para casos específicos
- API caáz de listar todos os cadastros, listar cadastro específico, criar, editar e excluir

O [FrontEnd](https://github.com/iuryfranca/front-challenge-TCE-RO/) é quem ficou responsavel por parte grafica de de interface do projeto! Espero que tenham gostado :)

   
    
## :rocket: Techs

The following technologies were used in the project:

- [@nestjs](https://nestjs.com/)


## :white_check_mark: Requirements

- [Node](https://nodejs.org/en/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Yarn](https://yarnpkg.com/lang/en/)

## :checkered_flag: Getting Started

```bash
# Clone this project
$ git clone https://github.com/iuryfranca/back-challenge-TCE-RO.git

# Install dependencies
$ yarn install

# Run docker (is required)
$ docker compose up -d

# Run the project
$ yarn start:dev

# The server will initialize in the <http://localhost:3000>
```
