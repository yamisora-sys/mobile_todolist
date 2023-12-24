<?php

namespace App\Observers;
use App\Models\TodoList;
class TodoObserver
{
    //after creating todo, if repeat is true, update parrrent_id = id
    public function created(TodoList $todo)
    {
        if($todo->repeat && $todo->parent_id == null){
            $todo->parent_id = $todo->id;
            $todo->save();
        }
    }
    // after updating todo from repeat = true to repeat = false, update repeat = false for all todo with parent_id = id
    public function updated(TodoList $todo)
    {
        if($todo->repeat == false && $todo->parent_id != null){
            $todos = TodoList::where('parent_id', $todo->parent_id)->get();
            foreach($todos as $todo){
                $todo->repeat = false;
                $todo->save();
            }
        }
    }
}
