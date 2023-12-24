<?php

namespace App\Observers;
use App\Models\User;
use App\Models\TodoList;
use Carbon\Carbon;

class UserObserver
{
    public function creating(User $model)
    {
        if ($model->birthday != null) {
            $currentYear = Carbon::now()->year;
            $birthday = Carbon::parse($model->birthday);
            $birthday->year($currentYear);
            TodoList::create([
                'user_id' => $model->id,
                'title' => 'Birthday',
                'description' => 'Happy birthday to you',
                'start_time' => $model->birthday,
                'repeat_type_id' => 4,
                'repeat_every' => 1,
                'is_completed' => false,
            ]);
            if($birthday->isPast()){
                $birthday->addYear();
                TodoList::create([
                    'user_id' => $model->id,
                    'title' => 'Birthday',
                    'description' => 'Happy birthday to you',
                    'start_time' => $model->birthday,
                    'repeat_type_id' => 4,
                    'repeat_every' => 1,
                    'is_completed' => false,
                ]);
            }
        }
    }
}
