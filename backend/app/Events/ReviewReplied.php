<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ReviewReplied implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $reviewData;
    /**
     * Create a new event instance.
     */
    public function __construct($reviewData)
    {
        $this->reviewData = $reviewData;
    }

    public function broadcastOn()
    {
        return new Channel('product.' . $this->reviewData['product_id']);
    }

    public function broadcastWith()
    {
        return [
            'review_id' => $this->reviewData['review_id'],
            'reply' => $this->reviewData['reply'],
            'author' => 'AI Support Bot 🤖'
        ];
    }
}
