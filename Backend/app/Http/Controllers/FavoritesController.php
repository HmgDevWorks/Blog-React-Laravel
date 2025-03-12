<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Services\FavoritesService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Categories;

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

    public function store(Request $request, $postId): JsonResponse
    {
        $user = auth()->user(); // Obtiene el usuario autenticado automáticamente
        return response()->json($this->favoritesService->addFavorite($user, $postId));
        // return response()->json($this->favoritesService->addFavorite($postId));
    }

    public function destroy(Request $request, $postId): JsonResponse
    {
        $user = auth()->user(); // Obtiene el usuario autenticado automáticamente
        return response()->json($this->favoritesService->removeFavorite($user, $postId));
        //return response()->json($this->favoritesService->removeFavorite($postId));
    }
}