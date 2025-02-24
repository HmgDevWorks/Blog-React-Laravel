<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

use App\Models\Categories;
use App\Models\Post;
use GuzzleHttp\Promise\Create;
use Illuminate\Support\Facades\Auth;

class CategoriesService
{

    public function getAllCategories()
    { // Esta función recoge todas las categorias
        return Categories::all();
    }

    public function createCategories($data)
    { // Esta función recoge la categoria nueva creada

        $category = Categories::create(
            [
                'name' => $data->name,
                'description' => $data->description,
                'img_url' => '../../../../assets/carouselVertical/' . $data->file . '.webp'
            ]
        );
        if ($category)
            return response()->json(["mensaje" => "Categoria creada", 201]);

        return response()->json(["mensaje" => "Error al crear la categoria", 400]);
    }

    public function updateCategories($data, $categories)
    { // Esta función recibe los datos del post actualizado, con los cambios indicados por el usuario, 
        if ($categories) {
            $categories->update([
                'name' => $data->name ?? $categories->name,
                'description' => $data->description ?? $categories->description,
                'img_url' => '../../../../assets/carouselVertical/' . $data->file . '.webp;' ?? $categories->file
            ]);
            return response()->json(["mensaje" => "Categoria actualizada correctamente", 200]);
        } else {
            return response()->json(["Error al actualizar la categoria", 400]);
        }
    }

    public function destroyCategories($category)
    { // Esta función recoge la categoria nueva creada
        if (Categories::destroy($category->id))
            return response()->json(["mensaje" => "Categoria eliminada correctamente", 204]);
        return response()->json(["mensaje" => "Error al eliminar la categoria", 400]);
    }
    // /* Por ahora sin uso
    public function getCategoriestById($id)
    {    // Devuelve el post con el ID especificado, o lanza un error 404 si no existe
        return Categories::findOrFail($id);
    }

    //  Por ahoira sin uso
    // public function getIdCategoriesByName($data){    // Devuelve el id especificado con el nombre de la categoria, o lanza un error 404 si no existe
    //     return Categories::findOrFail($data); 
    // }
    // */
}

?>