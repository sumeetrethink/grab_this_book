<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function list(Request $req)
    {
        $admins=User::where('role','=','Admin')->where('status','=','active')->paginate(10);
        return view('Admin.Admin.list',compact('admins'));
    }
    public function delete(Request $req)
    {

        $admin=User::where('role','=','Admin')->find($req->deleteInput);
        $admin->status='inactive';
        $result=$admin->update();
        if($result)
        {
            return redirect('/admin')->with(['msg-success'=>'User deleted successfully' ]);
        }
        else
        {
            return redirect('/admin')->with(['msg-success'=>'Somthing went wrong could not delete user' ]);
        }
    }
    public function addForm(Request $req)
    {
        $userId = $req->query('id');
        if($userId)
        {
            $user=User::find($userId);
            return view('Admin.Admin.add',compact('user'));
        }
        else
        {
            return view('Admin.Admin.add');
        }
    }
    public function add(Request $req)
    {
        $req->validate(
            ['name'=>'required',
            'username'=>'required|unique:users',
            'password'=>'required',
            'confirmPassword' => 'required|same:password',]
        );
        $user=new User();
        $user->name=$req->name;
        $user->username=$req->username;
        $user->password=Hash::make($req->password);
        $user->role='Admin';
        $result=$user->save();
        if($result)
        {
            return redirect('/admin')->with(['msg-success'=>'Admin added succesfully']);
        }
        else
        {
            return redirect('/admin')->with(['msg-error'=>'Something went wrong could not add admin.']);
        }

    }
public function edit(Request $req)
{
    $user=User::find($req->userId);
    if($req->password)
    {
        $req->validate(
            ['name'=>'required',
            'username'=>'required|unique:users',
            'password'=>'required',
            'confirmPassword' => 'required|same:password',]
        );
    }
    else
    {
        $req->validate(
            ['name'=>'required',
            'username'=>'required|unique:users',]
        );
    }
    $user->name=$req->name;
    $user->username=$req->username;
    if($req->password)
    {
        $user->password=Hash::make($req->password);
    }
    $user->role='Admin';
    $result=$user->update();
    if($result)
    {
        return redirect('/admin')->with(['msg-success'=>'Admin updated succesfully']);
    }
    else
    {
        return redirect('/admin')->with(['msg-error'=>'Something went wrong could not update admin.']);
    }
}

}
