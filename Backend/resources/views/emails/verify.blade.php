<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Correo</title>
</head>
<body style="background-color: #FAF3E0; margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #fff; border-radius: 5px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); padding: 20px;">
                    
                    <!-- Encabezado -->
                    <tr>
                        <td align="center" style="background-color: #800000; padding: 20px; border-radius: 5px 5px 0 0;">
                            <h1 style="color: #FAF3E0; margin: 0; font-size: 24px;">C-Blog | Verificación de Correo</h1>
                        </td>
                    </tr>

                    <!-- Contenido -->
                    <tr>
                        <td style="padding: 20px;">
                            <h2 style="color: #800000; text-align: center;">¡Hola, {{ $user->name_user }}!</h2>
                            <p style="font-size: 16px; text-align: center;">
                                Gracias por registrarte en <strong>C-Blog</strong>. Para completar tu registro, verifica tu correo electrónico haciendo clic en el botón a continuación.
                            </p>
                            <p style="text-align: center;">
                                <a href="{{ $verificationUrl }}" style="display: inline-block; background-color: #800000; color: #FAF3E0; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                                    Verificar mi correo
                                </a>
                            </p>

                            <p style="font-size: 14px; text-align: center; color: #666;">
                                Este enlace expirará en <strong>60 minutos</strong>. Si necesitas otro, <strong>pincha <a href="{{ url('/api/resend?email_user=' . urlencode($user->email_user)) }}" style="color: #800000; text-decoration: none;">aquí</a></strong>.
                            </p>

                            <p style="font-size: 14px; text-align: center; color: #666;">
                                Si no creaste una cuenta, puedes ignorar este correo de manera segura.
                            </p>
                        </td>
                    </tr>

                    <!-- Pie de página -->
                    <tr>
                        <td align="center" style="background-color: #800000; padding: 10px; border-radius: 0 0 5px 5px;">
                            <p style="color: #FAF3E0; font-size: 12px; margin: 0;">
                                © {{ date('Y') }} C-Blog. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>
</html>

