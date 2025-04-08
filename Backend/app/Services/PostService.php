<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

use App\Models\Categories;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class PostService
{
    public function getAllPost()// Esta función recoge todos los datos de la tabla Post
    { 
        return Post::where('status', 'published')->get();
    }

    public function getLastTenPosts()
    {
        return Post::where('status', 'published') // Filtra solo los posts con el status 'published'
            ->orderBy('created_at', 'desc') // Ordena los posts por 'created_at' en orden descendente
            ->take(10) // Toma solo los últimos 10
            ->get(); // Obtiene los posts
    }

    public function getLastTenPopularPosts()
    {
        return Post::where('status', 'published') // Solo los publicados
        ->orderBy('created_at', 'desc') // Ordena por fecha (últimos 50)
        ->take(50)
        ->orderBy('views', 'desc') // Luego, ordena por vistas
        ->take(10) // Se queda solo con los 10 más vistos
        ->get();
    }

    public function getPostById($id) // Devuelve el post con el ID especificado, o lanza un error 404 si no existe
    {    
        $post = Post::where('id', $id)
                ->where('status', 'published')  
                ->first();
         
        if (!$post) {
            return response()->json(['message' => 'errorMsg.errorPostNotFoundOrNotPublish'], 404);
        }
        $post->increment('views'); // contador para que cuando alguien entre en el post especificado aumenten las visitas en la tabla de post
        $post->refresh();           //actualiza el campo para mostrarlo correctamente
        return response()->json([
            "post" => $post,
            "message" => "errorMsg.errorPostVisited"
        ]);
    }

    public function createPost(Request $request)
    { 
        $validatedData = $request->validate([ //valida datos introducids
            'id_categories' => 'required|integer|exists:categories,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'nullable|in:published,draft,deleted'
        ]);
    
        $post = Post::create([
            'id_categories' => $validatedData['id_categories'],
            'user_id' => auth()->id(), // asigna el usuario autenticado
            'title' => $validatedData['title'],
            'content' => $validatedData['content'],
            'status' => $validatedData['status'] ?? "draft" // por defecto draft si no dice na
        ]);
    
        return response()->json(["message" => "successMsg.successCreatePost"], 201);
    } 

    public function getPostByCategory($cat)
    {    
        $post = Categories::findOrFail($cat);
        return Post::findOrFail($post->id);
    }

    public function getPostsByUser($userId)// Función para obtener los posts publicados de un usuario 
    { 
        return Post::where('user_id', $userId)
                   ->where('status', 'published') 
                   ->latest()
                   ->get();
    }
    
    public function updatePost($data, $post)
    {
    if ($post) { // Actualizar campos manualmente y guardar el modelo
        $post->id_categories = $data['id_categories'] ?? $post->id_categories;
        $post->user_id = $data['user_id'] ?? $post->user_id;
        $post->title = $data['title'] ?? $post->title;
        $post->content = $data['content'] ?? $post->content;
        $post->status = $data['status'] ?? $post->status;
        $post->save();
        return response()->json(["message" => "successMsg.successUpdatePost"], 200);
    } else {
        return response()->json(["message" => "errorMsg.errorUpdatePost"], 400);
        }
    }

    public function destroyPost($id) // cambia el post a estado delete
    {
        $post = Post::findOrFail($id);
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'errorMsg.unauthorized'], 403);
        }
    
        $post->update(['status' => 'deleted']);
    
        return response()->json(["message" => "successMsg.successDeleteOwnSoftPost"], 200);
    }

    public function destroyAnyPostByAdmin($id)
    {
        if (!auth()->user()->hasRole('admin')) { //para que solo lo pueda hacer el admin
            return response()->json(['message' => 'errorMsg.errorAdminRole'], 403);
        }

        $post = Post::findOrFail($id);
        $post->update(['status' => 'deleted']);

        return response()->json(["message" => "successMsg.successDeleteSoftPostByAdmin"], 200);
    }

    public function restorePost($id)
    {
        $user=Auth::user();
        $post=Post::findOrFail($id);
        if ($post->user_id !== $user->id) {
            return response()->json(["message" => "errorMsg.unauthorized"], 403);
        }
        
        $post->update(['status' => 'published']);
        return response()->json(["message" => "successMsg.successRestorePost"], 200);
    }

    public function searchBarPosts($search, $perPage)// Buscamos tanto por título como por contenido. esta NO es, la que funciona esta en el controlador directamente hecha, NO FUNSIONA
    { 
        return Post::where('title', 'like', '%' . $search . '%')
            ->orWhere('content', 'like', '%' . $search . '%')
            ->latest()->paginate($perPage);
    }

    public function getPostsByUserOrderedByViews($userId)  // Obtenemos el total de visitas de todos los posts del user y también obtenemos los posts del usuario ordenados por vistas de mayor a menor, si hay empate ordena por id ascendente
    {
        $totalViews = Post::where('user_id', $userId)->sum('views');
        $posts = Post::where('user_id', $userId)->orderBy('views', 'desc')->orderBy('id', 'asc')->get();

        $postsWithPercentage = $posts->map(function ($post) use ($totalViews) { // Función para sacar el porcentaje de visitas de cada post a través de una regla de 3
            $post->percentage = $totalViews > 0 ? ($post->views / $totalViews) * 100 : 0;
            return $post;
        });
        return $postsWithPercentage;
    }

    public function getPostsByUserGroupedByMonth($userId) // En esta función obtenemos la cantidad de post mensuales hechos por el user 
    {  
        return Post::where('user_id', $userId)
            ->selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total_posts, ? as user_id', [$userId]) // Selecciona año, mes, total_posts y agrega el user_id
            ->groupBy('year', 'month')
            ->orderByDesc('year')
            ->orderByDesc('month')
            ->get();
    }

    public function getPostsByUserGroupedByMonthByViews($userId) // En esta función obtenemos la cantidad de post mensuales y sus visitas totales no por cada post
    { 
        return Post::where('user_id', $userId)
            ->selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total_posts, SUM(views) as total_views, ? as user_id', [$userId]) // Selecciona año, mes, total_posts, total_views y agrega el user_id
            ->groupBy('year', 'month')
            ->orderByDesc('year')
            ->orderByDesc('month')
            ->get();
    }

    public function getCountPost()
    {
        return Post::where('status','published')->count();  
    }

    public function getViewsPost()
    {
        return Post::where('status','published')->sum('views');  
    }

    public function getCountUsers()
    {
        return User::count();
    }
}
