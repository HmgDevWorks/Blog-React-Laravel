<?php
namespace App\Services;

use App\Models\Post;
use Carbon\Carbon;

class NewsletterService
{
    public function generateNewsletter()
    {
        
        $mostPopuPost = Post::where('status', 'published')
        ->where('created_at', '>=', Carbon::now()->subWeek())
        ->orderByDesc('views')
        ->limit(3)
        ->with(['author:id,name_user']) //como tenemos una una relacion creada en model llamada author permite traerte el name user
        ->get();

        $oldPopuPost = Post::where('status', 'published')
            ->where('created_at', '<', Carbon::now()->subMonth())
            ->orderByDesc('views')
            ->limit(3)
            ->with(['author:id,name_user']) 
            ->get();

        $recomPosts = Post::where('status', 'published')
            ->inRandomOrder()
            ->limit(3)
            ->with(['author:id,name_user']) 
            ->get();
        
        $newestPosts = Post::where('status', 'published')
            ->orderByDesc('created_at')
            ->limit(3)
            ->with(['author:id,name_user']) 
            ->get();

        return [
            'most_read' => $mostPopuPost,
            'old_popular' => $oldPopuPost,
            'recommended_posts' => $recomPosts,
            'newest_posts' => $newestPosts
        ];
    }
}
