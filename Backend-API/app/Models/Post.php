<?php 
// Los modelos de Roles y Permisos no son necesarios crealos puesto que estan en una carpeta: vendor/spatie/laravel-permision/src/models 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // Añadimos esta linea y la siguiente para que la linea 12 funcione
use Illuminate\Notifications\Notifiable;

class Post extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [ // Copiamos la estructura de el modelo user.php y cambiamos los campos de la tabla para que concuerde con la tabla Post
        'id_categories',
        'user_id',
        'title',
        'content',
        'status',
    ];


}
