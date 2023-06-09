<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Payments\PaymentController;
use App\Http\Controllers\UpiController;
use App\Http\Controllers\UserController;
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

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard')->middleware('userMiddleWare');

//                                          payment        
                          
Route::get('/payment/add', [PaymentController::class, 'makePaymentForm'])->name('makePaymentForm');
Route::post('/payment/add', [PaymentController::class, 'makePayment'])->name('makePayment');
Route::get('/payment/clear-session', [PaymentController::class, 'clearSession'])->name('clearSession');
Route::get('/payment/qr-code', [PaymentController::class, 'showQR'])->name('showQR');
Route::get('/payment/revert', [PaymentController::class, 'revertPayment'])->name('revertPayment')->middleware('validate_admin');
Route::get('/payments/initiated', [PaymentController::class, 'initiatedPayment'])->name('initiatedPayment')->middleware('validate_admin');
Route::get('/payments/accepted', [PaymentController::class, 'acceptedPayment'])->name('acceptedPayment')->middleware('validate_admin');
Route::get('/payments/rejected', [PaymentController::class, 'rejectedPayment'])->name('rejectedPayment')->middleware('validate_admin');
Route::get('/payment/export', [PaymentController::class, 'export'])->name('export')->middleware('validate_admin');
Route::get('/payment/change-status', [PaymentController::class, 'changeStatus'])->name('changeStatus')->middleware('validate_admin');

//                                          UPI ID'S 

Route::get('/upi/add', [UpiController::class, 'addForm'])->name('addForm')->middleware('superAdmin');
Route::post('/upi/add', [UpiController::class, 'add'])->name('add')->middleware('superAdmin');
Route::get('/upi', [UpiController::class, 'list'])->name('list')->middleware('superAdmin');
Route::get('/upi/active', [UpiController::class, 'activeUpi'])->name('activeUpi')->middleware('superAdmin');
Route::post('/upi/delete', [UpiController::class, 'delete'])->name('delete')->middleware('superAdmin');

Route::get('/admin', [UserController::class, 'list'])->name('list')->middleware('superAdmin');
Route::get('/admin/add', [UserController::class, 'addForm'])->name('addForm')->middleware('superAdmin');
Route::post('/admin/add', [UserController::class, 'add'])->name('add')->middleware('superAdmin');
Route::post('/admin/delete', [UserController::class, 'delete'])->name('delete')->middleware('superAdmin');
Route::get('/admin/edit', [UserController::class, 'addForm'])->name('addForm')->middleware('superAdmin');
Route::post('/admin/edit', [UserController::class, 'edit'])->name('edit')->middleware('superAdmin');
