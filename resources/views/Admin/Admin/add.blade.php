@extends('Admin.index',['title'=>'Add Admin'])
@section('content')
<div class="content-header">
   <div class="container-fluid">
 
 </div>
 </div>
<section class="content">
<div class="card">
   <center>
      <h3 style="background-color:silver;padding: 5px;margin: 5px;">Add Admin</h3>
   </center>
   <div class="card-body">
      <form action="{{url('/admin/add')}}" method="POST">
         @csrf
         <div class="row">
               
               <div class="form-group col-3">
                  <label for="exampleInputEmail1">Admin Name<span style="color:red">*</span></label>
                  <input  type="text" name="name" value=""  class="form-control" data-validation="required" placeholder="Name">
                  @error('name')
                  {{$message}}
               @enderror
               </div>
               <div class="form-group col-3">
                  <label for="exampleInputEmail1">Username<span style="color:red">*</span></label>
                  <input  type="text" name="username" value=""  class="form-control" data-validation="required" placeholder="Username">
                  @error('username')
                  {{$message}}
               @enderror
               </div>
               <div class="form-group col-3">
                  <label for="exampleInputEmail1">Password<span style="color:red">*</span></label>
                  <input  type="text" name="password" value=""  class="form-control" data-validation="required" placeholder="*********">
                  @error('password')
                  {{$message}}
               @enderror
               </div>
               <div class="form-group col-3">
                  <label for="exampleInputEmail1">Confirm Password<span style="color:red">*</span></label>
                  <input  type="password" name="confirmPassword" value=""  class="form-control" data-validation="required" placeholder="*********">
                  @error('confirmPassword')
                  {{$message}}
               @enderror
               </div>
            
         </div>
        
        <button type="submit" class="btn btn-success">Add</button>
            
            
      </form>
   </div>
</div>
@endsection