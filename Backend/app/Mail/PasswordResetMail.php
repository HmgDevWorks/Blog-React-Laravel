<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use SerializesModels;

    public $url;

    public function __construct($url,$user)
    {
        $this->url = $url;
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject('Restablecimiento de contraseña')
                    ->view('emails.password_reset')  // Aquí estamos especificando la vista 'password_reset'
                    ->with([
                        'url' => $this->url,  // Pasamos la URL al correo
                        'user' => $this->user,
                    ]);
    }
}