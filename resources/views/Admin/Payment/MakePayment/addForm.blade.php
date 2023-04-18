<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Make Payment</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        body {
            overflow: hidden;
        }

        .main-div {
            margin: 10px;
        }

        .input-form {
            width: 100%;
            margin-bottom: 20px;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }
    </style>
</head>

<body>
    {{-- <div class="container mt-5"
        style="position: absolute;top:50%;left:50%;transform: translate(-50%,-50%);background: rgb(202, 202, 202);padding: 30px;border-radius: 20px">
        <div class="row ">
            <div class="col-md-12">
                <h3>Payment Details</h3>

                <form accept="{{url('/payment/add')}}" method="POST">
                    @csrf
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputName">Name</label>
                            <input type="text" class="form-control" name="name" placeholder="John Doe">
                            @error('name')
                            <span  class="text-danger">{{$message}}</span>
                                
                            @enderror
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputCardNumber">Phone Number</label>
                            <input name="phone" type="number" class="form-control" id="phone"
                                placeholder="70172239922">
                                @error('phone')
                                <span  class="text-danger">{{$message}}</span>
                                    
                                @enderror
                        </div>
                    </div>

                    <div class="form-row">

                        <div class="form-group col-md-4">
                            <label for="inputState">State</label>
                            <select id="inputState" class="form-control" name="state">
                                <option value="0" selected>---Choose---</option>
                                @foreach ($states as $item)
                                    <option value="{{ $item->id }}">{{ $item->name }}</option>
                                @endforeach
                            </select>
                            @error('state')
                            <span  class="text-danger">{{$message}}</span>
                                
                            @enderror
                        </div>

                        <div class="form-group col-md-2">
                            <label for="inputZip">Amount</label>
                            <input name="amount" type="number" class="form-control" id="inputZip"
                                placeholder="10001">
                                @error('amount')
                                <span  class="text-danger">{{$message}}</span>
                                    
                                @enderror
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit Payment</button>
                </form>
            </div>

        </div>

    </div> --}}
    <br>
    <section class="main-div col-lg-10 col-11  card m-auto" >
        <div class="card-body">
        <form accept="{{ url('/payment/add') }}" method="POST">
            @csrf
            <input  type="hidden" name="adminId" value="{{$AdminId}}">






            <div class="col-50">
                <h3>Payment</h3>
                <label for="fname">UPI Payment</label>
                <div class="icon-container">
                    <i class="fa fa-cc-visa" style="color:navy;"></i>
                    <i class="fa fa-cc-amex" style="color:blue;"></i>
                    <i class="fa fa-cc-mastercard" style="color:red;"></i>
                    <i class="fa fa-cc-discover" style="color:orange;"></i>
                </div>


            </div>
            <div class="m-auto">
                <div class="form-group ">
                    <label for="inputName" class="mt-4">Name</label>
                    <input type="text" class="form-control" name="name" placeholder="John Doe">
                    @error('name')
                        <span class="text-danger">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group ">
                    <label for="inputCardNumber">Phone Number</label>
                    <input name="phone" type="number" class="form-control" id="phone" placeholder="70172239922">
                    @error('phone')
                        <span class="text-danger">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-group ">
                    <label for="inputState">State</label>
                    <select id="inputState" class="form-control" name="state">
                        <option value="0" selected>---Choose---</option>
                        @foreach ($states as $item)
                            <option value="{{ $item->id }}">{{ $item->name }}</option>
                        @endforeach
                    </select>
                    @error('state')
                        <span class="text-danger">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-group ">
                    <label for="inputZip">Amount</label>
                    <input name="amount" type="number" class="form-control" id="inputZip" placeholder="10001">
                    @error('amount')
                        <span class="text-danger">{{ $message }}</span>
                    @enderror
                </div>


            </div>


            <input type="submit" value="PAY" class="btn btn-success form-control">
        </form>
    </div>
    </section>

</body>

</html>
