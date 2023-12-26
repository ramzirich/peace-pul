<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite_hobby extends Model
{
    use HasFactory;
    protected $fillable =['hobbies_id'];
    protected $hidden = ["deleted_at"];
    protected $dates = ['deleted_at'];
    public $timestamps = false;

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function hobby(){
        return $this->belongsTo(Hobby::class);
    }
}
