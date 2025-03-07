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

    public function update(Request $request, User $user):JsonResponse // Actualiza un usuario
    {
        return response()->json($this->userService->updateUser($request, $user));
    }



    public function changeRole(Request $request, User $user):JsonResponse
    {
        return $this->userService->assignRoleUser($request, $user);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }



}
