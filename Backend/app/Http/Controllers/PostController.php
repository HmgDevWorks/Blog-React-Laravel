<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{

    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json($this->postService->getLastTenPosts());
    }

    public function show(): JsonResponse
    {
        return response()->json($this->postService->getAllPost());
    }

    public function showOne(Post $id): JsonResponse
    {
        return response()->json($this->postService->showPost(post: $id));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        return $this->postService->createPost($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post): JsonResponse
    {
        return $this->postService->updatePost($request, $post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): JsonResponse
    {
        return $this->postService->destroyPost($post);
    }

    public function postUser($userId): JsonResponse
    {
        return response()->json($this->postService->getPostsByUser($userId)); //Route::get('/posts/user/{id}', [PostController::class, 'getPostsByUser']);
    }


    public function searchPosts(Request $request)
    { // En esta función cogemos la búsqueda y damos un número de post para pintar por pantalla
        $search = $request->input('search');
        $perPage = $request->input('perPage', 10);
        if ($search) {
            $posts = $this->postService->searchBarPosts($search, $perPage);
            if ($posts->isEmpty()) {
                return response()->json(["mensaje" => "No existen posts con '$search' como busqueda", 200]);
            } else {
                return response()->json($posts);
            }
        }
    }
    public function getUserPostsOverview($userId): JsonResponse // Obtenemos los post ordenados por visitas y su porcentaje, también los posts agrupados por mes y por último obtenemos posts agrupados por mes y sus visitas
    {
        $postsOrderedByViews = $this->postService->getPostsByUserOrderedByViews($userId);
        $postsGroupedByMonth = $this->postService->getPostsByUserGroupedByMonth($userId);
        $postsGroupedByMonthWithViews = $this->postService->getPostsByUserGroupedByMonthByViews($userId);

        return response()->json([         // Devolvemos todos los resultados en una estructura organizada
            'postsOrderedByViews' => $postsOrderedByViews,
            'postsGroupedByMonth' => $postsGroupedByMonth,
            'postsGroupedByMonthWithViews' => $postsGroupedByMonthWithViews
        ]);
    }
}
