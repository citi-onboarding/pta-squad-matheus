<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/citi-onboarding/pta-boilerplate">
    <img src="./assets/logoCITi.png" alt="Logo" width="180px">
  </a>

  <h3 align="center">PTA</h3>

  <p align="center">
  Este boilerplate foi criado em 2025.1 com a proposta de trazer a frente mobile para o Processo de Treinamento de Área (PTA) do CITi. Ele foi desenvolvido com base no boilerplate utilizado nos processos seletivos de 2022 e atualizado em 2023.2, que tinha como objetivo aproximar as pessoas aspirantes da realidade dentro da empresa. Esta nova versão mantém esse propósito, ao mesmo tempo em que amplia a capacitação técnica, alinhando-se às demandas atuais da empresa.
    <br />
    <a href="https://github.com/citi-onboarding/pta-boilerplate"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/citi-onboarding/pta-boilerplate/issues">Report Bug</a>
    ·
    <a href="https://github.com/citi-onboarding/pta-boilerplate/issues">Request Feature</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Tabela de Conteúdo</h2></summary>
  <ol>
    <li><a href="#about-boilerplate">About Boilerplate</a></li>
    <li><a href="#server">Server</a></li></li>
    <ul>
        <li><a href="#how-to-install">How To Install</a></li></li>
        <li><a href="#how-to-run">How To Run</a></li></li>
        <li><a href="#citi-abstraction-documentation">Citi Abstraction Documentation</a></li></li>
        <ul>
        <li><a href="#are-values-undefined">Are Values Undefined</a></li></li>
        <li><a href="#insert-into-database">Insert Into Database</a></li></li>
        <li><a href="#get-all">Get All</a></li></li>
        <li><a href="#find-by-id">Find By ID</a></li></li>
        <li><a href="#delete-value">Delete Value</a></li></li>
        <li><a href="#delete">Update</a></li></li>
        </ul>
    </ul>
    <li><a href="#client">Client</a></li>
        <ul>
        <li><a href="#how-to-install-client">How To Install Client</a></li></li>
        <li><a href="#how-to-run-client">How To Run Client</a></li></li>
        </ul>
    </ul>
    <li><a href="#add-new-dependencies">Add New Dependencies</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<br/> 

## About Boilerplate
<br/>

  Esse boilerplate foi criado durante o processo seletivo de 2022 do CITi e ele tem o intuito de aproximar as pessoas aspirantes à realidade
  dentro do CITi. O boilerplate será usado durante a última etapa do processo seletivo, a qual tem o objetivo de capacitar tecnicamente as pessoas que entrarão no CITi.
  O template foi criado em um monorepo e está estruturado em cliente (mobile) e servidor.

<p align= "center">
    <img src = "./assets/client-server.png" width="85%" margin-top="20px"/>
</p>


O server contém uma estrutura base de código voltada à construção de uma API, incluindo uma abstração pensada para facilitar o contato inicial das pessoas aspirantes com o desenvolvimento de back-end. Já o cleint, apresenta uma base de código para a construção de toda a interface web da aplicação. A nova pasta mobile traz uma estrutura inicial para o desenvolvimento da versão mobile da aplicação, ampliando o escopo técnico e alinhando-se às frentes utilizadas em projetos reais do CITi.


<br/> 

## Server

<br/>

## How To Install

<br/>

0. Certifique-se que o **node** e o **pnpm** estejam devidamente instalados. 
   ```bash
   npm i -g pnpm
   ```

1. Clone o repositório

   ```sh
   git clone URL_DO_REPOSITÓRIO
   ```

2. Entre na pasta /server do repositório

3. Abra a pasta /server no vscode

4. Vá em terminal e abra o novo terminal 

5. Com o terminal aberto, escreva essa sentença abaixo e dê enter

   ```sh
   pnpm install
   ```

   ou 

   ```sh
   pnpm i
   ```

<br/> 

## How To Run

<br/>

0. Certifique-se que o docker esteja devidamente instalado
1. Com a pasta /server aberta no vscode, crie um novo arquivo e o nomeie de ".env"
2. Dentro desse novo arquivo criado, coloque esse texto abaixo

   ```javascript
      # ###### GENERAL SETTINGS #######
      PROJECT_NAME=pta
      SERVER_PORT=3001 

      # ###### DATABASE SETTINGS #######
      DATABASE_TYPE=postgres
      DATABASE_HOST=${PROJECT_NAME}-db
      DATABASE_PORT=5432
      DATABASE_USER=postgres
      DATABASE_PASSWORD=docker
      DATABASE_DB=${PROJECT_NAME}

      DATABASE_URL=${DATABASE_TYPE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}
   ```
3. Abra um novo terminal no vscode
4. Com o terminal aberto, escreva essa sentença abaixo e dê enter

   ```sh
   docker-compose up
   ```

   ou 

   ```sh
   docker compose up
   ```

5. Espere que o terminal esteja dessa maneira

    <p align= "center"><img src= "./assets/server-status.png" width="85%"/>
        
    </p>

6. Com este terminal rodando, abra outro terminal, ainda na pasta /server, e rode essa sentença abaixo

   ```sh
   pnpm migration
   ```

   *OBS. 1: Ao aparecer o campo "Enter a name for the new migration:", digite uma frase rápida que indique o que foi feito (ex.: add model user). A migration é como se fosse o commit do banco de dados.*
   
   *OBS. 2: É necessário que esse comando seja rodado a cada vez que você modificar o arquivo `schema.prisma`*

<br/> 

## Citi Abstraction Documentation

<br/>

### Are Values Undefined

<br/>

Essa função verifica se existe um valor undefined passando no argumento.

