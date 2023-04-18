<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function list(Request $req)
    {
        $admins=User::where('role','=','Admin')->paginate(10);
        return view('Admin.Admin.list',compact('admins'));
    }
    public function delete(Request $req)
    {

        $admin=User::where('role','=','Admin')->find($req->deleteInput);
        $result=$admin->delete();
        return redirect()->back()->with(['msg-success'=>'User deleted successfully' ]);
    }
    public function addForm()
    {
        return view('Admin.Admin.add');
    }
    public function add(Request $req)
    {
        $req->validate(
            ['name'=>'required',
            'username'=>'required|unique:users',
            'password'=>'required',
            'confirmPassword' => 'required|same:password',
        ],
        );
        $user=new User();
        $user->name=$req->name;
        $user->username=$req->username;
        $user->password=Hash::make($req->password);
        $user->role='Admin';
        $user->save();
        return redirect('/admin')->with(['msg-success'=>'Admin added succesfully']);

    }
}
