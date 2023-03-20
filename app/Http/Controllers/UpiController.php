<?php

namespace App\Http\Controllers;

use App\Upi_id;
use Illuminate\Http\Request;

class UpiController extends Controller
{
    public function addForm()
    {
     return view('Admin.Upi.add');
    }    
    public function add(Request $req)
    {
        $req->validate([
            'upi_name'=>'required',
            'upi_id'=>'required',
        ]);
            
        $upi=new Upi_id();
        $upi->upi_name=$req->upi_name;
        $upi->id_upi=$req->upi_id;
        $upi->amount_limit=$req->upi_limit;
        $upi->save();
        return redirect('/upi');
    }
    public function list()
    {
        $upis=Upi_id::paginate(10);
        return view('Admin.Upi.list',compact('upis'));
    }
    public function activeUpi(Request $req)
    {
        $upis=Upi_id::get();
        foreach ($upis as $key => $items) {
           $items->status="inactive";
           $items->update();
        }
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
