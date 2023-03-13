//  type should be pass to this function  same as given below

// Accepted
// Rejected
// Initiated

function changeStatuue(id, type) {
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
