<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Payments\PaymentController;
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

//                                       user  validation      
Route::get('/', [LoginController::class, 'loginForm'])->name('loginForm');
Route::post('/login/validate', [LoginController::class, 'validateAdmin'])->name('validateAdmin');
Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

//                                         DASHBOARD      

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard')->middleware('validate_admin');

//                                          payment        
                          
Route::get('/payment/add', [PaymentController::class, 'makePaymentForm'])->name('makePaymentForm')->middleware('validate_admin');
Route::post('/payment/add', [PaymentController::class, 'makePayment'])->name('makePayment')->middleware('validate_admin');
Route::get('/payment/revert', [PaymentController::class, 'revertPayment'])->name('revertPayment')->middleware('validate_admin');
Route::get('/payments/initiated', [PaymentController::class, 'initiatedPayment'])->name('initiatedPayment')->middleware('validate_admin');
Route::get('/payments/accepted', [PaymentController::class, 'acceptedPayment'])->name('acceptedPayment')->middleware('validate_admin');
Route::get('/payments/rejected', [PaymentController::class, 'rejectedPayment'])->name('rejectedPayment')->middleware('validate_admin');
Route::get('/payment/export', [PaymentController::class, 'export'])->name('export')->middleware('validate_admin');
Route::get('/payment/change-status', [PaymentController::class, 'changeStatus'])->name('changeStatus')->middleware('validate_admin');
