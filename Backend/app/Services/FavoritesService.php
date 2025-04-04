<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FavoritesService {

    public function addFavorite(User $user, $postId) // Esta función permite no duplicar los post en la tabla favoritos
    {
        // Buscar el post
        $post = Post::find($postId);
    
        if (!$post) {
            return response()->json(['message' => 'errorMsg.errorPostNotFound']);
        }
    
        // Verificar si ya está en favoritos
        $exists = $user->favorites()->where('post_id', $postId)->exists();
    
        if ($exists) {
            return response()->json(['message' => 'infoMsg.infoPostDoubleFav']);
        }
    
        // Si no existe, lo añadimos
        $user->favorites()->create([
            'post_id' => $post->id,
            'created_at' => now(),
        ]);
    
        return response()->json(['message' => 'successMsg.successPostFav']);
    }
    



    public function removeFavorite(User $user, $postId)
        {
            $post = Post::find($postId); // Encuentra el post
            if ($post) {
                $user->favorites()->where('post_id', $post->id)->delete();
                return response()->json(['message' => 'successMsg.successPostDeleteFav']);
            }
            return response()->json(['message' => 'errorMsg.errorPostNotFound']);
        }

     public function getFavoritesForUser($user)
        {
            return $user->favorites()->with('post')->get()->pluck('post');
        }

    public function getFavoritesByID($userId)
    {
        $user = User::find($userId); //no hace falta poner ID ya que find es un metodo predefinido de laravel que busca la PK
        if ($user) {
            $favorites = $user->favorites()->with('post')->get();//devuelve los favoritos y el post entero
            return response()->json($favorites);
        }
        return response()->json(['message' => 'errorMsg.errorUserNotFound'], 404);
    }
}