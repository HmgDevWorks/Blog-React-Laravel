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

    public function createPost($data){ // Devuelve el post recién creado, la función create recibe un array y va rellenando la BBDD. 
        return Post::create($data);
    }

    public function getPostByCategory($cat){    // 
        $post = Categories::findOrFail($cat);  
        return Post::findOrFail($post->id); 
    }

    public function updatePost($data, $post){    // Esta función recibe los datos del post actualizado, con los cambios indicados por el usuario, 
        if ($post) {
            $post->update([
                'id_categories' => $data->id_categories,
                'user_id' => $data->user_id,
                'title' => $data->title,
                'content' => $data->content,
                'status' => $data->status,
            ]);
            return response()->json(["mensaje"=>"Post actualizado correctamente", 200]);
        }else {
            return response()->json(["Error al actualizar el post", 400]);
        }
    }

    public function destroyPost($post){ // Devuelve V o F, si se le pasa un id de un post que no existe F y si el id existe, el post pasa a estar en estado 'delete'
        if ($post) {
            $post->status = "deleted";
            return response()->json(["mensaje"=>"Categoria actualizada correctamente", 200]);
        }else {
            return response()->json(["Error al actualizar la categoria", 400]);
        }
    }
}

?>