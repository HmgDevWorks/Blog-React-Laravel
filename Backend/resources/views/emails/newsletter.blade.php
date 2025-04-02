<!DOCTYPE html> 
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boletín Semanal</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }

        .container {
            width: 600px;
            margin: 0 auto;
            background-color: #f4f1e1;
            border-radius: 8px;
            padding: 20px;
            color: #4f4f4f;
        }

        .header {
            background-color: #800000;
            color: #f4f1e1;
            text-align: center;
            padding: 20px;
            border-radius: 8px;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .header p {
            margin: 5px 0 0;
            font-size: 14px;
        }

        .section-title {
            color: #800000;
            margin-bottom: 10px;
            font-size: 20px;
        }

        .post-list {
            list-style-type: none;
            padding-left: 0;
            margin-top: 10px;
        }

        .post-list li {
            margin-bottom: 10px;
        }

        .post-list a {
            color: #800000;
            font-weight: bold;
            text-decoration: none;
        }

        .call-to-action {
            background-color: #800000;
            color: #ffffff;
            padding: 10px 15px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            text-align: center;
            display: block;
            margin-top: 20px;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #fff;
            background-color: #800000;
            padding: 10px;
            border-radius: 8px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📢 Boletín Semanal</h1>
            <p>Mantente al día con las novedades más importantes</p>
        </div>

        <div>
            <h2 class="section-title">📌 Resumen de la Semana</h2>
            <p>¡Hola equipo! Esta semana ha sido intensa, llena de ideas y creatividad. Te traemos lo más destacado:</p>
            
            @foreach(['most_read' => '🔥 Posts más leídos', 'old_popular' => '📜 Posts antiguos más populares', 'recommended_posts' => '⭐ Posts recomendados', 'newest_posts' => '📅 Posts más recientes'] as $key => $title)
                @if($data[$key]->count())
                    <h3 class="section-title">{{ $title }}</h3>
                    <ul class="post-list">
                        @foreach($data[$key] as $post)
                            <li>
                                <strong>{{ $post->title }}</strong> - por <em>{{ $post->author->name_user }}</em><br>
                                <a href="{{ env('FRONTEND_URL') . '/posts/show/' . $post->id }}">Leer más</a>
                            </li>
                        @endforeach
                    </ul>
                @endif
            @endforeach

            <h3 class="section-title">💡 Reflexión de la Semana</h3>
            <p style="font-style: italic;">"El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito." – Albert Schweitzer</p>
            
            <p style="text-align: center;">
                <a href="{{ env('FRONTEND_URL') . '/posts/store' }}" class="call-to-action">✍️ Escribir un post</a>
            </p>
        </div>

        <div class="footer">
            <p>Recibes este boletín porque eres parte de la empresa.</p>
        </div>
    </div>
</body>
</html>
