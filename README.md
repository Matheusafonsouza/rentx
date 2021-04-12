**RF** => Requisitos funcionais

**RNF** => Requisitos não funcionais

**RN** => Regra de negócio

## Cadastro de carro

* RF - Deve ser possível cadastrar um novo carro.
* RN - Não deve ser possível cadastrar um carro com uma placa já existente.
* RN - O carro deve ser cadastrado como disponível por padrão.
* RN - O usuário responsável pelo cadastro deve ser um usuário administrador.

## Listagem de carros

* RF - Deve ser possível listar todos os carros disponíveis.
* RF - Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
* RF - Deve ser possível listar todos os carros disponíveis pelo nome da marca.
* RF - Deve ser possível listar todos os carros disponíveis pelo nome do carro.
* RN - O usuário não precisa estar logado no sistema para ver a listagem de carros disponíveis.

## Cadastro de especificação no carro

* RF - Deve ser possível cadastrar uma especificação para um carro.
* RF - Deve ser possível listar todas as especificações.
* RF - Deve ser possível listar todos os carros.
* RN - Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
* RN - Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
* RN - O usuário responsável pelo cadastro deve ser um usuário administrador.

## Cadastro de imagens do carro

* RF - Deve ser possível cadastrar a imagem do carro.
* RF - Deve ser possível listar todos os carros.
* RNF - Utilizar o multer para upload dos arquivos.
* RN - O usuário pode cadastrar mais de uma imagem para o mesmo carro.
* RN - O usuário responsável pelo cadastro deve ser um usuário administrador.

## Aluguel

* RF - Deve ser possível cadastrar um aluguel.
* RN - O aluguel deve ter duração mínima de 24 horas.
* RN - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
* RN - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
