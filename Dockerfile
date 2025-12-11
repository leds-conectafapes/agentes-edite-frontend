# Use uma imagem oficial do Node.js como base
FROM node:20.15.1 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instale as dependências
RUN npm install --legacy-peer-deps

# Copie o restante do código
COPY . .

# Construa a aplicação
RUN npm run build-only

# Use uma imagem oficial do Nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos construídos para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copie o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponha a porta que o Nginx vai usar
EXPOSE 443 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]