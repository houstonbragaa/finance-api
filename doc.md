# Proximos passos

- [x] colocar alguns dados do servidor express com variaveis de ambiente
- [x] baixar o postman no browser
- [x] mudar os diretorios nas rotas express

- [x] Planejar todas as rotas visualmente com tabelas
- [x] Começar fazendo o repository do projeto
- [x] Criar pasta para repositores com o banco selecionado e um javascript para colocar a classe da camada
- [x] criar método execute() na classe para chamar o query do postgres e fazer um INSERT com os dados (Usar sintaxe da lib pg para dados dinâmicos no postgres) 
- [x] colocar o query dentro de um results retornando no fim da classe
- [x] commit
- [x] criar o user case folders e seu javascript
- [x] criar classe com seu execute e seu parametro
- [x] Instalar o Bcrypt
- [x] Instalar o UUID
- [x] Gerar ID aleatória e criptografar a senha com bcrypt.hash
- [x] Inserir o usuario ao banco de dados
  - [x] Criar objeto user com os dados e senha criptografada
  - [x] Instanciar o repository passando objeto como parametro para o execute
  -[x] commit

- [x] Criar pasta de controllers com o javascript do create-user controller
- [x] Criar classe com seu execute passando um obj como parametro que vai ser basicamente o body da requisição
- [x] Fazer a validação com campos obrigatórios e campos vazios
  - [x] Criar um array com os nomes dos campos
  - [x] Iteramos a lista verificando se tem algum erro para lançar de acordo com os campos passados como parametro do body
- [x] Chama-se o service instanciando sua classe e passando o params como parametro
- [x] Retornamos o status code e a mensagem de erro caso dê erro no cliente e no servidor
- [x] Criamos uma rota post no js raiz do projeto, chamamos o controller como response e o execute contendo o req como parametro
- [x] enviar o codigo de erro e body para o cliente na rota
- [x] Testar no postman
- [x] Ajustar o repository da forma correta para receber os dados corretamente no postman
- [x] Commit
- [x] Criar outras validações
  - [x] Email
  - [x] Password
  - [x] Email já existente no banco (criar uma classe para isso no repository)
- [x] Criar um helper para as validações e apenas importar no controller

- [x] criar repository, service e controller do get-user-by-id

- [x] Consertar o repository separado com a validação se o email ja existe no banco de dados

//update user

- [] Criar toda a estrutura de como vai ficar a arquitetura do update user route
- [] Criar o repositório passando o id do usuário e os parametros da requisição
 UPDATE users
 SET ....
 WHERE ID =
 RETURNING *          -- PERMITE RETORNAR O USUÁRIO ATUALIZADO

- [] Criar script com 2 arrays vazios, fields e values, para assim poder montar toda updateQuery, fazendo um forEach do Object.keys(params) 
- [] 
