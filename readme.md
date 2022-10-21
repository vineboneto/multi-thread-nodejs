## Worker threads with NODEJS

Estudando de caso com utilização de threads com NodeJS

## Requerimentos

 - NodeJS >= 16.X
 - Postgres

## Começando

Criar `.env` com base em `.env.example` para se conectar ao banco.

```bash
# Dependências
$ yarn

# Criar database
$ yarn prisma db push

# Criar banco de dados
$ yarn seed

# Executar default --thread
$ yarn start --[promise | thread | mono]
```

## Benchmark

> **Mono thread**

default 1:04.394 (m:ss.mmm)

> **Mono thread com promises**

default: 23.492s

> **Thread**

default: 2.267s

