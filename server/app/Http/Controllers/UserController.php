<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    //user authentication
    public function login(Request $request){
        $user = User::where('username', $request->username)->first();
        if($user){
            if($user->password == $request->password){
                return response()->json([
                    'status' => 'success',
                    'message' => 'Login successfully',
                    'data' => $user
                ]);
            }else{
                return response()->json([
                    'status' => 'error',
                    'message' => 'Password is incorrect',
                    'data' => null
                ]);
            }
        }else{
            return response()->json([
                'status' => 'error',
                'message' => 'Username is unregistered',
                'data' => null
            ]);
        }
    }
    //user registration
    public function register(Request $request){
        $user = User::where('username', $request->username)->first();
        if($user){
            return response()->json([
                'status' => 'error',
                'message' => 'Username is already taken',
                'data' => null
            ]);
        }else{
            $user = new User();
            $user->firstname = $request->firstname;
            $user->lastname = $request->lastname;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = $request->password;
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Register successfully',
                'data' => $user
            ]);
        }
    }
}
