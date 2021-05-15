# Introdução ao NoSQL com Apache Cassandra

Projeto simples de manipulação de um banco de dados Cassandra como introdução a NoSQL da faculdade.

## Executando a aplicação

Execute o docker-compose para iniciar um container com a imagem do Cassandra. O banco de dados irá usar a porta :9042 para CQL em localhost, com as credenciais 'cassandra' para usuário e senha.

```bash
$ docker-compose up # Passe a flag -d para executar em background
```

Quando o datacenter subir, basta instalar as dependências da aplicação NodeJS e executar a mesma.

```bash
$ yarn
$ yarn dev
```

***

Feito com 💜 por Gabriel Bartoczevicz [Entre em contato!](https://www.linkedin.com/in/gabriel-bartoczevicz-7360901a6/)
