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
            ->limit(3) // obtener los 3 más vistos
            ->get();

        $oldPopuPost = Post::where('status', 'published') // posts antiguos con visitas
            ->where('created_at', '<', Carbon::now()->subMonth())
            ->orderByDesc('views')
            ->limit(3) // obtener los 3 más vistos
            ->get();

        $recomPosts = Post::where('status', 'published') //posts randoms para recomendar
            ->inRandomOrder()
            ->limit(3)
            ->get();
        
        $newestPosts = Post::where('status', 'published') //ultimos 3 posts publisss
            ->orderByDesc('created_at')
            ->limit(3)
            ->get();

        return [
            'most_read' => $mostPopuPost,
            'old_popular' => $oldPopuPost,
            'recommended_posts' => $recomPosts,
            'newest_posts' => $newestPosts
        ];
    }
}
