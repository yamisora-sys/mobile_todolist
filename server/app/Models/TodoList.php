<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RepeatType;

class TodoList extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'completed',
        'user_id',
        'imageURL',
        'details',
        'repeat',
        'repeat_type_id',
        'start_time',
        'reapeat_every',
        'start_day',
        'start_time',
        'parent_id',
        'category_id',
        // "remind",
        "remind_time",
    ];

    public function repeatType()
    {
        return $this->belongsTo(RepeatType::class);
    }
}
