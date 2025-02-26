<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{

    protected $postService;

    public function __construct(PostService $postService) {
        $this->postService = $postService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index():JsonResponse
    {
        return response()->json($this->postService->getLastTenPosts());
    }

    public function show():JsonResponse
    {
        return response()->json($this->postService->getAllPost());
    }

    public function showOne(Post $post):JsonResponse
    {
        return response()->json($post);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request):JsonResponse
    {
        return $this->postService->createPost($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post):JsonResponse
    {
        return $this->postService->updatePost($request, $post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post):JsonResponse
    {
        return $this->postService->destroyPost($post);
    }

    public function postUser($userId): JsonResponse
    {
    return response()->json($this->postService->getPostsByUser($userId)); //Route::get('/posts/user/{id}', [PostController::class, 'getPostsByUser']);
    }


}