- Observação: Essa função recebe quantos argumentos forem preciso.

   
    
   ```javascript 
    Retorna o booleano true caso exista valores undefnined
   ```

   ```javascript
    Retorna o booleano false caso exista valores undefnined
   ```

Exemplo:
<p align= "center">
    <img src= "./assets/undefined.png" width="85%"/>
    </p>

<br/> 

### Insert Into Database

<br/>

Essa função tem a finalidade de inserir um valor de modelo dentro de um banco de dados.

- Observação: Essa função recebe o novo objeto a ser inserido como argumentos.

<br/>

   ```javascript 
    Retorna https 201 caso o procedimento ocorra de forma correta
   ```

   ```javascript
    Retorna https 400 caso o procedimento NÃO ocorra de forma correta
   ```


Exemplo:
<p align= "center">
    <img src= "./assets/insert.png" width="85%"/>
    </p>

<br/> 

### Get All

<br/>

Essa função tem a finalidade de pegar TODOS os valores de modelo dentro de um banco de dados.

- Observação: Essa função não tem argumentos.

<br/>

   ```javascript 
    Retorna https 200 caso o procedimento ocorra de forma correta
   ```

   ```javascript
    Retorna https 400 caso o procedimento NÃO ocorra de forma correta
   ```


Exemplo:
<p align= "center">
    <img src= "./assets/get.png" width="85%"/>
    </p>

<br/> 

### Find By Id

<br/>

Essa função tem a finalidade de procurar um valor de modelo dentro de um banco de dado, utilizando o ID.

- Observação: Essa função recebe o ID como argumento.

<br/>

   ```javascript 
    Retorna o valor procurado caso o procedimento ocorra de forma correta
   ```

   ```javascript
    Retorna undefined caso o procedimento NÃO ocorra de forma correta
   ```


Exemplo:
<p align= "center">
    <img src= "./assets/find.png" width="85%"/>
    </p>

<br/> 


### Delete Value

<br/>

Essa função tem a finalidade de deletar um valor de modelo dentro de um banco de dado, utilizando o ID.

- Observação: Essa função recebe o ID como argumento.

<br/>

   ```javascript 
    Retorna https 200 caso o procedimento ocorra de forma correta
   ```

   ```javascript
    Retorna https 400 caso o procedimento NÃO ocorra de forma correta
   ```

Exemplo:
<p align= "center">
    <img src= "./assets/delete.png" width="85%"/>
    </p>

<br/> 

### Update Value

<br/>

Essa função tem a finalidade de atualizar um valor de modelo dentro de um banco de dado, utilizando o ID.

- Observação: Essa função recebe o ID e os novos valores como argumentos.

<br/>

   ```javascript 
    Retorna https 200 caso o procedimento ocorra de forma correta
   ```

   ```javascript
    Retorna https 400 caso o procedimento NÃO ocorra de forma correta
   ```

Exemplo:
<p align= "center">
    <img src= "./assets/update.png" width="85%"/>
    </p>

<br/> 

## Client

<br/>

## How To Install Client

<br/>

1. Entre na pasta /client do repositório

2. Abra a pasta /client  no vscode

3. Vá em terminal e abra o novo terminal 

4. Com o terminal aberto, escreva essa sentença abaixo e dê enter

   ```sh
   pnpm install
   ```

   ou 

   ```sh
   pnpm i
   ```

<br/> 

## How To Run Client

<br/>

1. Entre na pasta /client do repositório

2. Abra a pasta /client no vscode

3. Vá em terminal e abra o novo terminal 

4. Com o terminal aberto, escreva essa sentença abaixo e dê enter

   ```sh
   pnpm run dev
   ```

3. Espere que o terminal esteja dessa maneira

    <p align= "center"><img src= "./assets/client-status.png" width="85%"/>
        
    </p>

<br/> 

## Mobile

<br/>

## How To Install Mobile

<br/>

1. Entre na pasta /mobile do repositório

2. Abra a pasta /mobile  no vscode

3. Vá em terminal e abra o novo terminal 

4. Com o terminal aberto, escreva essa sentença abaixo e dê enter

   ```sh
   pnpm install
   ```

   ou 

   ```sh
   pnpm i
   ```

<br/> 

## How To Run Mobile

<br/>

1. Certifique-se de que o aplicativo Expo Go esteja instalado em seu celular (disponível para Android e iOS)

2. Entre na pasta /mobile do repositório

3. Abra a pasta /mobile no vscode

4. Vá em terminal e abra o novo terminal

5. Com o terminal aberto, escreva essa sentença abaixo e dê enter

   ```sh
   pnpm run start
   ```

6. No terminal, aparecerá um QR Code. Escaneie esse código com o aplicativo Expo Go no seu celular para abrir o app.
   Obs: seu computador e celular devem estar na mesma rede Wi-Fi

        
    </p>

<br/> 

## Add New Dependencies

<br/>

Não instale novas dependências sem a autorização da pessoa gerente do projeto. Caso seja preciso, converse com gerentes e peça direcionamento 
de como faz para adicionar. 


<br/> 

## Contact

<br/>

- [Alex Damascena](https://github.com/apfdamascena), líder de desenvolvimento em 2022.1 - apfd@cin.ufpe.br
- [Tiago Lima](https://github.com/titi-lima), líder de desenvolvimento em 2023.2 - tmsl@cin.ufpe.br
- [Thaís Neves](https://github.com/thaisnevest), líder de desenvolvimento em 2025.1 - tns2@cin.ufpe.br

## 2025 Boilerplate

<br/>

- [apfdamascena/pta-boilerplate](https://github.com/apfdamascena/pta-boilerplate)
