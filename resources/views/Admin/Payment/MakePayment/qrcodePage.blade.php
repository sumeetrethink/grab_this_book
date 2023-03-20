<!DOCTYPE html>
<html>

<head>
    <script type="text/javascript">
        BASE_URL = "<?php echo url(''); ?>";
    </script>
    <title>QR Code and Payment Details</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <!-- Bootstrap JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>
<style>
    .well {
        background-color: #1f1f1e;
        border-color: #010100;
        border-radius: 10px;
        color: white;

    }
</style>

<body class="text-center">



    
    <title>Checkout - Plutus Pay</title>


    <br>
    <br>
    <br>
    <div class="container card  col-lg-10 col-11 ">
        <div class="row card-body ">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                <p>
                    <img class="checkout_icon" src="images/checkout_icon.png" alt=""> <h6 mt-4>{{ $activeUPI->id_upi }}</h6>
                </p>
                <br>
                <div class="well p-2">
                    
                    <hr class="hr1">
                    <p class="checkout_p1 font-weight-bold"><span class="pull-right">Amount</span></p>
                    <p class="checkout_p2">
                        

                        <div class="pull-right">
                            <i class="fa fa-inr " aria-hidden="true"></i>
                            <span class="" style="font-size: 24px"> ₹ {{ $paymentDetails->amount }}</span>
                        </div>
                    </p>
                    
                </div>
                @php
                    $amount = $paymentDetails->amount;
                    $upiId = $activeUPI->id_upi;
                    $name = $activeUPI->upi_name;
                    $description = `Payment`;
                    
                    $url = 'upi://pay?pa=' . urlencode($upiId) . '&pn=' . urlencode($name) . '&tn=' . urlencode($description) . '&am=' . urlencode($amount) . '&cu=INR';
                    $qrCodeUrl = 'https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=' . urlencode($url);
                @endphp
                <div class="well well_qr_code" style="margin-top: 20px;">

                    <img style="    width: 80%;
                    height: auto;
                    margin: 20px;"
                        class="img-responsive center-block" src="{{ $qrCodeUrl }}" title="Scan &amp; Pay">
                </div>
                <p class="timer_p mt-3" style="font-size: 14px">This session will expire in <span id="time" class="font-weight-bold">00:31</span> minutes</p>
                <p class="checkout_go_back"><a class="checkout_go_back_a" href="#"
                    onclick="history.go(-1); return false;"><i class="fa fa-chevron-left"
                        aria-hidden="true"></i> Go Back</a></p>
            </div>
        </div>
    </div>
    <script>
        function clearPaymentSession() {
            $.ajax({
                url: BASE_URL +
                    "/payment/clear-session",
                success: function(data) {
                    location.reload();
                },
            });
        }

        function countdownAndReload() {
            let countdownTime = 30;
            let countdownEl = document.getElementById('time');

            let countdownInterval = setInterval(function() {
                let minutes = Math.floor(countdownTime / 60);
                let seconds = countdownTime % 60;

                countdownEl.innerHTML = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

                countdownTime--;

                if (countdownTime < 0) {
                    clearInterval(countdownInterval);
                    clearPaymentSession()

                }
            }, 1000);
        }
        countdownAndReload()
    </script>





</body>

</html>
