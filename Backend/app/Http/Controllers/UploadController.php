<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Cloudinary\Cloudinary as CloudinaryCore; 



class UploadController extends Controller
{
    /**
     * Upload an image to Cloudinary.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'file' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png,gif',
                'max:5120',
                function ($attribute, $value, $fail) {
                    try {
                        list($width, $height) = getimagesize($value);
                        if ($width < 300 || $height < 300) {
                            $fail("La imagen debe ser de al menos 300x300 píxeles.");
                        }
                    } catch (\Exception $e) {
                        $fail("El archivo proporcionado no es una imagen válida.");
                    }
                },
            ],
        ]);

        try {
            $cloudinaryUrl = env('CLOUDINARY_URL');
            $cloudinary = new CloudinaryCore($cloudinaryUrl);

            $uploadResult = $cloudinary->uploadApi()->upload(
                $request->file('file')->getRealPath(),
                [
                    'folder' => 'Posts_Img',
                    'transformation' => [
                        ['width' => 1080, 'height' => 1080, 'crop' => 'limit'],
                    ],
                ]
            );

            return response()->json([
                'src' => $uploadResult['secure_url'], // Accede como array
                'alt' => $uploadResult['public_id'] ?? 'cloudinary_image', // Accede como array
                'sizes' => [
                    'width' => $uploadResult['width'], // Accede como array
                    'height' => $uploadResult['height'], // Accede como array
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al subir la imagen a Cloudinary: ' . $e->getMessage()], 500);
        }
    }

   // public function uploadAvatar(Request $request)
    // {
    //     dd(class_exists('\CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary'));

    //     $request->validate([
    //         'img_user' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Valida la imagen
    //     ]);

    //     try {
    //         $uploadedFile = $request->file('img_user');
    //         $uploadResult = Cloudinary::upload($uploadedFile->getRealPath(), [
    //             'folder' => 'Avatars_Img', // Carpeta en Cloudinary para avatares
    //             'transformation' => [
    //                 'width' => 200,
    //                 'height' => 200,
    //                 'crop' => 'fill', // Ajusta la imagen al tamaño manteniendo la proporción y recortando si es necesario
    //             ],
    //         ]);

    //         $user = Auth::user(); // Obtiene el usuario autenticado
    //         $user->img_user = $uploadResult->getSecurePath();
    //         $user->save();

    //         return response()->json(['img_user' => $user->img_user], 200);

    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'Error al subir el avatar: ' . $e->getMessage()], 500);
    //     }
    // }
    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'img_user' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $cloudinaryUrl = env('CLOUDINARY_URL');
            $cloudinary = new CloudinaryCore($cloudinaryUrl);

            $uploadResult = $cloudinary->uploadApi()->upload(
                $request->file('img_user')->getRealPath(),
                [
                    'folder' => 'Avatars_Img',
                    'transformation' => [
                        'width' => 200,
                        'height' => 200,
                        'crop' => 'fill',
                    ],
                ]
            );

            $user = Auth::user();
            $user->img_user = $uploadResult['secure_url']; // Accede como array

            $user->save();

            return response()->json(['img_user' => $user->img_user], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al subir el avatar: ' . $e->getMessage()], 500);
        }
    }
}