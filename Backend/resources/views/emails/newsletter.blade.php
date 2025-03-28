<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boletín Semanal</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5efe0;">
    <table role="presentation" width="100%" bgcolor="#f5efe0" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center">
                <!-- Encabezado -->
                <table role="presentation" width="600" bgcolor="#7d1b1b" cellpadding="15" cellspacing="0" border="0" style="border-radius: 8px; color: #fff;">
                    <tr>
                        <td align="center">
                            <h1 style="margin: 0; font-size: 24px;">📢 Boletín Semanal</h1>
                            <p style="margin: 5px 0 0; font-size: 14px;">Mantente al día con las novedades más importantes</p>
                        </td>
                    </tr>
                </table>

                <!-- Contenido principal -->
                <table role="presentation" width="600" bgcolor="#ffffff" cellpadding="15" cellspacing="0" border="0" style="border-radius: 8px; margin-top: 10px; color: #333;">
                    <tr>
                        <td style="padding-bottom: 5px;">
                            <h2 style="color: #7d1b1b; margin-bottom: 5px;">📌 Resumen de la Semana</h2>
                            <p style="margin-top: 5px;">¡Hola equipo! Esta semana ha sido intensa, llena de ideas y creatividad. Te traemos lo más destacado:</p>
                        </td>
                    </tr>

                    @if($data['most_read'])
                        <tr>
                            <td style="padding-top: 5px; padding-bottom: 5px;">
                                <h3 style="color: #7d1b1b; margin-bottom: 5px;">🔥 Blog más leído de la semana</h3>
                                <p><strong>{{ $data['most_read']->title }}</strong></p>
                                <p>{{ Str::limit($data['most_read']->excerpt, 100) }}</p>
                                <p><a href="{{ env('FRONTEND_URL') . '/posts/show/' . $data['most_read']->id }}" style="color: #7d1b1b; font-weight: bold;">📖 Leer más</a></p>
                            </td>
                        </tr>
                    @endif

                    @if($data['old_popular'])
                        <tr>
                            <td style="padding-top: 5px; padding-bottom: 5px;">
                                <h3 style="color: #7d1b1b; margin-bottom: 5px;">📜 Recomendación de un clásico</h3>
                                <p><strong>{{ $data['old_popular']->title }}</strong></p>
                                <p>{{ Str::limit($data['old_popular']->excerpt, 100) }}</p>
                                <p><a href="{{ env('FRONTEND_URL') . '/posts/show/' . $data['old_popular']->id }}" style="color: #7d1b1b; font-weight: bold;">📖 Leer más</a></p>
                            </td>
                        </tr>
                    @endif

                    @if($data['recommended_posts']->count())
                        <tr>
                            <td style="padding-top: 5px; padding-bottom: 5px;">
                                <h3 style="color: #7d1b1b; margin-bottom: 5px;">⭐ Posts recomendados</h3>
                                <p style="margin-top: 5px;">Estos artículos están dando mucho de qué hablar. ¡No te los pierdas!</p>
                                <ul>
                                    @foreach($data['recommended_posts'] as $post)
                                        <li>
                                            <strong>{{ $post->title }}</strong> - 
                                            <a href="{{ env('FRONTEND_URL') . '/posts/show/' . $post->id }}" style="color: #7d1b1b; font-weight: bold;">Leer más</a>
                                        </li>
                                    @endforeach
                                </ul>
                            </td>
                        </tr>
                    @endif

                    <!-- Sección motivacional -->
                    <tr>
                        <td style="padding-top: 5px; padding-bottom: 5px;">
                            <h3 style="color: #7d1b1b; margin-bottom: 5px;">💡 Reflexión de la Semana</h3>
                            <p style="font-style: italic; margin-top: 5px;">"El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito." – Albert Schweitzer</p>
                        </td>
                    </tr>

                    <!-- Llamado a la acción -->
                    <tr>
                        <td align="center" style="padding-top: 5px; padding-bottom: 5px;">
                            <h3 style="color: #7d1b1b; margin-bottom: 5px;">📣 ¿Tienes algo que contar?</h3>
                            <p>Comparte tus ideas con el equipo. ¡Tu próximo post podría ser el más leído de la semana!</p>
                            <p><a href="{{ env('FRONTEND_URL') . '/posts/store' }}" style="background-color: #7d1b1b; color: #ffffff; padding: 10px 15px; border-radius: 5px; text-decoration: none; font-weight: bold;">✍️ Escribir un post</a></p>
                        </td>
                    </tr>
                </table>

                <!-- Pie de página -->
                <table role="presentation" width="600" bgcolor="#7d1b1b" cellpadding="10" cellspacing="0" border="0" style="border-radius: 8px; margin-top: 10px; color: #fff; text-align: center;">
                    <tr>
                        <td>
                            <p style="margin: 0; font-size: 12px;">Recibes este boletín porque eres parte de la empresa.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

