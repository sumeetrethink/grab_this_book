<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function loginForm()
    {
        return view('Admin.Login');
    }

    public function validateAdmin(Request $req)
    {
        $req->validate([
            'vUsername'=>'required',   
            'vPassword'=>'required'
            ]);
            
        $user= User::where('role', '=' ,1)->where('username', '=' ,$req->vUsername)
                        ->first();
        if($user) 
        {     
          if(Hash::check( $req->vPassword,$user->password)) 
            {
              session()->put('admin', $req->vUsername);
              return redirect('/dashboard');
            }
        }
    }
    public function logout()
    {
        session()->remove('admin');
        return redirect('/');
    }
}
           
         
