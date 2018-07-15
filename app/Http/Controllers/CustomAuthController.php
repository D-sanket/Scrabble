<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class CustomAuthController extends Controller
{
    public function register(Request $request){
        $this->validate($request, [
            'firstname' =>'required|min:3|max:30',
            'lastname' => 'required|min:3|max:50',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|max:15'
        ]);

        if((new User([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]))->save()){
            return response()->json(['message' => 'Successfully registered..you can login now!']);
        }

        return response()->json(['message' => 'Something went wrong...please try again!']);
    }

    public function login(Request $request){
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required'
        ]);

        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        try{
            $token = JWTAuth::attempt($credentials);
            if(!$token){
                return response()->json(['error' => 'Invalid credentials!']);
            }
        }
        catch (JWTException $e){
            return response()->json(['error' => 'Something went wrong!']);
        }

        return response()->json(['token' => $token]);
    }
}
