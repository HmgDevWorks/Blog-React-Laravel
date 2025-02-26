## pasos a seguir


# hacer base de datos

-pull  
-composer update  
-abrir workbench  
-cambiar .env  
-descomentar desde la 24 (las 5 lineas)  
-cambiar conexion a mysql  
-poner contraseña  
-crear base de datos en workbench  
-cambiar laravel por el nombre que se le ha puesto a la base de datos  
-php artisan migrate  
-php artisan db:seed  
(si por lo que sea se rompe la base de datos, quieres reiniciar los datos o algo por el estilo hacer este comando)  
*-php artisan migrate:fresh --seed  
-Cargamos laravel/spatie ->>> composer require spatie/laravel-permission  
-Cargamos laravel/breeze ->>> composer require laravel/breeze   
-Para cargar la tabla permisos del spaite ->>> php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider  
-En la carpeta database/migrations se crean los modelos de las tablas que vamos a migrar a nuestra base de datos  
-php artisan make:model Category-mcr (crea un archivo en migration, y en app-controllers y en model)  
-Una vez creada todas las migraciones de las tablas -> php artisan migrate:fresh (hace un reset de las tablas de datos creadas y vuelve a migrarlas)  
-Con las migraciones creadas dentro de la carpeta app en la subcarpeta model creamos 3 archivos que se corresponden a las tablas principales, dentro de ellas crearemos las clases para que nuestra tabla  sepa que datos son rellenables tanto por el usuario por nosotros  
-Los modelos de las tabla ROL y PERMISOS los crea spatie por defecto y no se deberian tocar (se encuentran en la carpeta vendor)
-Hacemos los seeders para comprobar que todas las tablas funcionan y que los datos que introducimos son los que queremos/correctos
    -Para crearlos se crean nuevos archivos que los llamaremos como las tablas+Seeder.php donde ahi introduciremos los datos
    -Para que se introduzcan en la tabla en el archivo que ya viene creado "DatabaseSeeder.php" tenemos que meter en la funcion run una llamada a la pagina creada de cada tabla del seeder
-php artisan migrate:fresh --seed (para migrar las tablas y los seeders )
-Teniendo ya todo lo anterior comprobado y funcionando correctamente creamos la carpeta servicios dentro de APP y creamos archivos por cada tabla principal que tengamos, en nuestro caso 5
-En estos archivos vamos a crear las clases/funciones que van a manejar la logica de la app/web como mostrar todos los posts, buscar algun post con su Id, poder crear usuarios, actualizarlos etc..
-Lo siguiente sera dentro de app/http/controllers sera configurar nuestra carpeta de controllers que tendremos que tener un archivo por cada archivo Service que hayamos creado y se utiliza basicamente para manejar las peticionesa http y devolver unas respuestas
-Pasamos a la carpeta routes, en nuestro caso utilizaremos una api ya que estan trabajando en el front con react y no es un blade propio incluido con el laravel, aqui introduciremos cada ruta creada en los controladores con sus respectivas funciones para que pueda procesar las peticiones, aqui se trabaja con los method get(para la solicitud de datos) post(para solicitar la creacion de datos nuevos) put(para actualizar/modificar los datos ya creados) delete(como su nombre bien indica, borra datos xd).
-Para comprobar que estas rutas funcionan se puede utilizar el **Postman** 
-QUEDA POR PONER COSAS DE LAS AUTORIZACIONES, ROLES Y PERMISOS QUE YO NPI
# hacer que funcione(?)

-php artisan key:generate  
-php artisan serve  


# cors
(en principio no hace falta, si no funciona prueba a poner esto)
-php artisan config:publish cors   <!-- puede que no haga falta -->  
-php artisan install:api  