# WEB DE NOTICIAS COLABORATIVAS

Este proyecto se trata de una plataforma de noticias colaborativas donde los usuarios pueden registrarse y publicar noticias en diferentes categorías temáticas. Los usuarios anónimos pueden visualizar la lista de las últimas noticias del día, noticias de días anteriores y filtrar por tema. Además, tienen la opción de iniciar sesión o registrarse proporcionando su nombre, correo electrónico, biografía y foto.

Los usuarios registrados tienen las mismas opciones que los usuarios anónimos, pero además pueden gestionar su perfil, publicar una nueva noticia con título, foto opcional, entradilla, texto de la noticia y tema, editar una noticia publicada previamente por ellos, borrar una noticia publicada por ellos y votar positiva o negativamente otras noticias.

## Instalar

- Crear una base de datos vacía en una instancia de MySQL local.

- Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

- Ejecutar el comando `npm install` o `npm i` para instalar las dependencias.

- Ejecutar `npm run initDB` para crear las tablas necesarias en la base de datos anteriormente creada.

- Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## Entidades

**`user:`:**
id
name
email
password
avatar
bio
createdAt
modifiedAt

**`news:`**
id
idUser
title
image (opcional)
introduction
text
category
upvotes
downvotes
createdAt
modifiedAt

## Endpoints de Usuarios Anónimos

- **GET** [`/news`] - Lista de las últimas noticias del día ordenadas por valoración.
- **GET** [`/news/old`] - Lista de noticias de días anteriores.
- **GET** [`/news/filter/:idCategory`] - Lista de noticias filtradas por tema.
- **POST** [`/users/register`] - Registro de usuario proporcionando nombre, correo electrónico, biografía y foto.
- **POST** [`/users/login`] - Inicio de sesión del usuario(login).(devuelve TOKEN)

## Endpoints de Usuarios Registrados

- **GET** [`/users`] - Devuelve información del usuario del token.TOKEN
- **PUT** [`/users`] - Edita el nombre, email del usuario o biografía. TOKEN
- **PUT** [`/users/avatar`] - Edita la foto del usuario. TOKEN
- **POST** [`/news`] - Publica una nueva noticia proporcionando título, imagen opcional, entradilla, texto y tema.TOKEN
- **PUT** [`/news/:idNews`] - Edita una noticia publicada por el usuario.TOKEN
- **DELETE** [`/news/:idNew`] - Borra una noticia publicada por el usuario.TOKEN
- **POST** [`/news/:idNews/vote`] - Vota positiva o negativamente una noticia. TOKEN
- **GET** [`/news/:idNews`] - Devuelve información de una noticia concreta.(A MAYORES)
- **DELETE** [`/users`] - Elimina al usuario.(A MAYORES)TOKEN

<!-- USUARIOS ANÓNIMOS:
1. visualizar la lista de últimas noticias del día ordenadas por valoración
2. visualizar noticias de diías anteriores
3. filtrado por: tema
4. login
5. registo: nombre, email, biografía y foto. Por otra parte están los

USUARIOS REGISTRADOS, y con ellos hay que hacer:
1. lo mismo que los anónimos, y además:
2. gestión del perfil de usuario: nombre, email, biografía y foto.
3. publicar una nueva noticia: título, foto (opcional), entradilla, texto de la noticia y tema.
4. editar una noticia publicada por el mismo usuario
5. borrar una noticia publicada por el usuario
6. votar positivamante o negativamente otras noticias -->
