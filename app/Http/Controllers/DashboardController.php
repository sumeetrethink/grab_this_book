<?php

namespace App\Http\Controllers;

use App\Payment;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function dashboard()
    {
        
        $inititatedPayments = Payment::where('admin_id','=',session('user')->id)->get();
        $Acceptedpayments = DB::table("payments")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
            ->select("payments.*", "statuses.title as status_name")
            ->where("statuses.title", "=", "Accepted")
            ->where('payments.admin_id','=',session('user')->id)
            ->get();
        
        $RejectedPayments = DB::table("payments")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
            ->select("payments.*", "statuses.title as status_name")
            ->where("statuses.title", "=", "Rejected")
            ->where('payments.admin_id','=',session('user')->id)
            ->get();
        $ActiveAdmins=User::where('role','=','Admin')->where('status','=','active')->get()->count();
        $InactiveAdmins=User::where('role','=','Admin')->where('status','=','inactive')->get()->count();
        
        return view(
            "Admin.Dashboard.index",
            compact(
                "RejectedPayments",
                "Acceptedpayments",
                "inititatedPayments",
                "InactiveAdmins",
                "ActiveAdmins"
            )
        );
    }
}
