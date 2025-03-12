<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Post;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;

class ProfileController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function store(Request $request)
    {
        return $this->userService->createUser($request);
    }
    
    public function index():JsonResponse // Muestra todos los usuarios
    {
        return response()->json($this->userService->getAllUser());
    }

    public function show($id):JsonResponse // Solo muestra un usuario
    {
        return response()->json($this->userService->getUserById($id));
    }

    public function number():JsonResponse // Cantidad de usuarios
    {
        return response()->json($this->userService->numberUsers());
    }
    public function numberAuth():JsonResponse // Terminar mañana -- solo coger lectores
    {
        return response()->json($this->userService->numberUsers());
    }


    public function update(Request $request, User $user):JsonResponse // Actualiza un usuario 
    {
        return response()->json($this->userService->updateUser($request, $user));
    }

    public function changeRole(Request $request, User $user):JsonResponse // Falta prueba
    {
        return $this->userService->assignRoleUser($request, $user);
    }

    /**
     * Delete the user's account.
     */
    //      POR DEFECTO, CREAMOS UNA NUEVA PARA HACER DESTROY
    // public function destroy(Request $request): RedirectResponse
    // {
    //     $request->validateWithBag('userDeletion', [
    //         'password' => ['required', 'current_password'],
    //     ]);

    //     $user = $request->user();

    //     Auth::logout();

    //     $user->delete();

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return Redirect::to('/');
    // }

    public function getUser(Request $request)
    {
        // Retorna la información del usuario autenticado
        return response()->json($request->user());
    }

    public function destroy(User $user):JsonResponse
    {
        return response()->json($this->userService->deleteUser($user));
    }



}
