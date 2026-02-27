<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    /** @use HasFactory<\Database\Factories\TicketFactory> */
    use HasFactory;

    public function comments(){
        return $this->hasMany(TicketComment::class);
    }

    public function evidence(){
        return $this->hasMany(EvidenceOfTicket::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }
}
