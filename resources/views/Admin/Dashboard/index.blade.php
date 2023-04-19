@extends('Admin.index', ['title' => 'Get This Book | Dashboard'])
@section('content')
@php
    $userID=session('user')->id;
    $encrytptedID = Crypt::encryptString($userID);
@endphp
    <div class="container-fluid">
        <!-- Page Heading -->
        <div class="content-header">
            <div class="container-fluid d-flex flex-row justify-content-between">
                <h5>Dashboard</h5>
                @if(session('user')->role == 'Admin')
                <div class="input-group col-4">
                    <input type="text" id="linkInput" aria-label="Disabled input example" disabled readonly
                        class="form-control" value="{{url('payment/add?id='.$encrytptedID)}}" style="background:rgb(202, 201, 201) ">
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="button" id="cupyButton" onclick="copyToClipboard()">Copy
                            Link</button>
                        
                    </span>
                </div>
                @endif
            </div>
        </div>
        @if (session('user')->role == 'Admin')
            <section class="content">
                <div class="box-body">
                    <div class="row">
                        <div class="col-lg-3 col-6 ">
                            <!-- small box -->
                            <div class="small-box bg-info ">
                                <div class="inner">
                                    <h3>{{ $inititatedPayments->count() ?? 0 }}</h3>
                                    <p>Initiated Request</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-stats-bars"></i>
                                </div>
                                <a href="" class="small-box-footer">More info <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3>{{ $inititatedPayments->count() ?? 0 }}</h3>
                                    <p>Pending For Approval</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-check-circle"></i>
                                </div>
                                <a href="" class="small-box-footer">More info <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-warning">
                                <div class="inner">
                                    <h3>{{ $Acceptedpayments->count() ?? 0 }}</h3>
                                    <p>Total Approved

                                    </p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-check"></i>
                                </div>
                                <a href="" class="small-box-footer">More info <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- products  Card Example -->
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-danger">
                                <div class="inner">
                                    <h3>{{ $RejectedPayments->count() ?? 0 }}</h3>
                                    <p>Total Rejected

                                    </p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-times"></i>
                                </div>
                                <a style="visibility: invisible" href="" class="small-box-footer">More info <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        @else
            <section class="content">
                <div class="box-body">
                    <div class="row">
                        <div class="col-lg-3 col-6 ">
                            <!-- small box -->
                            <div class="small-box bg-info ">
                                <div class="inner">
                                    <h3>{{ ($ActiveAdmins ?? 0)+($InactiveAdmins ?? 0) }}</h3>
                                    <p>Total Admin</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-users"></i>
                                </div>
                                <a href="{{ '/admin' }}" class="small-box-footer">More info <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6 ">
                            <!-- small box -->
                            <div class="small-box bg-info ">
                                <div class="inner">
                                    <h3>{{ $ActiveAdmins ?? 0 }}</h3>
                                    <p>Active Admin</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-users"></i>
                                </div>
                                <a href="{{ '/admin' }}" class="small-box-footer">More info <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6 ">
                            <!-- small box -->
                            <div class="small-box bg-danger ">
                                <div class="inner">
                                    <h3>{{ $InactiveAdmins ?? 0 }}</h3>
                                    <p>Inactive Admin</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-users"></i>
                                </div>
                                <a href="{{ '/admin' }}" class="small-box-footer">More info <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>




                    </div>
                </div>
            </section>
        @endif
        <script>
             function copyToClipboard() {
            const textToCopy = $('#linkInput').val();
            const input = document.createElement('input');
            input.setAttribute('value', textToCopy);
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);

        }
        </script>
    @endsection
