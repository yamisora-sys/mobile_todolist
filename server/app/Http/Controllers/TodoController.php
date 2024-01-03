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
        // return todos and category name
        $todos = $todos->map(function($todo){
            return [
                "id" => $todo->id,
                "title" => $todo->title,
                "details" => $todo->details,
                "completed" => $todo->completed,
                "remind_time" => $todo->remind_time,
                "start_time" => $todo->start_time,
                "category" => $todo->category ? $todo->category->name : null,
                "category_id" => $todo->category_id,
                "start_time" => $todo->start_time,
                "repeat" => $todo->repeat,
                "repeat_type_id" => $todo->repeat_type_id,
                "repeat_every" => $todo->repeat_every,
                "parent_id" => $todo->parent_id,
                "imageURL" => $todo->imageURL,
            ];
        });
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
        $todo->remind_time = $request->remind_time;
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
        $todo->category_id = $request->category_id;
        $todo->remind_time = $request->remind_time;
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
                "remind_time" => $todo->remind_time,
                "start_time" => $todo->start_time,
                "category_id" => $todo->category_id,
                "repeat" => $todo->repeat,
                "repeat_type_id" => $todo->repeat_type_id,
                "repeat_every" => $todo->repeat_every,
                "details" => $todo->details,
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
                'labels' => ['completed'],
                'data' => [$progress]
            ]
        ]);
    }

    public function CalculateCompletedTodoInWeek (Request $request) {
        $labels = [];
        $data = [];
        for ($i = 7; $i >=0; $i--) {
            $startDay = Carbon::now()->subDays($i)->startOfDay()->format('Y-m-d H:i:s');
            $endDay = Carbon::now()->subDays($i)->endOfDay()->format('Y-m-d H:i:s');
            $todos = TodoList::where('user_id', $request->user_id)->whereBetween('start_time', [$startDay, $endDay])
            ->orderBy('start_time', 'asc')->get();
            $total = $todos->count();
            $completed = $todos->where('completed', true)->count();
            $labels[] = Carbon::now()->subDays($i)->format('D');
            $data[] = $completed;
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Get todo successfully',
            'data' => [
                'labels' => $labels,
                // dataset array object
                'datasets' => [
                    [
                        'data' => $data,
                    ]
                ]
            ]
        ]);
    }

    public function CalculateProgressInWeek (Request $request){
        
    }
    
    public function AnalyticsAllTodoForUser(Request $request){
        $todos = TodoList::where('user_id', $request->user_id)->orderBy('start_time', 'desc')->get();
        $total = $todos->count();
        $completed = $todos->where('completed', true)->count();
        return response()->json([
            'status' => 'success',
            'message' => 'Get todo successfully',
            'data' => [
                "total" => $total,
                "completed" => $completed,
            ]
        ]);
    }

    public function uncompleteTodo (Request $request) {
        $todo = TodoList::find($request->id);
        $todo->completed = false;
        $todo->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Uncomplete todo successfully',
            'data' => $todo
        ]);
    }
    public function CalculateFrequencyInMonth (Request $request) {
        $data = [];
        for ($i = 30; $i >=0; $i--) {
            $startDay = Carbon::now()->subDays($i)->startOfDay()->format('Y-m-d H:i:s');
            $endDay = Carbon::now()->subDays($i)->endOfDay()->format('Y-m-d H:i:s');
            $todos = TodoList::where('user_id', $request->user_id)->whereBetween('start_time', [$startDay, $endDay])
            ->orderBy('start_time', 'asc')->get();
            $total = $todos->count();
            $completed = $todos->where('completed', true)->count();
            $data[] = [
                "date" => Carbon::now()->subDays($i)->format('Y-m-d'),
                "count" => $completed
            ];
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Get todo successfully',
            'data' => $data
        ]);
    }
}
