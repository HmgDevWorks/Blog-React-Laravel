<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Services\RoleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Models\User;


class RoleController extends Controller
{

    protected $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index():JsonResponse
    {
        return response()->json($this->roleService->getAllRole());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request):JsonResponse // Crea un nuevo rol
    {
        return $this->roleService->createRole($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role):JsonResponse
    {
        return response()->json($role);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user):JsonResponse
    {
        return $this->roleService->updateRole($request,$user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role):JsonResponse
    {
        return $this->roleService->destroyRole($role);
    }
}
