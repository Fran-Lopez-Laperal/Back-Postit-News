# WEB DE NOTICIAS COLABORATIVAS

Este proyecto se trata de una plataforma de noticias colaborativas donde los usuarios pueden registrarse y publicar noticias en diferentes categorías temáticas. Los usuarios anónimos pueden visualizar la lista de las últimas noticias del día, noticias de días anteriores y filtrar por categorías. Además, tienen la opción de iniciar sesión o registrarse proporcionando su nombre, correo electrónico, biografía y foto.

Los usuarios registrados tienen las mismas opciones que los usuarios anónimos, pero además pueden gestionar su perfil, publicar una nueva noticia con título, foto (opcional), entradilla, texto de la noticia y categoría asociada, editar una noticia publicada previamente por ellos y borrarla, además de votar positiva o negativamente otras noticias.

Existe el rol admin, el cual puede añadir categorías, para posteriormente, poder ser usadas en las noticias.

## Instalar

- Crear una base de datos vacía en una instancia de MySQL local.

- Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

- Ejecutar el comando `npm install` o `npm i` para instalar las dependencias.

- Ejecutar `npm run initDB` para crear las tablas necesarias en la base de datos anteriormente creada.

- Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## Entidades

**`user:`:id, name, email, password, avatar, bio, role, createdAt, modifiedAt**
**`news:`:id, title, image, introduction, text, idUser, createdAt, modifiedAt**
**`categories:`:id, name, createdAt, modifiedAt**
**`newscategories:`:id, idNews, idCategory, createdAt, modifiedAt**
**`votes:`:id, idUser, idNew, value, modifiedAt**

## Endpoints de Usuarios Anónimos

- **GET** [`/news`] - Lista de las últimas noticias del día ordenadas por valoración.
- **GET** [`/news/old`] - Lista de noticias de días anteriores.🔥
- **POST** [`/news/filter`] - Lista de noticias filtradas por categorías.🔥
- **POST** [`/users/register`] - Registro de usuario proporcionando nombre, correo electrónico, biografía y foto.🔥
- **POST** [`/users/login`] - Inicio de sesión del usuario(login).(devuelve TOKEN)🔥

## Endpoints de Usuarios Registrados

- **GET** [`/users`] - Devuelve información del usuario del token.TOKEN🔥
- **PUT** [`/users`] - Edita el nombre, email del usuario o biografía. TOKEN🔥
- **PUT** [`/users/avatar`] - Edita la foto del usuario. TOKEN🔥
- **POST** [`/news`] - Publica una nueva noticia proporcionando título, imagen opcional, entradilla, texto y categoría.TOKEN🔥
- **PUT** [`/news/:idNew`] - Edita una noticia publicada por el usuario.TOKEN🔥
- **DELETE** [`/news/:idNew`] - Borra una noticia publicada por el usuario.TOKEN🔥
- **GET** [`/news/:idNews/vote/:value`] - Vota positiva o negativamente una noticia. TOKEN🔥
- **GET** [`/news/:idNew`] - Devuelve información de una noticia concreta.🔥
- **DELETE** [`/users`] - Elimina al usuario.TOKEN🔥
- **POST** [`/news/categories`] - Crear categorias (rol admin).🔥
