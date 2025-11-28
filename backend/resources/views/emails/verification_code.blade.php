<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mã xác nhận - Hasaki Clone</title>
    <style>
        /* Reset CSS cơ bản */
        body { margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
        table { border-collapse: collapse; width: 100%; }
    </style>
</head>
<body style="background-color: #f3f4f6; padding: 40px 0;">

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    
                    <tr>
                        <td bgcolor="#32b768" align="center" style="padding: 20px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">
                                HASAKI CLONE
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 40px 30px; text-align: center;">
                            <h2 style="color: #333333; margin-top: 0;">Xác thực tài khoản</h2>
                            <p style="color: #666666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
                                Xin chào! Cảm ơn bạn đã đăng ký tài khoản. Vui lòng sử dụng mã bên dưới để hoàn tất quá trình xác thực.
                            </p>

                            <div style="background-color: #f0fdf4; border: 1px dashed #32b768; border-radius: 8px; padding: 20px; margin: 30px 0; display: inline-block;">
                                <span style="font-size: 32px; font-weight: bold; color: #32b768; letter-spacing: 8px; display: block;">
                                    {{ $code }}
                                </span>
                            </div>

                            <p style="color: #666666; font-size: 14px;">
                                Mã xác nhận này sẽ hết hạn trong vòng <strong>10 phút</strong>.
                            </p>
                            <p style="color: #999999; font-size: 13px; font-style: italic;">
                                Tuyệt đối không chia sẻ mã này cho bất kỳ ai.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td bgcolor="#f9fafb" style="padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
                            <p style="color: #999999; font-size: 12px; margin: 0;">
                                &copy; {{ date('Y') }} Hasaki Clone. All rights reserved.
                            </p>
                            <p style="color: #999999; font-size: 12px; margin: 5px 0 0;">
                                Đây là email tự động, vui lòng không trả lời email này.
                            </p>
                        </td>
                    </tr>
                </table>
                </td>
        </tr>
    </table>

</body>
</html>