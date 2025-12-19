<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request)
    {
        // Chuẩn bị dữ liệu
        $userData = $request->only([
            'first_name',
            'last_name',
            'email',
            'birth',
            'gender'
        ]);

        // Thêm password đã mã hóa vào mảng
        $userData['password'] = Hash::make($request->password);

        // Tạo User
        $user = User::create($userData);

        // Đăng nhập và tạo token
        Auth::login($user);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng ký thành công',
            'user' => new UserResource($user),
            'token' => $token,
        ], 200);
    }

}

