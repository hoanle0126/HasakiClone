<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\OrderRequest;
use App\Http\Resources\UserResource;
use App\Models\Cart;
use App\Models\Order;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cart = Cart::where('user_id', Auth::id())->first();

        $orderRequest = [
            "payments" => $request->payments,
            "note" => $request->note,
            "discount_code_id" => $request->discount_code_id,
            "address_id" => $request->address_id
        ];
        $orderRequest['user_id'] = Auth::id();
        $products = request()->products;

        $order = Order::create($orderRequest);
        $cart->delete();

        foreach ($products as $value) {
            $order->Products()->attach($value['id'], [
                'quantity' => $value['quantity_cart']
            ]);
        }

        return new UserResource(request()->user());
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
