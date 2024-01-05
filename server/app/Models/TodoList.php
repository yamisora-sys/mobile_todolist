<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RepeatType;
use Illuminate\Database\Eloquent\SoftDeletes;
class TodoList extends Model
{
    use HasFactory;
    // use SoftDeletes;

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
        "push_notification",
    ];

    public function repeatType()
    {
        return $this->belongsTo(RepeatType::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
