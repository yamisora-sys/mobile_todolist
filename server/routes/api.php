<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DailyController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get("todos", [TodoController::class, "AllTodos"]);
Route::post("add-todo", [TodoController::class, "addTodo"]);

Route::post("get-todo", [TodoController::class, "getTodo"]);

Route::post("update-todo", [TodoController::class, "updateTodo"]);
Route::post("register", [UserController::class, "register"]);
Route::post("login", [UserController::class, "login"]);
Route::post("add-daily", [DailyController::class, "addDaily"]);