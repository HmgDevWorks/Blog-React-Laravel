<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Models\User;
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

    public function getTenNewsPost(): JsonResponse
    {
        return response()->json($this->postService->getLastTenPopularPosts());
    }

    public function getPostById($id)
    {
        return $this->postService->getPostById($id);
    }

    public function show(): JsonResponse
    {
        return response()->json($this->postService->getAllPost());
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


    // public function searchPosts(Request $request, $page = 1)
    // { // En esta función cogemos la búsqueda y damos un número de post para pintar por pantalla
    //     $search = $request->input('search');
    //     $perPage = $request->input('perPage', 10);
    //     if ($search) {
    //         $posts = $this->postService->searchBarPosts($search, $perPage,$page);
    //         if ($posts->isEmpty()) {
    //             return response()->json(["mensaje" => "No existen posts con '$search' como busqueda", 200]);
    //         } else {
    //             return response()->json([
    //                 'current_page' => $page,
    //                 'posts' =>$posts
    //         ]);
    //         }
    //     }
    // }

    public function searchPosts(Request $request) //controlador para la barra de busqueda
    { 
        $search = $request->input('search');

        if (!$search || strlen($search) < 4) {
            return response()->json(["error" => "La búsqueda debe tener al menos 4 caracteres"], 400);
        }

        $posts = Post::where('status', 'published') //funcion waparda para una barra de busqueda que filtra con el request que pasamos "search" y devuelve todos los post
                        ->where(function ($query) use ($search) {
                            $query->where('title', 'like', "%$search%")
                                ->orWhere('content', 'like', "%$search%");
                        })
                        ->get();

        if ($posts->isEmpty()) {
            return response()->json(["mensaje" => "No existen posts con '$search' como búsqueda"], 200);
        }

        return response()->json(['posts' => $posts]);
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

    public function getStatsForCounter(): JsonResponse
    {
        $postscounts = $this->postService->getCountPost();
        $postsviewss = $this->postService->getViewsPost();
        $usercounts = $this->postService->getCountUsers();
        return response()->json([
            'Articulos' => $postscounts,
            'Vistas' => $postsviewss,
            'Usuarios' => $usercounts
        ]);
    }

    public function getPublishedPostById($id)
    {
        $posts = Post::where('user_id', $id) 
                    ->where('status', 'published')
                    ->get();

        if ($posts->isEmpty()) {
            return response()->json(["error" => "No existen posts publicados para este usuario"], 200);
        }

        return response()->json(['posts' => $posts]);
    }

    public function getPublishedOrDraftOrDeletedPosts(Request $request)
    {
        $user = auth()->user(); 
        $status = $request->input('status'); // Obtiene el estado desde el front, status en el json

        if (!in_array($status, ['published', 'draft', 'deleted'])) {
            return response()->json(["error" => "No existen post con ese status"], 400);
        }

        $posts = Post::where('user_id', $user->id)
                    ->where('status', $status)
                    ->get();

        if ($posts->isEmpty()) {
            return response()->json(["mensaje" => "No tienes posts en este estado"], 200);
        }

        return response()->json(['posts' => $posts]);
    }

    
}
