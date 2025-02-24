<?php

test('new users can register', function () {
    $response = $this->post('/register', [
        'name_user' => 'Test User',
        'email_user' => 'test@example.com',
        'password_user' => 'password_user',
        'password_confirmation' => 'password_user',
    ]);

    $this->assertAuthenticated();
    $response->assertNoContent();
});
