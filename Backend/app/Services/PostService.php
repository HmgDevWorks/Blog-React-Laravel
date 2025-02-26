<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

use App\Models\Categories;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostService {
    
    public function getAllPost(){ // Esta función recoge todos los datos de la tabla Post
        return Post::all();
    }

    public function getLastTenPosts() {
        // Ordena los posts por created_at en orden descendente y toma los 10 primeros
        return Post::orderBy('created_at', 'desc')->take(10)->get();
    }

    public function getPostById($id){    // Devuelve el post con el ID especificado, o lanza un error 404 si no existe
        return Post::findOrFail($id);
    }

    public function createPost($data){ // Esta función recoge el post y lo crea
        if($data){
            $data = Post::create(
                [
                    'id_categories' => $data->id_categories,
                    'user_id' => $data->user_id,
                    'title' => $data->title,
                    'content' => $data->content,
                    'status' => $data->status? $data->status : "draft"
                ]
            );
            return response()->json(["mensaje"=>"Post creado con exito", 201]);

        }else{
            return response()->json(["mensaje"=>"Error al crear el post", 400]);
        }
    }

    public function getPostByCategory($cat){    // 
        $post = Categories::findOrFail($cat);  
        return Post::findOrFail($post->id); 
    }

    public function getPostsByUser($userId) { //function para enseñar los post de cada usuario a traves de su ID
        return Post::where('user_id', $userId)->latest()->get();
    }

    public function updatePost($data, $post) {    
        if ($post) {
            $post->update([
                'id_categories' => $data['id_categories'] ?? $post->id_categories,
                'user_id' => $data['user_id'] ?? $post->user_id,
                'title' => $data['title'] ?? $post->title,
                'content' => $data['content'] ?? $post->content,
                'status' => $data['status'] ?? $post->status
            ]);
            return response()->json(["mensaje" => "Post actualizado correctamente"], 200);
        } else {
            return response()->json(["mensaje" => "Error al actualizar el post"], 400);
        }
    }

    public function destroyPost($post){ // cambia el post a estado delete
        if ($post) {
            $post->update(['status' => 'deleted']);
            return response()->json(["mensaje"=>"Post Cambiado a estado borrado", 200]);
        }else {
            return response()->json(["mensaje"=>"Error al cambiar el estado borrado", 400]);
        }
    }
}

?>