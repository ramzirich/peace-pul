<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite_place extends Model
{
    use HasFactory;
    protected $fillable =['places_id'];
    protected $hidden = ["deleted_at"];
    protected $dates = ['deleted_at'];
    public $timestamps = false;

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function place(){
        return $this->belongsTo(Place::class);
    }
}
