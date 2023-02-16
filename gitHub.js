//! Como saber las ramas que tenemos en nuestro proyecto.
//?  $ git branch



//! Como crear una rama nueva. Es aconsejable darle un nombre que indetifique
//! que fichero vamos a actualizar y que accion vamos a realizar.
//?    $ git branch "crear newUser"



//! Como nos movemos a la rama que acabamos de crear.

//*    1. Comprobar si la rama está creada. 
//?        $ git branch
    
//*    2.Desplazarnos a la rama que hemos creado
//?        $ git checkout crear newUser

//*    3.Comprobamos con git branch si estamos en la rama que hemos
//*      hemos seleccionado.
//?        * crear newUser



//! Modificamos el fichero de la rama solicitada y al terminar realizamos
//!   el commit. !!! IMPORTANTE: NO CAMBIAR DE RAMA SIN HACER EL COMMIT DE LA RAMA ACTUAL!!!
    
//?    $ git status
//?    $ git add .
//?    $ git status
//?    $ git commit -m " "
//?    $ git push -u origin crear newUser (nombre de la rama)
    


//! Al realizar el commit nos dirigimos a GitHub y en el repositorio deberemos de tener un rama 
//!   creada (Compare & pull request).

//*   1. Pinchamos en compare & pull request.
//*   2. Comprbamos abajo si los cambio estan correctos.
//*   3. Pinchamos en Create pull request.
//*   4. Nos volvemos a asegurar de que lo cambios realizados estan correctos.
//*   5. Pulsamos el botón de Merge pull request (al darle a este botón no hay vuelta atrás).
//*   6. Pulsamos el botón de confirm merge.


//! IMPORTANTEEEE!!!!
//! Siempre que se realice un cambio se debe de avisar al resto del equipo y dejar lo que estemos 
//! actualizando para realizar un pull de la rama
//! master, para asi tener todos los cambios del proyecto.

//! Volvemos a la rama en la que estabamos trabajando y no vamos a ver los cambios que hemos recogido con el pull
//! es necesario actualizar esta rama en la que estamos trabajando.

//* 1. Volvemos a la rama en la que estamos trabajando.
//? $ git bracnh newUser

//* 2. Actualizamos todos los cambios de la rama master desde la rama de trabajo.
//? $ git rebase master


//! Cuando terminamos de trabajar en la rama que se ha creado debemos de eliminar esa rama.

//
//*   1. Consultar la lista de ramas.
//?     $ git branch

//*   2. Eliminamos la rama de forma local.
//?     $ git branch -d crear newUser

//*   3. Comprobar la lista de ramas para consultar que la rama se ha eliminado
//?     $ git branch

//*  Para eliminar una rama de forma remota vamos a GitHub y en el proyecto en el apartado de branch le damos
//*  al icono de papelera para eliminar la rama.