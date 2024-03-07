### Para startar a plicação 
#### 1. Baixar o repositório https://github.com/alan-10/empy
####  2. Entrar na pasta api e rodar o comando `docker compose up` para startar o banco de dados
####  3. Nesta mesma pasta executar os seguinetes comandos
 - npm ci
 - npx generate
 - npx prisma migratation dev
 - npm run start:dev
   
    Estes comandos baixará as dependencias, criará as tabelas no banco de dados e vai startar o backend


####  4. Entrar dentro da pagina web e executar o comando
 - npm ci
 - npm run  start
   
   Este comando vai subir a aplicação frontend react na porta http://localhost:3000

### Ponto
Todas as funcionalidas estão funcionais alem de inclusões de validações como 
- não permitir a cliação de Assistente com email já utilizado
- não permitir o cadastro de clientes com o mesmo código na mesma rede

<details>
  <summary>Vídeo mostranso as funcionalidades </summary>

https://github.com/alan-10/empy/assets/50430772/e07c4ca2-7e4a-49de-bcfe-95fcbb5ce28e
  
</details>
   

