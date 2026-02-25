
### Objetivo
Uma aplicação em Node.js desenvolvida para consumir, processar e persistir dados de colaboradores a partir de uma API externa. O projeto foi arquitetado com foco estrito em **Clean Architecture**, **Injeção de Dependências** e **Observabilidade**.


### Requisitos 
1. **RQ01** - Utilize um banco de dados SQLite ou outro de sua escolha.
2. **RQ02** - Crie uma tabela para armazenar os dados.
3. **RQ03** - Utilize o campo ‘email’ como chave única.
4. **RQ04** - Caso o colaborador já exista, atualize as informações.
5. **RQ05** - Persista somente usuário maiores de 18 anos.

### Decisões Técnicas 

1. O `RamdonUser` traduz o payload bruto  API externa para um formato limpo, protegendo a aplicação contra quebras de contrato.
2.  O `syncService` recebe o repositório e o provider de dados injetados via parâmetro, tornando o código modular.
3. A lógica de persistência verifica a existência do registro antes de decidir entre as operações de `INSERT` ou `UPDATE` (Check-then-Act). Um `UPSERT` seria mais performático porém a abordagem que usei garante a precisão da auditoria de registros gerada no relatório final.


## Como Executar Localmente


```bash
npm install
cd src
node index.js
```

