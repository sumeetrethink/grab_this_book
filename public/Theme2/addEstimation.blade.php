@extends('Admin.index', ['title' => 'Add Estimation'])
@section('content')
    <section class="content">
        <div class="content-header">
            <div class="container-fluid">
                <h5>Add Estimation</h5>
              
            </div>
        </div>
        <form action="{{ url('software/estimation/add') }}" method="POST">
            @csrf
            <section class="content">
                <div class="card">
                    <div class="card-body">
                        <div class="box-body">
                            <h3 class="text-center">Main Details</h3>
                    
                            <div class="row ">
                                <div class="col-xs-12 col-md-3">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Search Customer</label>
                                        <div class="searching d-flex align-items-center  ">
                                            <input class="form-control col-md-10 " id="searchCustomerSalesInput"
                                                placeholder="Search customer by phone no.">
                                            <button type="button" onclick="searchCustomerSales()"
                                                class="btn btn-success ml-2 mr">Search</button>
                                        </div>
                                        <span class="text-danger">
                                            @error('CustomerPhone')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-md-3 ml-4">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Product Category<span
                                                style="color:red">*</span></label>
                                        <select id="estimationMainCategory" class="form-control"
                                            aria-label="Default select example" name="ProductCategory">
                                            <option value="0">--Select--</option>
                                            @foreach ($productCategory as $cat)
                                                <option value="{{ $cat->iProdCategoryID }}">{{ $cat->vProdCategory }}
                                                </option>
                                            @endforeach
                                        </select>
                                        <span class="text-danger">
                                            @error('ProductCategory')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-md-3 ml-4">
                                    <div class="fomr-group">
                                        <label for="exampleInputEmail1">Bill No.<span style="color:red">*</span></label>
                                        <input name="BillNo" class="form-control col-md-10 " readonly
                                            value={{ $count }}>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="customerInputAjax"></div>
                            <hr>
                            {{-- here product renders --}}
                            <div class="bg-light pt-3 px-3">
                                <h4 class="text-center">Product Details</h4>
                                <div id="productWrapper">
                                    <div class=" row"id="MainProductDetails">
                                    </div>
                                    <div id="EstimateProductForm" class="row">
                                    </div>
                                </div>



                                <hr />
                            </div>
                            <div class="row">
                                <div class="col-md-2">
                                    <button type="button" class="btn btn-primary" onclick="appendEstimateForm()">Add</button>
                                        <button type="button" class="btn btn-danger" onclick="removeEstimateblock()">Remove</button>
                                </div>
                            </div>





                            <h3 class="text-center">Grand Total</h3>
                            <div class="row">
                                <div class="col-xs-12 col-md-3 ">
                                    <div class="form-group">
                                        <label for="">Grand Total </label>
                                        <input name="GrandAmount" class="form-control col-md-10" type="number" step=any
                                            readonly id="GrandTotal" placeholder="00">
                                            <span class="text-danger">
                                                @error('GrandAmount')
                                                    {{ $message }}
                                                @enderror
                                            </span>
                                    </div>
                                </div>



                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-md-3 ">

                                    <button type="submit" class="btn btn-success">Save
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    </section>
@endsection
