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

    public function getFavoritesForAuthenticatedUser(Request $request)
    {
        $user = $request->user(); // Obtener el usuario autenticado

        // Usamos el servicio para obtener los favoritos del usuario
        $favorites = $this->favoritesService->getFavoritesForUser($user);

        return response()->json($favorites);
    }

    public function store(Request $request, $postId): JsonResponse
    {
       $user = auth()->user(); // Obtiene el usuario autenticado desde el token
        if (!$user) {
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
    return $this->favoritesService->addFavorite($user, $postId);
    }

    public function destroy(Request $request, $postId): JsonResponse
    {
        $user = auth()->user(); // Obtiene el usuario autenticado automáticamente
        return response()->json($this->favoritesService->removeFavorite($user, $postId));
    }
}