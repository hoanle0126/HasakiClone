<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
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
    public function store(RegisterRequest $request)
    {
        // BƯỚC 1: Kiểm tra mã xác nhận TRƯỚC khi tạo user
        $verifyRecord = VerifyCode::where('email', $request->email)->first();

        // Kiểm tra xem có bản ghi mã xác nhận không và mã có khớp không
        if (!$verifyRecord || $verifyRecord->verification_code !== $request->verificationCode) {
            return response()->json([
                'message' => 'Vui lòng nhập đúng mã xác nhận!',
            ], 400); // Trả về Bad Request
        }

        // BƯỚC 2: Chuẩn bị dữ liệu
        $userData = $request->only([
            'first_name',
            'last_name',
            'email',
            'birth',
            'gender'
        ]);

        // Thêm password đã mã hóa vào mảng
        $userData['password'] = Hash::make($request->password);

        // BƯỚC 3: Tạo User
        $user = User::create($userData);

        // BƯỚC 4: Đăng nhập và tạo token
        Auth::login($user);
        $token = $user->createToken('auth_token')->plainTextToken;

        // (Tùy chọn) Xóa mã xác nhận sau khi đã dùng xong để tránh dùng lại
        // $verifyRecord->delete(); 

        return response()->json([
            'message' => 'Đăng ký thành công',
            'user' => new UserResource($user),
            'token' => $token,
            // Không cần trả lại verification_code cho client ở bước này
        ], 200);
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

