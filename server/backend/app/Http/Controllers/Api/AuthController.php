<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);
    
        $token = JWTAuth::fromUser($user);
        return response()->json(compact('user', 'token'), 201);
    }

    public function login(Request $request){
         
        $credentials = $request->only('email','password');

        if(!$token = Auth::attempt($credentials)){
            return response()->json(['error' => 'Invalid Credentials'],422);
        }
        $user = Auth::user();

        return response()->json(compact('user','token'));
    }
    
    public function logout(Request $request){
        try{
            JWTAuth::invalidate(JWTAuth::getToken());
        }catch(\Tymon\JWTAuth\Exceptions\JWTException $e){
            return response()->json(['error' => 'Failed to logout, please try again'], 500);
        }
    }
}
