<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVersion extends Model
{
    /** @use HasFactory<\Database\Factories\ProductVersionFactory> */
    use HasFactory;

    public $hidden = [
        'product_id',
        'updated_at'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
