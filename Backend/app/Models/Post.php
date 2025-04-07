<?php 
// Los modelos de Roles y Permisos no son necesarios crealos puesto que estan en una carpeta: vendor/spatie/laravel-permision/src/models 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;



class Post extends Model
{
    use HasFactory, Notifiable;

    protected $appends = ['category_name','isFav','author_name',];

    protected $hidden = ['categories', 'author'];  //se utiliza para poder ocultar en el json cosas del campo category

    protected static function boot()
    {
        parent::boot();

        static::updated(function ($post) { // elimina todos los registros de la tabla favoritos cuando un post pasa a status deleted
            if ($post->wasChanged('status') && $post->status === 'deleted') {
                DB::table('favorites')->where('post_id', $post->id)->delete();
            }
        });
    }

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
        return $this->categories ? $this->categories->name : null; // Devuelve el nombre de la categoría
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id'); // 'user_id' es la clave foránea
    }

    public function getAuthorNameAttribute()
    {
        return $this->author ? $this->author->name_user : null;
    }
}
