<?php

namespace App\Http\Controllers\Payments;

use App\Exports\payments;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Payment;
use App\State;
use App\Status;
use App\Upi_id;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class PaymentController extends Controller
{
    
    //                        list payment (INITIATED)                                      //
    public function initiatedPayment(Request $req)
    {
        $currentUser=session('user');
        $payments = DB::table("payments")
            ->leftjoin("states", "payments.state_id", "=", "states.id")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
            ->where('admin_id','=',$currentUser->id)
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
        $currentUser=session('user');
        $payments = DB::table("payments")
            ->leftjoin("states", "payments.state_id", "=", "states.id")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
            ->where('admin_id','=',$currentUser->id)
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
        $currentUser=session('user');
        $payments = DB::table("payments")
            ->leftjoin("states", "payments.state_id", "=", "states.id")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
             ->where('admin_id','=',$currentUser->id)
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
        $currentUser=session('user');
        $status = Status::where("title", "=", $req->type)->first();

        $payment = Payment::where('admin_id','=',$currentUser->id)->find($req->payment_id);
        $payment->status_id = $status->id;
        $payment->update();
    }

    //                        Revert Payment                                      //
    public function revertPayment(Request $req)
    {
        $currentUser=session('user');
        $payment = Payment:: where('admin_id','=',$currentUser->id)->find($req->payment_id);
        $payment->status_id = null;
        $payment->update();
    }

    public function showQR()
    {
        $currentUser = session('currentUser');
        
        
        if(session()->has('paymentID'))
        {
            
            $paymentDetails=Payment::find(session('paymentID'));
            $activeUPI=Upi_id::where('admin','=',$paymentDetails->admin_id)->where('status','=','active')->first();
            return view('Admin.Payment.MakePayment.qrcodePage',compact('paymentDetails','activeUPI'));
        }
        else
        {
            
            $encrytptedID = Crypt::encryptString($currentUser);
            return redirect('/payment/add?id='.$encrytptedID);
        }
    }
           
            
    //                         Make payment                                      //
    public function makePaymentForm(Request $req)
    {
        
        $encryptedId = $req->query('id');
        if($encryptedId)
        {
            $AdminId= Crypt::decryptString($encryptedId);
           
            
            $states = State::where("country_id", "=", "101")
            ->orderBy("name", "asc")
            ->get();
            
            if( session()->has('paymentID'))
            {
                return redirect('/payment/qr-code');
            }
            else
            {
                return view("Admin.Payment.MakePayment.addForm", compact("states",'AdminId'));
            }

        }
      

    }
    public function makePayment(Request $req)
    {
        
        $currentUser=$req->adminId;
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
        $payment->admin_id = $currentUser;
        $result = $payment->save();
        
        if ($result) {
            session()->put(['paymentID'=>$payment->id]);
            session()->put(['currentUser'=>$currentUser]);
        }
            
        return redirect('/payment/qr-code');
        

       
        
    }
    public function export(Request $req)
    {
        $currentUser=session('user');
        $payments = DB::table("payments")
            ->leftjoin("states", "payments.state_id", "=", "states.id")
            ->leftjoin("statuses", "payments.status_id", "=", "statuses.id")
            ->where('admin_id','=',$currentUser->id)
            ->select(
                "payments.*",
                "states.name as state_name",
                "statuses.title as status_name"
            )
            ->where("statuses.title", "=", "Rejected")
            ->get();
        //   return  Excel::download(new Payment($payments),'Payments.xlsx');
    }
    public function clearSession()
    {
        if(session()->has('paymentID'))
        {
            session()->remove('paymentID');
            return true;
        }

    }
}
