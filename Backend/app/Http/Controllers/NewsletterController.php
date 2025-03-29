<?php

namespace App\Http\Controllers;

use App\Services\NewsletterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\WeeklyNewsletter;

class NewsletterController extends Controller
{
    protected $newsletterService;

    public function __construct(NewsletterService $newsletterService)
    {
        $this->newsletterService = $newsletterService;
    }

    public function generate(): JsonResponse
    {
        $data = $this->newsletterService->generateNewsletter();

        $subscribers = ['raulbenedis@gmail.com']; 
        //$subscribers = User::pluck('email_user')->toArray(); //con esta linea enviaria correo a todos los users de la bbdd 

        foreach ($subscribers as $email) { //bucle para que pueda enviar todos los mails a todos los users de la BBDD
            Mail::to($email)->send(new WeeklyNewsletter($data));
        }

        return response()->json(['message' => 'Boletín generado y enviado correctamente']);
    }
}