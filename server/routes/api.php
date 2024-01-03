<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RepeatController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\URL;
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

Route::get("get-todo/{user_id}", [TodoController::class, "getTodo"]);

Route::post("update-todo", [TodoController::class, "updateTodo"]);
Route::post("register", [UserController::class, "register"]);
Route::post("login", [UserController::class, "login"]);

Route::get("get-category", [CategoryController::class, "getCategory"]);

Route::get("get-scheduled-todos/{user_id}", [TodoController::class, "getScheduledTodos"]);
Route::get("calculate-today-progress/{user_id}", [TodoController::class, "calculateTodayProgress"]);
Route::get("calculate-week-complete/{user_id}", [TodoController::class, "CalculateCompletedTodoInWeek"]);

Route::get("get-daily-todo/{user_id}", [TodoController::class, "getDailyTodos"]);
Route::get("get-repeat-type", [RepeatController::class, "getRepeatType"]);
Route::get("get-today-todo/{user_id}", [TodoController::class, "getTodayTodos"]);
Route::get("complete-todo/{id}", [TodoController::class, "completeTodo"]);
Route::get("uncomplete-todo/{id}", [TodoController::class, "uncompleteTodo"]);

Route::get('calculate-frequency-in-month/{user_id}', [TodoController::class, 'CalculateFrequencyInMonth']);

Route::post("update-user", [UserController::class, "updateUser"]);