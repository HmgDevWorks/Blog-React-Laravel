<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Services\FavoritesService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Categories;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Auth;

class FavoritesController extends Controller
{
    protected $favoritesService;

    public function __construct(FavoritesService $favoritesService)
    {
        $this->favoritesService = $favoritesService;
    }

    public function index($userId): JsonResponse
    {
        return response()->json($this->favoritesService->getFavoritesByID($userId));
    }

    public function getFavoritesForAuthenticatedUser()
    {
      //  $user = $request->user(); // Obtener el usuario autenticado

        // Usamos el servicio para obtener los favoritos del usuario
       // $favorites = $this->favoritesService->getFavoritesForUser($user);

        return $this->favoritesService->getFavoritesForUser();
    }

    public function store($postId)
    {
        return $this->favoritesService->addFavorite($postId);
    }

    public function getFavsCount()
    {
        $user=Auth::user();
        return $user->favorites()->count();

    }

    public function destroy(Request $request, $postId): JsonResponse
    {
        $user = auth()->user(); // Obtiene el usuario autenticado automáticamente
        return response()->json($this->favoritesService->removeFavorite($user, $postId));
    }
}