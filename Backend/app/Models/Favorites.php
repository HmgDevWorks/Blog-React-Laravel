<?php 
// Los modelos de Roles y Permisos no son necesarios crealos puesto que estan en una carpeta: vendor/spatie/laravel-permision/src/models 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // Añadimos esta linea y la siguiente para que la linea 12 funcione
use Illuminate\Notifications\Notifiable;

class Favorites extends Model
{
    use HasFactory, Notifiable;
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
