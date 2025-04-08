<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon; 

class FavoritesService {

    public function addFavorite($postId) // Esta función permite no duplicar los post en la tabla favoritos
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'errorMsg.errorUserNotAuth'], 401); 
        }

        $post = Post::find($postId);
        if (!$post) {
            return response()->json(['message' => 'errorMsg.errorPostNotFound']);
        }

        if ($post->status === 'draw' || $post->status === 'deleted') {
            return response()->json(['message' => 'errorMsg.errorPostStatusInvalid'], 400);
        }
    
        if ($user->favorites()->where('post_id', $postId)->exists()) { //si ya esta en favoritos te devuelve error
            return response()->json(['message' => 'infoMsg.infoPostDoubleFav']);
        }
    
        $user->favorites()->attach($postId, [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
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