<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
class CategoryController extends Controller
{
    public function getCategory(Request $request){
        $categories = Category::all();
        return response()->json([
            'status' => 'success',
            'message' => 'Get category successfully',
            'data' => $categories
        ]);
    }
}
