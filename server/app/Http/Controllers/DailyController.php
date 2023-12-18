<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DailyController extends Controller
{
    public function AllDailies()
    {
        return response()->json([
            'dailies' => "hello",
            'meomeomeo' => "meomeomeo"
        ]);
    }
    //function add daily
    public function addDaily(){
        $daily = new Daily();
        $daily->title = $request->title;
        $daily->user_id = $request->user_id;
        $daily->details = $request->details;
        $daily->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Add daily successfully',
            'data' => $daily
        ]);
    }
}