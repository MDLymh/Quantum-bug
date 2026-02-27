<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvidenceOfTicket extends Model
{
    /** @use HasFactory<\Database\Factories\EvidenceOfTicketFactory> */
    use HasFactory;

    public function ticket(){
        return $this->belongsTo(Ticket::class);
    }
}
