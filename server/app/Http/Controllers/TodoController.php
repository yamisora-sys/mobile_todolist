<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TodoList;
class TodoController extends Controller
{
    public function AllTodos()
    {
        return response()->json([
            'todos' => "hello",
            'meomeomeo' => "meomeomeo"
        ]);
    }
    //function add todo
    public function addTodo(Request $request){
        $todo = new TodoList();
        $todo->title = $request->title;
        $todo->user_id = $request->user_id;
        $todo->details = $request->details;
        $todo->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Add todo successfully',
            'data' => $todo
        ]);
    }
    //function update todo
    public function updateTodo(Request $request){
        $todo = TodoList::find($request->id);
        $todo->completed = true;
        $todo->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Update todo successfully',
            'data' => $todo
        ]);
    }
    //function delete todo
    public function deleteTodo(Request $request){
        $todo = TodoList::find($request->id);
        $todo->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Delete todo successfully',
            'data' => $todo
        ]);
    }
}
