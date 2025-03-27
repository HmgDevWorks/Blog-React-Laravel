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
    //     $this->user = $user;
    //     $hash = sha1($this->user->getEmailForVerification()); // Generamos el hash para el enlace de verificación
    //     // $this->verificationUrl = URL::temporarySignedRoute( // Generamos el enlace de verificación firmado
    //     //     'verification.verify', Carbon::now()->addMinutes(60), [
    //     //         'id' => $this->user->id,
    //     //         'hash' => $hash,//sha1($this->user->getEmailForVerification()), 
    //     //     ]
    //     // );
    //         $this->verificationUrl = config('app.frontend_url') . "/verify-email/{$this->user->id}/{$hash}";
    //    // $this->verificationUrl = str_replace('http://127.0.0.1:8000/', url('api/') . '/', $this->verificationUrl);
    //     // Log::debug('Generated Verification URL: ' . $this->verificationUrl);
        $this->user = $user;

        // Generamos el hash para el enlace de verificación
        $hash = sha1($this->user->getEmailForVerification());

        // Generamos el enlace de verificación firmado
        $this->verificationUrl = URL::temporarySignedRoute(
            'verification.email_verify',  // Ruta nombrada
            Carbon::now()->addMinutes(60),  // Tiempo de expiración (60 minutos)
            [
                'id' => $this->user->id,  // Pasamos el id del usuario
                'hash' => $hash,  // Hash generado para el email
            ]
        );

        // Usamos `url()` para asegurarnos de que la URL use APP_URL desde el archivo `.env`
         $this->verificationUrl = env('APP_URL') . parse_url($this->verificationUrl, PHP_URL_PATH);
    }

    /**
     * Get the message content definition.
     */
    public function build()
    {
        return $this->subject('Verificación de correo electrónico') // Asunto del correo
            ->view('emails.verify') // Aquí usamos la vista Blade que creamos
            ->with([
                'user' => $this->user, // Pasamos el usuario a la vista
                'verificationUrl' => $this->verificationUrl, // Pasamos el enlace de verificación
        ]);
    }

}
