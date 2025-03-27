<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use SerializesModels;

    public $url;

    public function __construct($url)
    {
        $this->url = $url;
    }

    public function build()
    {
        return $this->subject('Restablecimiento de contraseña')
                    ->view('emails.password_reset')  // Aquí estamos especificando la vista 'password_reset'
                    ->with([
                        'url' => $this->url,  // Pasamos la URL al correo
                    ]);
    }
}