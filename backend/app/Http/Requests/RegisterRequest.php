<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required','min:8'],
            'birth' => ['required', 'date'],
            'gender' => ['required', 'string', 'in:Nam,Nữ'],
            'acceptTerms' => ['accepted'],
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'Vui lòng nhập tên',
            'last_name.required' => 'Vui lòng nhập họ',
            'email.required' => 'Vui lòng nhập email',
            'email.email' => 'Email không hợp lệ',
            'email.unique' => 'Email đã được sử dụng',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự',
            'birth.required' => 'Vui lòng nhập ngày sinh',
            'birth.date' => 'Ngày sinh không hợp lệ',
            'acceptTerms.accepted' => 'Bạn phải đồng ý với các điều khoản dịch vụ',
        ];
    }
}
