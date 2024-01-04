<?php

namespace App\Observers;
use App\Models\User;
use App\Models\TodoList;
use Carbon\Carbon;

class UserObserver
{
    public function created(User $model)
    {
        if ($model->birthday != null) {
            $currentYear = Carbon::now()->year;
            $birthday = Carbon::parse($model->birthday);
            $birthday->year($currentYear);
            TodoList::create([
                'user_id' => $model->id,
                'title' => 'Birthday',
                'details' => 'Happy birthday to you',
                'start_time' => $model->birthday,
                'repeat' => true,
                'repeat_type_id' => 4,
                'repeat_every' => 1,
                'is_completed' => false,
            ]);
            if($birthday->isPast()){
                $birthday->addYear();
                TodoList::create([
                    'user_id' => $model->id,
                    'title' => 'Birthday',
                    'details' => 'Happy birthday to you',
                    'start_time' => $birthday,
                    'repeat' => true,
                    'repeat_type_id' => 4,
                    'repeat_every' => 1,
                    'is_completed' => false,
                ]);
            }
        }
    }
}
