<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoriesRequest;
use App\Models\Categories;
use Illuminate\Http\Request;
use App\Models\User;
use Symfony\Component\HttpFoundation\StreamedResponse;


class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Categories::all());
    }

    /**
     * Show the form for creating a new resource.
     */
<<<<<<< HEAD
    public function create()
=======
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
>>>>>>> aaf2f7c (Categoria finalizada sin middleware)
    {
        return $this->categoriesService->destroyCategories($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Categories::create([
            'name'=>$request->username,
            'description'=>$request->password,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categories $categories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categories $categories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoriesRequest $request, Categories $categories)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categories $categories)
    {
        //
    }
}
