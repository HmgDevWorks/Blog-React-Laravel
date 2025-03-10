<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FavoritesService {
    
    public function addFavorite(User $user, $postId){
        $post = Post::find($postId); // Encuentra el post

        if($post){
            $user->favorites()->attach($post->id, ['categories_id' => $post->categories_id]); //metodo para añadir las filas en la tabla favoritos, solo funciona si marcamos las relaciones de las tablas en los Models
            return response()->json(['mensaje','Post marcado como favorito']);
        }
        return response()->json(['mensaje','Post no encontrado']);
    }

    public function removeFavorite(User $user, $postId)
    {
        $post = Post::find($postId); // Encuentra el post

        if ($post) {
            $user->favorites()->detach($post->id); //metodo detach para eliminar de la tabla favoritos la fila cuando ya no es tu post el favorito
            return response()->json(['mensaje','Post eliminado de favorito']);
        }
        return response()->json(['mensaje','Post no encontrado']);
    }

    public function getFavoritesByID($userId)
    {
        $user = User::find($userId); //no hace falta poner ID ya que find es un metodo predefinido de laravel que busca la PK
        if ($user) {
            $favorites = $user->favorites()->get(); // Obtiene todos los favoritos del usuario
            return $favorites;
        }
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }
}