@extends('Admin.index',['title'=>'Add Dealer'])
@section('content')
<div class="content-header">
   <div class="container-fluid">
 
 </div>
 </div>
<section class="content">
<div class="card">
   <center>
      <h3 style="background-color:silver;padding: 5px;margin: 5px;">ADD UPI ID</h3>
   </center>
   <div class="card-body">
      <form action="{{url('/upi/add')}}" method="POST">
         @csrf
         <div class="row">
            <div class="col-xs-12 col-md-4">
               <div class="form-group">
                  <label for="exampleInputEmail1">UPI Name<span style="color:red">*</span></label>
                  <input  type="text" name="upi_name" value=""  class="form-control" data-validation="required">
                  @error('upi_name')
                  {{$message}}
               @enderror
               </div>
            </div>
            <div class="col-xs-12 col-md-4">
               <div class="form-group">
                  <label for="exampleInputEmail1">UPI ID<span style="color:red">*</span></label>
                  <input type="text" name="upi_id" value="" id="upi_id" placeholder="Please provide username" data-errortext="This is dealer's username!" class="form-control numberOnly" data-validation="required">
                  @error('upi_id')
                     {{$message}}
                  @enderror
               </div>
            </div>
            {{-- <div class="col-xs-12 col-md-4">
               <div class="form-group">
                  <label for="exampleInputEmail1">Amout Limit</label>
                  <input type="text" name="upi_limit" value="" id="upi_limit" placeholder="Please provide GST number" class="form-control numberOnly">
               </div>
            </div> --}}
         </div>
        
        <button type="submit" class="btn btn-success">Add</button>
            
            
      </form>
   </div>
</div>
@endsection