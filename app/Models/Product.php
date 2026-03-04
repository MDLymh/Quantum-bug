<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $hidden = [
        'is_active',
        'created_at',
        'updated_at',
        'category_id',
        'has_subscription',
        'release_date',
    ];

    public static function getByName(string $name): Product{
        return self::where('name',$name)->first();
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function versions()
    {
        return $this->hasMany(ProductVersion::class);
    }
}
