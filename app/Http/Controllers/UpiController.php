<?php

namespace App\Http\Controllers;

use App\Upi_id;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UpiController extends Controller
{
    public function addForm()
    {
        $admins=User::where('role','=','Admin')->get();
         return view('Admin.Upi.add',compact('admins'));
    }    
    public function add(Request $req)
    {
        $req->validate([
            'upi_name'=>'required',
            'upi_id'=>'required',
        ]);
            
        $upi=new Upi_id();
        $upi->admin=$req->admin_id;
        $upi->upi_name=$req->upi_name;
        $upi->id_upi=$req->upi_id;
        $upi->amount_limit=$req->upi_limit;
        $upi->save();
        return redirect('/upi');
    }
    public function list(Request $req)
    {
        $user=$req->user_id !==0 ? $req->user_id: null;
        $admins=User::where('role','=','Admin')->paginate(10);
        $upis=DB::table('upi_ids')->leftJoin('users','upi_ids.admin','users.id')
        ->when($user, function ($query, $user) {
            $query->where(function ($query) use ($user) {
                $query->where('upi_ids.admin', '=', $user);
            });
        })
        ->select('upi_ids.*','users.name as username')
        ->paginate(10);
        return view('Admin.Upi.list',compact('upis','admins'));
    }
    public function activeUpi(Request $req)
    {
        $activateId=Upi_id::find($req->id);
        $upis=Upi_id::where('admin','=',$activateId->admin)->get();
        
        foreach ($upis as $key => $items) {
            $items->status="inactive";
            $items->update();
        }
        $activateId=Upi_id::find($req->id);
        $activateId=Upi_id::find($req->id);
        $activateId->status="active";
        $activateId->update();
        return true;

    }
    public function delete(Request $req)
    {
        $upi=Upi_id::find($req->deleteInput);
        $upi->delete();
        return redirect('/upi');
    }

}
