<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordResetToken extends Model
{
    protected $table = 'password_reset_tokens';  // Asegúrate de que esté usando la tabla correcta
    protected $primaryKey = 'email_user';  // Si es necesario, asegúrate de usar el campo correcto como clave primaria si corresponde
    protected $fillable = ['email_user', 'token', 'created_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'email_user', 'email_user');  // Aquí debe coincidir 'email_user'
    }

    public function getEmailForVerification()
    {
        return $this->email_user;  // Debes retornar el campo 'email_user'
    }
}
