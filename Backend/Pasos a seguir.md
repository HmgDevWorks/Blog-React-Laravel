## pasos a seguir


# hacer base de datos

-pull
-composer update
-abrir workbench
-cambiar .env
-descomentar desde la 24
-cambiar conexion a mysql
-poner contraseña
-crear base de datos en workbench
-cambiar laravel por el nombre que se le ha puesto a la base de datos
-php artisan migrate
-php artisan db:seed
(si por lo que sea se rompe la base de datos, quieres reiniciar los datos o algo por el estilo hacer este comando)
*-php artisan migrate:fresh --seed

# hacer que funcione(?)

-php artisan key:generate
-php artisan serve


# cors
(en principio no hace falta, si no funciona prueba a poner esto)
-php artisan config:publish cors   <!-- puede que no haga falta -->
-php artisan install:api
