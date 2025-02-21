<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\RoleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

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
    public function store(Request $request):JsonResponse
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
    public function update(Request $request, Role $role):JsonResponse
    {
        return $this->roleService->updateRole($request,$role);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role):JsonResponse
    {
        return $this->roleService->destroyRole($role);
    }
}
