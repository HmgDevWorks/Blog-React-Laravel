<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

use App\Models\Categories;
use App\Models\Post;
use GuzzleHttp\Promise\Create;
use Illuminate\Support\Facades\Auth;

class CategoriesService
{
    public function getAllCategories() // Esta función recoge todas las categorias
    { 
        return Categories::all();
    }

    public function createCategories($data) // Esta función recoge la categoria nueva creada
    { 
        $category = Categories::create(
            [
                'name' => $data->name,
                'description' => $data->description,
                'img_url' => '../../../../assets/carouselVertical/' . $data->file . '.webp'
            ]
        );
        if ($category)
            return response()->json(["message" => "successMsg.successCreateCategory", 201]);

        return response()->json(["message" => "errorMsg.errorCreateCategory", 400]);
    }

    public function updateCategories($data, $categories) // Esta función recibe los datos del post actualizado, con los cambios indicados por el usuario, 
    { 
        if ($categories) {
            $categories->update([
                'name' => $data->name ?? $categories->name,
                'description' => $data->description ?? $categories->description,
                'img_url' => '../../../../assets/carouselVertical/' . $data->file . '.webp;' ?? $categories->file
            ]);
            return response()->json(["message" => "successMsg.successUpdateCategory", 200]);
        } else {
            return response()->json(["message" => "errorMsg.errorUpdateCategory", 400]);
        }
    }

    public function showCategoriesByName($data)
    {
        $categories=Categories::where('name', 'like', '%'. $data. '%')->get();
        return response()->json(["Nombre" => $categories->pluck('name')]);
    }

    public function destroyCategories($category)
    { 
        if (Categories::destroy($category->id))
            return response()->json(["message" => "successMsg.successDeleteCategory", 204]);
        return response()->json(["message" => "errorMsg.errorDeleteCategory", 400]);
    }
    // /* Por ahora sin uso
    public function getCategoriestById($id)
    {    // Devuelve el post con el ID especificado, o lanza un error 404 si no existe
        return Categories::findOrFail($id);
    }
    public function getPostsForCategory($name) //devuelve todos los posts de una categoria a traves del nombre
    {
        $category = Categories::where('name', $name)->firstOrFail();
        return Post::where('id_categories', $category->id)
            ->where('status', 'published')
            ->get();
    }
}

?>