<?php

namespace App\Http\Controllers\Payments;

use App\Exports\payments;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Payment;
use App\State;
use App\Status;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class PaymentController extends Controller
{
    //                        list payment (INITIATED)                                      //
    public function initiatedPayment(Request $req)
    {
        $payments = DB::table("payments")
            ->leftjoin("states", "payments.state_id", "=", "states.id")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
            ->select(
                "payments.*",
                "states.name as state_name",
                "statuses.title as status_name"
            )
            ->where("status_id", "=", null)
            ->paginate(10);

        return view(
            "Admin.Payment.CheckoutInitiates.list",
            compact("payments")
        );
    }
    public function acceptedPayment(Request $req)
    {
        $payments = DB::table("payments")
            ->leftjoin("states", "payments.state_id", "=", "states.id")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
            ->select(
                "payments.*",
                "states.name as state_name",
                "statuses.title as status_name"
            )
            ->where("statuses.title", "=", "Accepted")
            ->paginate(10);

        return view("Admin.Payment.Accepted.list", compact("payments"));
    }
    public function rejectedPayment(Request $req)
    {
        $payments = DB::table("payments")
            ->leftjoin("states", "payments.state_id", "=", "states.id")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
            ->select(
                "payments.*",
                "states.name as state_name",
                "statuses.title as status_name"
            )
            ->where("statuses.title", "=", "Rejected")
            ->paginate(10);

        return view("Admin.Payment.Rejection.list", compact("payments"));
    }
    // change status ajax function it is a common funciton to change the status
    public function changeStatus(Request $req)
    {
        $status = Status::where("title", "=", $req->type)->first();

        $payment = Payment::find($req->payment_id);
        $payment->status_id = $status->id;
        $payment->update();
    }

    //                        Revert Payment                                      //
    public function revertPayment(Request $req)
    {
        $payment = Payment::find($req->payment_id);
        $payment->status_id = null;
        $payment->update();
    }

    //                         Make payment                                      //
    public function makePaymentForm()
    {
        $states = State::where("country_id", "=", "101")
            ->orderBy("name", "asc")
            ->get();
        return view("Admin.Payment.MakePayment.addForm", compact("states"));
    }
    public function makePayment(Request $req)
    {
        $req->validate([
            "name" => "required",
            "state" => "required|not_in:0",
            "phone" => "required",
            "amount" => "required",
        ]);
        $payment = new Payment();
        $payment->name = $req->name;
        $payment->phone = $req->phone;
        $payment->state_id = $req->state;
        $payment->amount = $req->amount;
        $result = $payment->save();
        $amount = $req->amount;
        if ($result) {
            // return view('Admin.Payment.MakePayment.qrcodePage',compact('amount'));
            return redirect("/payments/initiated");
        }
    }
    public function export(Request $req)
    {
        $payments = DB::table("payments")
            ->leftjoin("states", "payments.state_id", "=", "states.id")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
            ->select(
                "payments.*",
                "states.name as state_name",
                "statuses.title as status_name"
            )
            ->where("statuses.title", "=", "Rejected")
            ->get();
        //   return  Excel::download(new Payment($payments),'Payments.xlsx');
    }
}
