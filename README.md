
# Sistema de Gerenciamento de Tarefas

## Tecnologias Utilizadas

-   **NestJS**, **TypeORM**, **MySQL**, **Docker**, **Docker Compose**, **Jest**, **Redis**

## Configuração do Ambiente

### Pré-requisitos

-   Docker e Docker Compose instalados.

### Passos para Configuração

1.  **Clone o Repositório**
    ```csharp 
    git clone https://github.com/rogermov/task-notification.git
    cd https://github.com/rogermov/task-notification.git
    ```
2.  **Configuração do Banco de Dados**
    
    -   No arquivo `.env`, configure as variáveis de ambiente para o MySQL:
    
        ```csharp
		DATABASE_HOST=mysql
        DATABASE_PORT=3306
        DATABASE_USER=root
        DATABASE_PASSWORD=sua_senha
        DATABASE_NAME=task_notifications
        REDIS_HOST=redis
        REDIS_PORT=6379
        ```
3.  **Inicie o Contêiner**
    
    -   Para construir e iniciar a aplicação com todas as suas dependências, pode levar alguns segundos até subir os três containers (db, redis e app)
    ```csharp 
	    `docker-compose up --build
	```
    
	Obs: Antes, alterar senha do DB no arquivo `docker-compose.yml` para a mesma utiliada no arquivo `.env`
	
### Execução dos Testes E2E

-   Para executar os testes E2E da aplicação, você notará no terminal todas as funções da aplicação.
		
		
	 	docker-compose exec app npm run test:e2e
		
## Estrutura do Projeto

   -    `src/`: Contém todo o código fonte da aplicação.
    -   `tasks/`: Módulo responsável pela gestão das tarefas.
    -   `notifications/`: Módulo responsável pelo envio de notificações.

## Funcionalidades

-   **Criação de Tarefas**: Permite que o usuário crie novas tarefas.
-   **Listagem de Tarefas**: Lista todas as tarefas disponíveis.
-   **Atualização de Tarefas**: Permite marcar tarefas como concluídas.
-   **Exclusão de Tarefas**: Permite excluir tarefas existentes.
-   **Notificações**: Envia notificações quando uma tarefa é marcada como concluída.

## Testes com Postman

Você pode usar o Postman para testar as funcionalidades da API. Aqui estão alguns exemplos de como fazer as requisições:

### Exemplo de Requisição POST

-   **Endpoint**: `POST /tasks`
-   **JSON de Exemplo**:
```csharp
{
  "title": "Nova Tarefa",
  "description": "Descrição da nova tarefa",
}` 
```
-   **Descrição**: Este endpoint cria uma nova tarefa retornando um ID. Certifique-se de que os campos exigidos estejam presentes no JSON.

### Exemplo de Requisição PUT

-   **Endpoint**: `PUT /tasks/:id`
-   **JSON de Exemplo**:

```csharp 
{
  "email": "test@example.com"
} 
```

-   **Descrição**: Este endpoint atualiza a tarefa, usando o `email` como parâmetro. Substitua `:id` pelo ID da tarefa que deseja atualizar. No terminal, você verá a mensagem que foi marcada com sucesso e que foi enviado ao email desejado.

