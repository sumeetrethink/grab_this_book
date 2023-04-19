<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function loginForm()
    {
        return view("Admin.Login");
    }

    public function validateAdmin(Request $req)
    {
        $req->validate([
            "vUsername" => "required",
            "vPassword" => "required",
        ]);

        $user = User::where("username", "=", $req->vUsername)
        ->first();
        if ($user) {
            if (Hash::check($req->vPassword, $user->password)) {
                session()->put("user", $user);
                return redirect("/dashboard");
            } else {
                return redirect("/")->with(["msg-password"=>"Password is incorrect","username"=>$req->vUsername]);
            }
        }
        else
        {
            return redirect("/")->with(["msg-username"=>"Invalid username","username"=>$req->vUsername]);
        }
    }

            
    public function logout()
    {
        session()->remove("user");
        return redirect("/");
    }
}
