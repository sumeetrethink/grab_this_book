<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\loginController;
use App\Http\Controllers\Payments\paymentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//////////////////////////////        user  validation    ///////////////////////////
Route::get('/', [loginController::class, 'loginForm'])->name('loginForm');
Route::post('/login/validate', [loginController::class, 'validateAdmin'])->name('validateAdmin');

////////////////////////                DASHBOARD     //////////////////////////////////
Route::get('/dashboard', [dashboardController::class, 'dashboard'])->name('dashboard')->middleware('validate_admin');

////////////////////////                payment      //////////////////////////////////
Route::get('/payment/add', [paymentController::class, 'makePaymentForm'])->name('makePaymentForm')->middleware('validate_admin');
Route::post('/payment/add', [paymentController::class, 'makePayment'])->name('makePayment')->middleware('validate_admin');
Route::get('/payments/initiated', [paymentController::class, 'initiatedPayment'])->name('initiatedPayment')->middleware('validate_admin');
Route::get('/payments/accepted', [paymentController::class, 'acceptedPayment'])->name('acceptedPayment')->middleware('validate_admin');
Route::get('/payments/rejected', [paymentController::class, 'rejectedPayment'])->name('rejectedPayment')->middleware('validate_admin');
Route::get('/payment/change-status', [paymentController::class, 'changeStatus'])->name('changeStatus')->middleware('validate_admin');
