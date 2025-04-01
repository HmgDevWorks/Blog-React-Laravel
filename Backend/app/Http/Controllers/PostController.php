<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Categories;
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

        if (!$search || strlen($search) < 2) {
            return response()->json(["message" => "errorMsg.errorSearchCharacters"], 400);
        }

        $posts = Post::where('status', 'published') //funcion waparda para una barra de busqueda que filtra con el request que pasamos "search" y devuelve todos los post
            ->where(function ($query) use ($search) {
                $query->where('title', 'like', "%$search%")
                    ->orWhere('content', 'like', "%$search%");
            })
            ->get();

        if ($posts->isEmpty()) {
            //return response()->json(["message" => "No existen posts con '$search' como búsqueda"], 200);
            return response()->json(["message" => "errorMsg.errorFindSearch"], 200);

        }

        return response()->json(['posts' => $posts]);
    } 

    public function searchAuthors(Request $request)
    {
        $search = $request->input('search');

        $authors = User::whereHas('posts', function ($query) { // Utilizamos la función para buscar autores que hayan publicado algún post
                $query->where('status', 'published');})
            ->when($search, function ($query) use ($search) {
                $query->where('name_user', 'LIKE', "%$search%");})
            ->select('id', 'name_user') 
            ->get();
    
            foreach ($authors as $author) {  // Utilizamos la función para calcular las visitas totales de cada autor y la categoria mas usada 
                $posts = Post::where('user_id', $author->id)
                    ->where('status', 'published')
                    ->get();
        
                $author->total_visits = $posts->sum('views');  // visitas totales
    
                $mostUsedCategoryId = $posts->groupBy('id_categories')
                ->sortByDesc(fn ($posts) => count($posts))
                ->keys()
                ->first();
            
                $mostUsedCategoryName = $mostUsedCategoryId  
                    ? Categories::where('id', $mostUsedCategoryId)->value('name')  
                    : null;
                
                $author->most_used_category = $mostUsedCategoryName;
            }
    
        return response()->json($authors);
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
            'posts' => $postscounts,
            'views' => $postsviewss,
            'users' => $usercounts
        ]);
    }

    public function getPostsByStatus(Request $request):JsonResponse
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(["message" => "errorMsg.errorUserNotAuth"], 401);
        }
    
        $status = trim(strtolower($request->input('status')));
        
        $posts = Post::where('user_id', $user->id)
            ->where('status', $status)
            ->get();
    
        if ($posts->isEmpty()) {
            return response()->json(["message" => "errorMsg.errorFindPostStatus"], 404);
        }
    
        return response()->json(['posts' => $posts], 200);
    }

    public function getPublishedPostById($id)
    {
        $posts = Post::where('user_id', $id)
            ->where('status', 'published')
            ->get();

        if ($posts->isEmpty()) {
            return response()->json(["message" => "errorMsg.errorCeroPostPublish"], 200);
        }

        return response()->json(['posts' => $posts]);
    }

    public function getPostsForAdminbyId($id)
    {
        $user = User::findOrFail($id);
        $posts = Post::where('user_id', $user->id)->get();

        return response()->json(['posts' => $posts]);
    }
}
