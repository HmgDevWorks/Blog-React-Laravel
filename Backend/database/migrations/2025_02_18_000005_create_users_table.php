<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name_user')->nullable(false);
            $table->string('email_user')->unique()->nullable(false);
            $table->string('password_user')->nullable(false);
            $table->dateTime('register_date')->nullable(false);
            $table->string('name_lastName')->nullable(false);
            $table->string('img_user')->nullable(false)->default('default.jpg');
            $table->text('bio')->nullable();
            $table->rememberToken(); //Campo para el "Recuerdame" de la sesión del usuario.
            $table->timestamps(); // Crea dos campos de cuando se crea y cuando se actualiza.
            $table->softDeletes(); //Crea la columna delete_at
        });
        
        Schema::create('password_reset_tokens', function (Blueprint $table) {  // Se utiliza para guardar el token para restablecer la contraseña. 
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();          // Linea pordefecto de FK tabla sesiones de laravel
            $table->longText('payload');
            $table->dateTime('session_start')->nullable(false);
            $table->integer('last_activity')->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
