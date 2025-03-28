<?php
namespace App\Services;

use App\Models\Post;
use Carbon\Carbon;

class NewsletterService
{
    public function generateNewsletter()
    {
        
        $mostPopuPost = Post::where('status', 'published') //post con mas visitas de la semana
        ->orderByDesc('views')
        ->where('created_at', '>=', Carbon::now()->subWeek())
        ->first();

        $oldPopuPost = Post::where('status', 'published') // posts antiguos con visitas
            ->where('created_at', '<', Carbon::now()->subMonth())
            ->orderByDesc('views')
            ->first();

        $recomPosts = Post::where('status', 'published') //posts randoms para recomendar
            ->inRandomOrder()
            ->limit(3)
            ->get();

        return [
            'most_read' => $mostPopuPost,
            'old_popular' => $oldPopuPost,
            'recommended_posts' => $recomPosts
        ];
    }
}
