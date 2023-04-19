@extends('Admin.index',['title'=>isset($user)?"Edit":'Add'])
@section('content')
<div class="content-header">
   <div class="container-fluid">
 
 </div>
 </div>
<section class="content">
<div class="card">
   <center>
      <h3 style="background-color:silver;padding: 5px;margin: 5px;">{{isset($user)?"Edit Admin":'Add Admin'}}</h3>
   </center>
   <div class="card-body">
      <form action="{{isset($user)?url('admin/edit'):url('admin/add')}}" method="POST">
         @csrf
         <div class="row">
               <input type="hidden" name="userId" value="{{isset($user)?$user->id:''}}">
               <div class="form-group col-3">
                  <label for="exampleInputEmail1">Admin Name<span style="color:red">*</span></label>
                  <input  type="text" name="name" value="{{isset($user)?$user->name:old('name')}}"  class="form-control" data-validation="required" placeholder="Name">
                  @error('name')
                  {{$message}}
                  @enderror
               </div>
               <div class="form-group col-3">
                  <label for="exampleInputEmail1">Username<span style="color:red">*</span></label>
                  <input  type="text" name="username" value="{{isset($user)?$user->username:old('username')}}"  class="form-control" data-validation="required" placeholder="Username">
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
        
        <button type="submit" class="btn btn-success">{{isset($user)?"Update":'Edit'}}</button>
            
            
      </form>
   </div>
</div>
@endsection