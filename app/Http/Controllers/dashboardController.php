<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $inititatedPayments=Payment::where('status_id','=',null)->get();
        $Acceptedpayments=DB::table('payments')
                        ->leftjoin('status', 'payments.status_id', '=', 'status.id')
                        ->select('payments.*','status.title as status_name')
                        ->where('status.title','=',"Accepted")->get();
        
        $RejectedPayments=DB::table('payments')
                        ->leftjoin('status', 'payments.status_id', '=', 'status.id')
                        ->select('payments.*','status.title as status_name')
                        ->where('status.title','=',"Rejected")->get();
        return view('Admin.Dashboard.index',compact('RejectedPayments','Acceptedpayments','inititatedPayments'));
    }
}
