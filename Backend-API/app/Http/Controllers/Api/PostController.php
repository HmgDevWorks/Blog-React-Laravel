<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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

    public function showAll():JsonResponse
    {
        return response()->json($this->postService->getAllPost());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request):JsonResponse
    {
        return $this->postService->createPost($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post):JsonResponse
    {
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, Post $post):JsonResponse
    {
        return $this->postService->updatePost($request,$post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post):JsonResponse
    {
        return $this->postService->destroyPost($post);
    }
}
