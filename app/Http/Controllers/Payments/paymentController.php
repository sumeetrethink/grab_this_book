<?php

namespace App\Http\Controllers\Payments;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\paymentsModel;
use App\Models\statesModel;
use App\Models\statusModel;
use Illuminate\Support\Facades\DB;

class paymentController extends Controller
{   
    ////////////////////////// list payment (INITIATED)////////////////////////
    public function initiatedPayment(Request $req)
    {
        $payments=DB::table('payments')
        ->leftjoin('pradesh', 'payments.state_id', '=', 'pradesh.id')
        ->leftjoin('status', 'payments.status_id', '=', 'status.id')
        ->select('payments.*', 'pradesh.name as state_name', 'status.title as status_name')
        ->where('status_id','=',null)->paginate(10);
       
        return view('Admin.Payment.Checkoutinitiates.list',compact('payments'));
    }
    public function acceptedPayment(Request $req)
    {
        $payments=DB::table('payments')
        ->leftjoin('pradesh', 'payments.state_id', '=', 'pradesh.id')
        ->leftjoin('status', 'payments.status_id', '=', 'status.id')
        ->select('payments.*', 'pradesh.name as state_name', 'status.title as status_name')
        ->where('status.title','=',"Accepted")->paginate(10);
       
        return view('Admin.Payment.Accepted.list',compact('payments'));
    }
    public function rejectedPayment(Request $req)
    {
        $payments=DB::table('payments')
        ->leftjoin('pradesh', 'payments.state_id', '=', 'pradesh.id')
        ->leftjoin('status', 'payments.status_id', '=', 'status.id')
        ->select('payments.*', 'pradesh.name as state_name', 'status.title as status_name')
        ->where('status.title','=',"Rejected")->paginate(10);
       
        return view('Admin.Payment.Rejection.list',compact('payments'));
    }
    // change status ajax function it is a common funciton to change the status
    public function changeStatus(Request $req)
    {
        $status=statusModel::where('title',"=",$req->type)->first();
        $payment=paymentsModel::find($req->payment_id);
        $payment->status_id=$status->id;
        $payment->update();
    }
    //////////////////////////////    Make payment    ///////////////////////////////////
    public function makePaymentForm()
    {
        $states=statesModel::where('country_id','=','101')->orderBy('name','asc')->get();
        return view('Admin.Payment.MakePayment.addForm',compact('states'));
    }
    public function makePayment(Request $req)
    {
       
        $req->validate([
            "name"=>"required",
            "state"=>"required|not_in:0",
            "phone"=>"required",
            "amount"=>"required",
        ]);
        $payment=new paymentsModel();
        $payment->name=$req->name;
        $payment->phone=$req->phone;
        $payment->state_id=$req->state;
        $payment->amount=$req->amount;
        $result= $payment->save();
        $amount=$req->amount;
        if($result)
        {
            return view('Admin.Payment.MakePayment.qrcodePage',compact('amount'));
        }
    }

}
