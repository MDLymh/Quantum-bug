<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    /** @use HasFactory<\Database\Factories\TicketFactory> */
    use HasFactory;
    protected $guarded = [];

    public static function findByUser(int $user_id){
        return self::where('user_id', $user_id)->get();
    }

    public function isOwnedBy(int $user_id) : bool {
        return $this->user_id == $user_id;
    }

    public function comments(){
        return $this->hasMany(TicketComment::class);
    }

    public function evidence(){
        return $this->hasMany(EvidenceOfTicket::class);
    }

    public function category(){
        return $this->belongsTo(TicketCategory::class);
    }
}
