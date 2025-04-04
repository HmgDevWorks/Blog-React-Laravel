<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use Cloudinary\Cloudinary as CloudinaryCore;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Log; 

class AssignProfilePhotosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $topUsers = User::select('users.id', 'users.name_user', 'users.email_user', 'users.img_user') //funcion para obtener los 10 users mas leidos
                ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
                ->where('posts.status', 'published') 
                ->groupBy('users.id', 'users.name_user', 'users.email_user', 'users.img_user')
                ->orderByDesc(DB::raw('SUM(posts.views)'))
                ->limit(10)
                ->get();

        $avatarPath = public_path('images/avatars'); //ruta para obtener las imagenes de los avatares que tenemos en laravel subidas las fotos
        $avatarFiles = glob($avatarPath . '/*.{jpg,png}', GLOB_BRACE);
        
        if (empty($avatarFiles)) {
            $this->command->warn('No se encontraron imágenes de avatar en ' . $avatarPath . '. Asegúrate de tener imágenes allí.');
            return;
        }

        shuffle($avatarFiles); //mezcla las imagenes con los users para asignarles una aleatoriamente
        $userCount = count($topUsers);
        $avatarCount = count($avatarFiles);
        $loopCount = min($userCount, $avatarCount); // evitar errores si hay menos imágenes que usuarios

        for ($i = 0; $i < $loopCount; $i++) { //bucle para ir metiendo cada imagen a cada user
            $user = $topUsers[$i];
            $imagePath = $avatarFiles[$i];

            $cloudinaryUrl = env('CLOUDINARY_URL');
            if (!$cloudinaryUrl) {
                Log::error('La variable de entorno CLOUDINARY_URL no está configurada.');
                $this->command->error('Error: La variable de entorno CLOUDINARY_URL no está configurada.');
                return;
            }
            $cloudinary = new CloudinaryCore($cloudinaryUrl);

            try {
                $uploadResult = $cloudinary->uploadApi()->upload(
                    $imagePath,
                    [
                        'folder' => 'Avatars_Img',
                        'transformation' => [
                            'width' => 200,
                            'height' => 200,
                            'crop' => 'fill',
                        ],
                    ]
                );

                $user->update(['img_user' => $uploadResult['secure_url']]); //se ingresa en la bbdd
                $this->command->info("Imagen subida a Cloudinary (Core) y asignada al usuario: {$user->name_user} (ID: {$user->id})");
            } catch (\Exception $e) {
                Log::error('Error al subir avatar con CloudinaryCore en el seeder para el usuario ' . $user->id . ': ' . $e->getMessage());
                $this->command->error("Error al subir avatar con CloudinaryCore para el usuario {$user->name_user} (ID: {$user->id}): " . $e->getMessage());
            }
        }

        $this->command->info('Proceso de asignación de fotos de perfil (con CloudinaryCore) completado.');
    }
}
