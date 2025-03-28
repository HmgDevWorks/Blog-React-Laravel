<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;

class CustomEmailVerification extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $verificationUrl;

    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {

        $this->user = $user;
        $hash = sha1($this->user->getEmailForVerification()); // generamos el hash para el enlace de verificación

        $this->verificationUrl = URL::temporarySignedRoute(  // generamos el enlace de verificación firmado
            'verification.email_verify',  // ruta nombrada
            Carbon::now()->addMinutes(60),  // tiempo de expiración (60 minutos)
            [
                'id' => $this->user->id,  // Pasamos el id del usuario
                'hash' => $hash,  // Hash generado para el email
            ]
        );
         $this->verificationUrl = env('FRONTEND_URL') . parse_url($this->verificationUrl, PHP_URL_PATH); // usamos `url()` para asegurarnos de que la URL use APP_URL desde el archivo `.env`
    }

    /**
     * Get the message content definition.
     */
    public function build()
    {
        return $this->subject('Verificación de correo electrónico') // asunto del correo
            ->view('emails.verify') // aquí usamos la vista Blade que creamos
            ->with([
                'user' => $this->user, // pasamos el usuario a la vista
                'verificationUrl' => $this->verificationUrl, // pasamos el enlace de verificación
        ]);
    }

}
