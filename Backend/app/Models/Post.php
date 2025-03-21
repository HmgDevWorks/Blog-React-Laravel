<?php 
// Los modelos de Roles y Permisos no son necesarios crealos puesto que estan en una carpeta: vendor/spatie/laravel-permision/src/models 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;


class Post extends Model
{
    use HasFactory, Notifiable;

    protected $appends = ['category_name','isFav'];

    protected $hidden = ['categories'];  //se utiliza para poder ocultar en el json cosas del campo category

    public function getIsFavAttribute()
    {
        $user = Auth::user();
        if (!$user) {
            return false; // Si no hay usuario autenticado, no puede marcarse como favorito
        }

        return $this->favorites()->where('user_id', $user->id)->exists();
    }

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
        'views'
    ];

    // Relación muchos a muchos con los usuarios (si deseas acceder a favoritos desde el post)
    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites') // 'favorites' es la tabla intermedia
                    ->withPivot('categories_id') // Si necesitas campos adicionales
                    ->withTimestamps();
    }
    
    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites', 'post_id', 'user_id');
    }

    public function categories() //funcion que gracias al hidden permite mostrar un campo de categories
    {
        return $this->belongsTo(Categories::class, 'id_categories');
    }

    public function getCategoryNameAttribute() //esto se puede hacer aqui porque hemos creado la relacion entre ambas tablas y podemos llamar asi al category
    {
      //  return $this->categories->name;
        return $this->categories ? $this->categories->name : null; // Devuelve el nombre de la categoría
    }
}
