<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác nhận đơn hàng - Hasaki Clone</title>
    <style>
        body { margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
        table { border-collapse: collapse; width: 100%; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
        }
    </style>
</head>
<body style="background-color: #f3f4f6; padding: 40px 0;">

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        <td bgcolor="#326e51" align="center" style="padding: 30px 20px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                                HASAKI CLONE
                            </h1>
                            <p style="color: #ffffff; margin: 10px 0 0; font-size: 16px; opacity: 0.9;">
                                Xác nhận đơn hàng thành công
                            </p>
                        </td>
                    </tr>

                    <!-- Success Icon -->
                    <tr>
                        <td align="center" style="padding: 30px 20px 20px;">
                            <div style="width: 80px; height: 80px; background-color: #DBFCDE; border-radius: 50%; display: inline-block; line-height: 80px;">
                                <span style="font-size: 48px;">✓</span>
                            </div>
                        </td>
                    </tr>

                    <!-- Order Info -->
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <h2 style="color: #212B36; margin: 0 0 15px; font-size: 24px; font-weight: 600;">
                                Cảm ơn bạn đã đặt hàng!
                            </h2>
                            <p style="color: #637381; font-size: 16px; line-height: 24px; margin: 0 0 25px;">
                                Đơn hàng của bạn đã được tiếp nhận và đang được xử lý. Chúng tôi sẽ gửi thông báo cập nhật cho bạn qua email.
                            </p>

                            <!-- Order Details Box -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F9FAFB; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                                <tr>
                                    <td>
                                        <p style="margin: 0 0 10px; color: #637381; font-size: 14px;">Mã đơn hàng</p>
                                        <p style="margin: 0; color: #326e51; font-size: 20px; font-weight: bold;">
                                            #ORD-{{ str_pad($order->id, 3, '0', STR_PAD_LEFT) }}
                                        </p>
                                    </td>
                                    <td align="right">
                                        <p style="margin: 0 0 10px; color: #637381; font-size: 14px;">Ngày đặt</p>
                                        <p style="margin: 0; color: #212B36; font-size: 16px; font-weight: 600;">
                                            {{ $order->created_at->format('d/m/Y H:i') }}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Order Items -->
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <h3 style="color: #212B36; margin: 0 0 20px; font-size: 18px; font-weight: 600;">
                                Chi tiết đơn hàng
                            </h3>
                            
                            @foreach($order->products as $product)
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #DFE3E8;">
                                <tr>
                                    <td width="80" valign="top">
                                        <img src="{{ $product->thumbnail ?? 'https://via.placeholder.com/80' }}" alt="{{ $product->name }}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; background-color: #F4F6F8;">
                                    </td>
                                    <td style="padding-left: 15px; vertical-align: top;">
                                        <p style="margin: 0 0 8px; color: #212B36; font-size: 16px; font-weight: 600;">
                                            {{ $product->name }}
                                        </p>
                                        <p style="margin: 0; color: #637381; font-size: 14px;">
                                            Số lượng: {{ $product->pivot->quantity ?? 0 }} x {{ number_format($product->price, 0, ',', '.') }} đ
                                        </p>
                                    </td>
                                    <td align="right" valign="top">
                                        <p style="margin: 0; color: #212B36; font-size: 16px; font-weight: 600;">
                                            {{ number_format(($product->pivot->quantity ?? 0) * $product->price, 0, ',', '.') }} đ
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            @endforeach
                        </td>
                    </tr>

                    <!-- Order Summary -->
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                @php
                                    $subtotal = $order->products->sum(function($product) {
                                        return ($product->pivot->quantity ?? 0) * $product->price;
                                    });
                                    $discount = 0;
                                    if ($order->discountCode) {
                                        $discount = ($subtotal * $order->discountCode->discount) / 100;
                                    }
                                    $shippingFee = 30000;
                                    $total = $subtotal - $discount + $shippingFee;
                                @endphp

                                <tr>
                                    <td style="padding: 8px 0; color: #637381; font-size: 14px;">Tạm tính:</td>
                                    <td align="right" style="padding: 8px 0; color: #212B36; font-size: 14px; font-weight: 600;">
                                        {{ number_format($subtotal, 0, ',', '.') }} đ
                                    </td>
                                </tr>
                                
                                @if($discount > 0)
                                <tr>
                                    <td style="padding: 8px 0; color: #637381; font-size: 14px;">
                                        Giảm giá ({{ $order->discountCode->code }}):
                                    </td>
                                    <td align="right" style="padding: 8px 0; color: #326e51; font-size: 14px; font-weight: 600;">
                                        -{{ number_format($discount, 0, ',', '.') }} đ
                                    </td>
                                </tr>
                                @endif

                                <tr>
                                    <td style="padding: 8px 0; color: #637381; font-size: 14px;">Phí vận chuyển:</td>
                                    <td align="right" style="padding: 8px 0; color: #212B36; font-size: 14px; font-weight: 600;">
                                        {{ number_format($shippingFee, 0, ',', '.') }} đ
                                    </td>
                                </tr>

                                <tr>
                                    <td colspan="2" style="border-top: 2px solid #DFE3E8; padding-top: 15px; margin-top: 15px;"></td>
                                </tr>

                                <tr>
                                    <td style="padding: 15px 0 0; color: #212B36; font-size: 18px; font-weight: 700;">Tổng cộng:</td>
                                    <td align="right" style="padding: 15px 0 0; color: #ff6600; font-size: 20px; font-weight: 700;">
                                        {{ number_format($total, 0, ',', '.') }} đ
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Shipping Address -->
                    @if($order->address)
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <h3 style="color: #212B36; margin: 0 0 15px; font-size: 18px; font-weight: 600;">
                                Địa chỉ giao hàng
                            </h3>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F9FAFB; border-radius: 8px; padding: 20px;">
                                <tr>
                                    <td>
                                        <p style="margin: 0 0 8px; color: #212B36; font-size: 16px; font-weight: 600;">
                                            {{ $order->address->name }}
                                        </p>
                                        <p style="margin: 0 0 5px; color: #637381; font-size: 14px; line-height: 22px;">
                                            📞 {{ $order->address->phone }}
                                        </p>
                                        <p style="margin: 0; color: #637381; font-size: 14px; line-height: 22px;">
                                            📍 {{ $order->address->street_address }}, {{ $order->address->ward }}, {{ $order->address->district }}, {{ $order->address->province }}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    @endif

                    <!-- Payment Info -->
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <h3 style="color: #212B36; margin: 0 0 15px; font-size: 18px; font-weight: 600;">
                                Phương thức thanh toán
                            </h3>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F9FAFB; border-radius: 8px; padding: 20px;">
                                <tr>
                                    <td>
                                        <p style="margin: 0; color: #637381; font-size: 16px;">
                                            @if(isset($order->payments['type']) && $order->payments['type'] === 'online')
                                                💳 Thanh toán online
                                            @else
                                                💵 Thanh toán khi nhận hàng (COD)
                                            @endif
                                        </p>
                                        @if(isset($order->payments['status']))
                                        <p style="margin: 8px 0 0; color: #637381; font-size: 14px;">
                                            Trạng thái: 
                                            <span style="color: {{ $order->payments['status'] === 'completed' ? '#326e51' : '#ff6600' }}; font-weight: 600;">
                                                {{ $order->payments['status'] === 'completed' ? 'Đã thanh toán' : 'Chờ xử lý' }}
                                            </span>
                                        </p>
                                        @endif
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Note -->
                    @if($order->note)
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <h3 style="color: #212B36; margin: 0 0 15px; font-size: 18px; font-weight: 600;">
                                Ghi chú
                            </h3>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFF7ED; border-left: 4px solid #ff6600; border-radius: 4px; padding: 15px;">
                                <tr>
                                    <td>
                                        <p style="margin: 0; color: #637381; font-size: 14px; line-height: 22px;">
                                            {{ $order->note }}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    @endif

                    <!-- CTA Button -->
                    <tr>
                        <td align="center" style="padding: 0 30px 30px;">
                            <a href="{{ env('APP_URL', 'http://localhost:3000') }}/orders" style="display: inline-block; background-color: #326e51; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; margin: 10px 0;">
                                Xem chi tiết đơn hàng
                            </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td bgcolor="#F9FAFB" style="padding: 30px; text-align: center; border-top: 1px solid #DFE3E8;">
                            <p style="color: #637381; font-size: 14px; margin: 0 0 10px; line-height: 22px;">
                                Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc hotline.
                            </p>
                            <p style="color: #919EAB; font-size: 12px; margin: 15px 0 0;">
                                &copy; {{ date('Y') }} Hasaki Clone. All rights reserved.
                            </p>
                            <p style="color: #919EAB; font-size: 12px; margin: 5px 0 0;">
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

