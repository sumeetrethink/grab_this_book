<?php

namespace App\Http\Controllers;

use App\Models\adminModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class loginController extends Controller
{
    public function loginForm()
    {
        return view('Admin.LoginForm');
    }

    public function validateAdmin(Request $req)
    {
        $req->validate([
            'vUsername'=>'required',   
            'vPassword'=>'required'
            ]);
        $user= adminModel::where('vUsername', '=' ,$req->vUsername)
                        ->first();
        if($user) 
        {     
          if(Hash::check( $req->vPassword,$user->vPassword)) 
            {
              session()->put('admin', $req->vUsername);
              return redirect('/dashboard');
            }
        }
    }
}
           
         
