# Use a imagem base do Node.js
FROM node:16.16 as build-stage

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de dependências do projeto
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Execute o comando de build do Angular
RUN npm run build

# Use uma imagem leve do servidor web para servir a aplicação Angular
FROM nginx:latest

# Copie os arquivos de build do Angular para o diretório de publicação do Nginx
COPY --from=build-stage /app/dist/pokedex /usr/share/nginx/html

# Defina a porta em que o Nginx irá escutar
EXPOSE 80

# O Nginx é iniciado automaticamente pela imagem base

