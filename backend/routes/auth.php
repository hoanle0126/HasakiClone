<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;



Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum')
    ->name('logout');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/verify-email', [RegisteredUserController::class, 'sendVerificationCode'])
    ->middleware('guest')
    ->name('verify-email');

Route::get('/user', function () {

    return new UserResource(request()->user());
})
    ->middleware('auth:sanctum')
    ->name('user');