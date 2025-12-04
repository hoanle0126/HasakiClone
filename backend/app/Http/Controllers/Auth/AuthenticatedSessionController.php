<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        // 1. Lấy dữ liệu đã qua kiểm tra validate (email, password)
        $credentials = $request->validated();

        // 2. Kiểm tra đăng nhập
        // Auth::attempt sẽ tự động so sánh Email và Hash Password
        if (!Auth::guard('web')->attempt($credentials)) {
            // Nếu sai => Trả về lỗi 401 Unauthorized
            return response()->json([
                'message' => 'Email hoặc mật khẩu không chính xác',
            ], 401);
        }

        // 3. Nếu đúng => Lấy thông tin User hiện tại
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 4. Tạo Token (Xóa các token cũ nếu muốn đăng nhập 1 thiết bị, hoặc giữ nguyên)
        // $user->tokens()->delete(); // Bỏ comment dòng này nếu muốn đăng nhập mới đá đăng nhập cũ
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'token' => $token,
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        $request->user()->currentAccessToken()->delete();

        return response()->noContent();
    }
}
