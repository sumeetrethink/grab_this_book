<?php

namespace App\Http\Controllers;

use App\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $inititatedPayments = Payment::get();
        $Acceptedpayments = DB::table("payments")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
            ->select("payments.*", "statuses.title as status_name")
            ->where("statuses.title", "=", "Accepted")
            ->get();
        
        $RejectedPayments = DB::table("payments")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
            ->select("payments.*", "statuses.title as status_name")
            ->where("statuses.title", "=", "Rejected")
            ->get();
        return view(
            "Admin.Dashboard.index",
            compact(
                "RejectedPayments",
                "Acceptedpayments",
                "inititatedPayments"
            )
        );
    }
}
