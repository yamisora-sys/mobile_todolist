<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RepeatType;
class RepeatController extends Controller
{
    public function getRepeatType(){
        $repeatTypes = RepeatType::all();
        return response()->json([
            'status' => 'success',
            'message' => 'Get repeat type successfully',
            'data' => $repeatTypes
        ]);
    }
}
