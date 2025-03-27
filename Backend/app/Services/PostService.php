<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

use App\Models\Categories;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
            return response()->json([
                'error' => 'Post no exixte o no está publicado.'
            ], 404);
        }
        $post->increment('views'); // contador para que cuando alguien entre en el post especificado aumenten las visitas en la tabla de post
        $post->refresh();           //actualiza el campo para mostrarlo correctamente
        return response()->json([
            "post" => $post,
            "message" => "Visita incrementada en 1"
        ]);
    }

    public function createPost($data)
    { // Esta función recoge el post y lo crea
        if (!$data) {
            return response()->json(["mensaje" => "Error al crear el post"], 400);
        }
        if (empty($data->id_categories)) {
            return response()->json(["Error" => "La categoría es obligatoria"], 400);
        }
        if (empty($data->title)) {
            return response()->json(["Error" => "El título es necesario"], 400);
        }
        if (empty($data->content)) {
            return response()->json(["Error" => "El contenido del post es obligatorio"], 400);
        }
            $post = Post::create([
                    'id_categories' => $data->id_categories,
                    'user_id' => $data->user_id,
                    'title' => $data->title,
                    'content' => $data->content,
                    'status' => $data->status ? $data->status : "draft"
                ]
            );
            return response()->json(["mensaje" => "Post creado con exito", 201]);
        } 

    public function getPostByCategory($cat)
    {    // 
        $post = Categories::findOrFail($cat);
        return Post::findOrFail($post->id);
    }

    public function getPostsByUser($userId)
    { //function para enseñar los post de cada usuario a traves de su ID
        return Post::where('user_id', $userId)->latest()->get();
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
        return response()->json(["mensaje" => "Post actualizado correctamente"], 200);
    } else {
        return response()->json(["mensaje" => "Error al actualizar el post"], 400);
        }
    }

    public function destroyPost($post) // cambia el post a estado delete
    {
        if (!auth()->user()->hasRole(['admin', 'editor'])) {
            return response()->json(['message' => 'No tienes el rol adecuado.'], 403);
        }elseif ($post) {
            $post->update(['status' => 'deleted']);
            return response()->json(["mensaje" => "Post Cambiado a estado borrado", 200]);
        } else{
            return response()->json(["mensaje" => "Error al cambiar el estado borrado", 400]);
        }
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
