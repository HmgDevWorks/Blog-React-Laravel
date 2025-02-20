<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoriesRequest;
use App\Models\Categories;
use App\Services\CategoriesService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class CategoriesController extends Controller
{

    protected $categoriesService;

    public function __construct(CategoriesService $categoriesService)
    {
        $this->categoriesService = $categoriesService;
    }

    /**
     * Mandamos lo que queremos ver como vista principal, en este caso los datos de todas las categorias.
     */
    public function index():JsonResponse
    {
        return response()->json($this->categoriesService->getAllCategories());
    }

    /**
     * Guardamos una nueva categoría en la bbdd.
     */
    public function store(CategoriesRequest $request):JsonResponse
    {
        return $this->categoriesService->createCategories($request);
    }

    /**
     * Mostramos el dato de forma unitaria
     */
    public function show(Categories $categories):JsonResponse // Recibimos un request(en este caso el nombre de la categoria) y devolvemos el id especifico
    {
        return response()->json($categories);
    }

    /**
     * Actualizamos la categoría en la bbdd.
     */
    public function update(Request $request, Categories $categories):JsonResponse
    {
        return $this->categoriesService->updateCategories($request,$categories);
    }

    /**
     * Eliminar categoría de la bbdd.
     */
    public function destroy(Categories $categories)
    {
        return $this->categoriesService->destroyCategories($categories);
    }
}
