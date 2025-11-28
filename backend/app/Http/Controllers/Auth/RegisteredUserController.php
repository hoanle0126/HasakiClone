<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Mail\SendVerificationCode;
use App\Models\User;
use App\Models\VerifyCode;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Mail;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $user = User::create([
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'email' => $request->email,
            'gender' => $request->gender,
            'password' => Hash::make($request->string('password')),
            'birth' => $request->birth,
        ]);

        $verifyCode = VerifyCode::where('email', $request->email)->first()["verification_code"];

        // event(new Registered($user));

        Auth::login($user);

        if ($verifyCode == $request->verificationCode) {
            return response()->json([
                'message' => 'Đăng ký thành công',
                'user' => new UserResource($user),
                'token' => $user->createToken('auth_token')->plainTextToken,
                'verification_code' => $verifyCode
            ]);
        } else {
            return response()->json([
                'message' => 'Vui lòng nhập đúng mã xác nhận đã gửi đến email của bạn!',
            ]);
        }
    }

    public function sendVerificationCode(Request $request)
    {

        // 3. Tạo mã ngẫu nhiên 6 số
        $code = rand(100000, 999999);

        VerifyCode::updateOrCreate(
            ['email' => $request->email],
            [
                'verification_code' => $code,
                'verification_code_expires_at' => Carbon::now()->addMinutes(10)
            ]
        );

        // 5. Gửi email
        try {
            Mail::to($request->email)->send(new SendVerificationCode($code));

            return response()->json([
                'status' => true,
                'message' => 'Mã xác nhận đã được gửi đến email của bạn!'
            ], 200);
        } catch (\Exception $e) {
            // Sửa lại đoạn này để nó hiện lỗi chi tiết
            return response()->json([
                'status' => false,
                'message' => 'Lỗi Server: ' . $e->getMessage(), // Hiện thông báo lỗi ngắn gọn
                'line' => $e->getLine(), // Lỗi ở dòng nào
                'file' => $e->getFile(), // Lỗi ở file nào
                // 'trace' => $e->getTraceAsString() // Bỏ comment dòng này nếu muốn xem full log
            ], 500);
        }
    }
}

