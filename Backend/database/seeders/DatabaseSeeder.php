<?php

namespace Database\Seeders;

use App\Models\Categories;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Favorites;
use App\Models\ModelHasRoles;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            rolesSeeder::class, // Crea roles y permisos
            userSeeder::class, // Crea usuarios admin
            categoriesSeeder::class, // Crea las categorías
        ]);

        $users = User::factory(100)->create();

        $users->each(function ($user) {
            $role = fake()->randomFloat(2, 0, 1) < 0.6 ? 'editor' : 'reader'; //El 2 del random es para que genere 2 decimales ,genera un numero decilmal entre 0 y 1 , si el num es menor de 0.6 asigna editor y si es mayor asigna reader
            $user->assignRole($role);
        });

        $editors = User::role('editor')->get();
        $posts = Post::factory(1000)->make()->each(function ($post) use ($editors) {
            $editor = $editors->random();
            $postDate = fake()->dateTimeBetween($editor->created_at, 'now'); //genera fecha random despues de la fecha de creacion del user
            
            if ($postDate < $editor->created_at) { //condicion para asegurar que la fecha siempre es posterior
                $postDate = $editor->created_at->addDay(); //si no le añade un dia a su fecha de creacion y la mete en created at posts
            }
            
            $post->user_id = $editor->id;
            $post->created_at = $postDate;
            $post->updated_at = $postDate;
        
            $post->save();
        });

        $publishedPosts = $posts->where('status', 'published'); // Filtra solo publicados

        $users->each(function ($user) use ($publishedPosts) {
            $postsRandom = $publishedPosts->random(min(rand(5, 20), $publishedPosts->count())); //para definir cuantos favoritos tenga cada user en este caso de 5 a 20
            foreach ($postsRandom as $post) {
                Favorites::factory()->create([
                    'user_id' => $user->id,
                    'post_id' => $post->id,
                ]);
            }
        });
        //$this->call(AssignProfilePhotosSeeder::class); // Asigna fotos de perfil a los usuarios con mas views
    }
}
