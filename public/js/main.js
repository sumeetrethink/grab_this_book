//  type should be pass to this function  same as given below
// Accepted
// Rejected
// Initiated
function changeStatuue(id, type) 
{
    $.ajax({
        url:
            BASE_URL +
            "/payment/change-status?payment_id=" +
            id +
            "&type=" +
            type,
        success: function (data) {
            location.reload();
        },
    });
}

//                     common payment revert  funciton

function revertPayment(id) 
{
    $.ajax({
        url:
            BASE_URL +
            "/payment/revert?payment_id=" +
            id ,
        success: function (data) {
            location.reload();
        },
    });
}
//                     payment export ajax
function Paymentexport(type) 
{
    $.ajax({
        url:
            BASE_URL +
            "/payment/export?type=" +
            type ,
        success: function (data) {
         
        },
    });
}