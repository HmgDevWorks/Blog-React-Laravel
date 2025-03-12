<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;  // Importar la interfaz JWTSubject

class User extends Authenticatable implements JWTSubject  // Implementamos la interfaz JWTSubject
{
    use HasFactory, Notifiable, HasRoles, HasPermissions, SoftDeletes;

    // Definimos el nombre de la columna personalizada para la contraseña
    protected $passwordColumn = 'password_user';

    /**
     * Los atributos que se pueden asignar de manera masiva.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name_user',
        'email_user',
        'password_user',
        // 'name_lastName',
        'img_user',
        'bio',
    ];

    /**
     * Los atributos que deben ser ocultados para la serialización.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password_user',
        'remember_token',
    ];

    /**
     * Los atributos que deben ser casteados.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password_user' => 'hashed',  // Aseguramos que la contraseña se hashee
        ];
    }

    /**
     * Obtener el identificador que se almacenará en el token JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();  // Usamos el ID del usuario como identificador único
    }
    public function getAuthPassword()
    {
        return $this->password_user;
    }

    /**
     * Obtener las claims personalizadas para el token JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];  // Puedes agregar claims personalizados si lo necesitas
    }
    public function getImgUserAttribute($value)
{
    return $value ? asset('avatars/' . $value) : asset('avatars/default.png');
}
}

