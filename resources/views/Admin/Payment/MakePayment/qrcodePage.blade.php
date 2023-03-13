<!DOCTYPE html>
<html>

<head>
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

<body>
    <pre>shakti0traders@ibl</pre>



    <title>Checkout - Plutus Pay</title>


    <br>
    <br>
    <br>
    <div class="container">
        <div class="row">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                <p>
                    <img class="checkout_icon" src="images/checkout_icon.png" alt=""> <span
                        class="checkout_merchant_name">BharatPe Merchant </span>
                </p>
                <br>
                <div class="well p-2">
                    <p class="checkout_go_back"><a class="checkout_go_back_a" href="#"
                            onclick="history.go(-1); return false;"><i class="fa fa-chevron-left"
                                aria-hidden="true"></i> Go Back</a></p>
                    <hr class="hr1">
                    <p class="checkout_p1">Timestamp<span class="pull-right">Amount</span></p>
                    <p class="checkout_p2">


                        <span class="pull-right">
                            <i class="fa fa-inr" aria-hidden="true"></i>
                            {{ $amount }}
                        </span>
                    </p>
                </div>
                <!--  <p class="loader_p">
                  <img class="img-responsive loader_img" src="images/loader.gif" alt="">
                  <span class="loader_text">Processing payment</span>
                  <br>
                  <span class="loader_text_des">Dont refresh or hit back</span>
                  </p> -->
                <div class="well well_qr_code" style="margin: auto;">
                    <img class="img-responsive center-block"
                        src="https://chart.googleapis.com/chart?chs=400x400&amp;cht=qr&amp;chco=1f1f1e&amp;chl=upi%3A%2F%2Fpay%3Fpa%3Dshakti0traders%40ibl%26pn%3DBharatPe+Merchant%26am%3D100%26tn%3DPP193%26cu%3DINR%26mc%3D5411&amp;choe=UTF-8"
                        title="Scan &amp; Pay">
                </div>
                <p class="timer_p">This session will expire in <span id="time">00:56</span> minutes</p>

            </div>
        </div>
    </div>
    <script type="text/javascript">
        setTimeout(function() {
            window.location.href = "";
        }, 59001);

        function startTimer(duration, display) {
            var timer = duration,
                minutes, seconds;
            setInterval(function() {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (--timer < 0) {
                    timer = duration;
                }
            }, 1000);
        }

        window.onload = function() {
            var twoMinutes = 8,
                display = document.querySelector('#time');
            startTimer(twoMinutes, display);
        };

        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    </script>





</body>

</html>
