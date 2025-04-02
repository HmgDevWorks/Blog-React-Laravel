<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Mail; 

class PasswordResetNotification extends Notification
{
    protected $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];  // Solo enviamos el correo
    }

    public function toMail($notifiable)
    {
       
        // Generamos la URL de la API de restablecimiento de contraseña
        $url = url(config('app.url') . '/api/password/reset/' . $this->token . '?email=' . $notifiable->email_user);

        return (new MailMessage)
                    ->subject('Restablecimiento de contraseña')
                    ->line('Recibiste este correo porque solicitaste restablecer tu contraseña.')
                    ->action('Restablecer contraseña', $url)  // Esta acción redirigirá al enlace de la API
                    ->line('Si no solicitaste este cambio, ignora este mensaje.');
    }
}