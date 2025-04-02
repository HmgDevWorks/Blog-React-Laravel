<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
 //creado con todo el amor del mundo pero para JWT no se utiliza ya que los tokens no se guardan en una bbdd se queda almacenado en el cliente
class Session extends Model
{
    protected $table = 'sessions';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'id', 'user_id', 'payload', 'session_start', 'last_activity', 'ip_address', 'user_agent'
    ];
}
