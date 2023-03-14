@extends('Admin.index', ['title' => 'Get This Book | Dashboard'])
@section('content')
    <div class="container-fluid">
        <!-- Page Heading -->
        <div class="content-header">
            <div class="container-fluid">
                <h5>Dashboard</h5>
            </div>
        </div>
        <section class="content {{ session()->has('Salesman') ? 'd-none' : '' }}">
            <div class="box-body">
                <div class="row">
                    <div class="col-lg-3 col-6 ">
                        <!-- small box -->
                        <div class="small-box bg-info ">
                            <div class="inner">
                                <h3>{{$inititatedPayments->count() ?? 0}}</h3>
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
                                <h3>{{$inititatedPayments->count() ?? 0}}</h3>
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
                                <h3>{{$Acceptedpayments->count() ?? 0}}</h3>
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
                                <h3>{{$RejectedPayments->count() ?? 0}}</h3>
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
    @endsection
