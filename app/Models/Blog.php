<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Blog extends Model
{
    /** @use HasFactory<\Database\Factories\BlogFactory> */
    use HasFactory,HasUuids;

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
    public function uniqueIds(): array
    {
        return ['file_name'];
    }

    public static function scopeWithAnyTag(Builder $query,array $tags=[]){
        if(empty($tags)){
            return $query;
        }
        return $query->whereHas('tags',function (Builder $q) use ($tags){
            $q->whereIn('name',$tags);
        });
    }
    public static function scopeWithAllTag(Builder $query,array $tags=[]){
        if(empty($tags)){
            return $query;
        }
        foreach ($tags as $tag) {
            $query->whereHas('tags', function (Builder $q) use ($tag) {
                $q->where('name', $tag);
            });
        }
        return $query;
    }

    public static function findByName(string $name): ?self
    {
        return self::where('file_name', $name)->first();
    }

}
