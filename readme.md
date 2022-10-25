## Worker threads with NODEJS

Estudo da utilização de threads com NodeJS

## Requerimentos

 - NodeJS >= 16.X
 - OS: Windows(Testado) ou Linux(Não testado)

## Começando


```bash
# Dependências
$ yarn

# Executar default --thread
$ yarn start --[promise | thread | mono]
```

## Benchmark

> **Mono thread**

default: 42.945s

> **Mono thread com promises**

default: 14.646s

> **Thread**

default: 1.429s

