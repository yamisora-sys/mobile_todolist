<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TodoList;
use Carbon\Carbon;
class TodoController extends Controller
{
    public function AllTodos()
    {
        return response()->json([
            'todos' => "hello",
            'meomeomeo' => "meomeomeo"
        ]);
    }
    public function getTodo(Request $request){
        $todos = TodoList::where('user_id', $request->user_id)->orderBy('start_time', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'message' => 'Get todo successfully',
            'data' => $todos
        ]);
    }
    public function getScheduledTodos(Request $request){
        $todos = TodoList::where('user_id', $request->user_id)->get();
        // group by start_time
        $todos = $todos->groupBy(function($todo){
            return Carbon::parse($todo->start_time)->format('Y-m-d');
        });
        return response()->json([
            'status' => 'success',
            'message' => 'Get scheduled todo successfully',
            'data' => $todos
        ]);
    }
    //function add todo
    public function addTodo(Request $request){
        $todo = new TodoList();
        $todo->title = $request->title;
        $todo->user_id = $request->user_id;
        $todo->imageURL = $request->imageURL;
        $todo->details = $request->details;
        $todo->repeat = $request->repeat;
        $todo->repeat_type_id = $request->repeat_type_id;
        $todo->start_time = Carbon::parse($request->start_time);
        $todo->repeat_every = $request->repeat_every;
        $todo->category_id = $request->category_id;
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
        $todo->title = $request->title;
        $todo->details = $request->details;
        $todo->repeat = $request->repeat;
        $todo->repeat_type_id = $request->repeat_type_id;
        $todo->start_time = Carbon::parse($request->start_time);
        $todo->repeat_every = $request->repeat_every;
        
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

    public function completeTodo(Request $request){
        $todo = TodoList::find($request->id);
        $todo->completed = true;
        $todo->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Complete todo successfully',
            'data' => $todo
        ]);
    }

    public function getTodayTodos(Request $request){
        $currentStartDay = Carbon::now()->startOfDay()->format('Y-m-d H:i:s'); // 00:00:00 of current day
        // 23:59:59 of current day
        $currentDayEnd = Carbon::now()->endOfDay()->format('Y-m-d H:i:s');
        $todos = TodoList::where('user_id', $request->user_id)->whereBetween('start_time', [$currentStartDay, $currentDayEnd])
        ->orderBy('start_time', 'asc')->get();
        $data = $todos->map(function($todo){
            $start_time = Carbon::parse($todo->start_time)->format('H:i');
            return [
                "id" => $todo->id,
                "time" => $start_time,
                "title" => $todo->title,
                "description" => $todo->details,
                "completed" => $todo->completed,
                "progress" => $todo->completed ? "done" : "in progress",
                "circleColor" => $todo->completed ? "#00FF00" : "#FF0000",
                "lineColor" => $todo->completed ? "#00FF00" : "#FF0000",
            ];
        });
        return response()->json([
            'status' => 'success',
            'message' => 'Get todo successfully',
            'data' => $data
        ]);
    }

    public function getDailyTodos (Request $request) {
        $todo = TodoList::where('user_id', $request->user_id)->where('repeat', true)
        ->where('repeat_type_id', 1)
        ->where('parent_id', '!=',null)
        ->orderBy('created_at', 'desc');
        // unique parent_id
        $todo = $todo->get()->unique('parent_id');
        return response()->json([
            'status' => 'success',
            'message' => 'Get todo successfully',
            'data' => $todo
        ]);
    }

    public function calculateTodayProgress(Request $request){
        $currentStartDay = Carbon::now()->startOfDay()->format('Y-m-d H:i:s'); // 00:00:00 of current day
        // 23:59:59 of current day
        $currentDayEnd = Carbon::now()->endOfDay()->format('Y-m-d H:i:s');
        $todos = TodoList::where('user_id', $request->user_id)->whereBetween('start_time', [$currentStartDay, $currentDayEnd])
        ->orderBy('start_time', 'asc')->get();
        $total = $todos->count();
        $completed = $todos->where('completed', true)->count();
        $progress = round($completed/$total, 2);
        return response()->json([
            'status' => 'success',
            'message' => 'Get todo successfully',
            'data' => [
                'labels' => ['completed', 'not completed'],
                'data' => [$progress, round(1 - $progress, 2)]
            ]
        ]);
    }

    public function CalculateCompletedTodoInWeek (Request $request) {
        $currentStartDay = Carbon::now()->startOfWeek()->format('Y-m-d H:i:s'); // 00:00:00 of current day
        // 23:59:59 of current day
        $currentDayEnd = Carbon::now()->endOfWeek()->format('Y-m-d H:i:s');
        $todos = TodoList::where('user_id', $request->user_id)->whereBetween('start_time', [$currentStartDay, $currentDayEnd])
        ->orderBy('start_time', 'asc');
        $completed = $todos->where('completed', true);
        // count completed todo each day
        $completed = $completed->get()->groupBy(function($todo){
            return Carbon::parse($todo->start_time)->format('Y-m-d');
        });
        $completed = $completed->map(function($todo){
            return $todo->count();
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Get todo successfully',
            'data' => $completed
        ]);
    }

}
