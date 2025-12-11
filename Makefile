.PHONY: dev test build

# Inicia a aplicação em modo de desenvolvimento
dev:
	npm run dev

# Executa os testes automatizados com Cypress
test:
	npx cypress run

# Gera a build de produção da aplicação
build:
	npm run build
# Gera a build de produção da aplicação
deb:
	npm install

run:
	npm run start

all: deb test build run