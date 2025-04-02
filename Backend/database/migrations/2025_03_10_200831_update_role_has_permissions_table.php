<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration //migracion creada para poder cambiar assign date a nullable ya que si no da fallo al crear las tablas
{
    /**
     * Run the migrations.
     */
    public function up(): void 
    {
        Schema::table('role_has_permissions', function (Blueprint $table) {
            $table->timestamp('assing_date')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('role_has_permissions', function (Blueprint $table) {
            $table->timestamp('assing_date')->nullable(false)->change();
        });
    }
};
