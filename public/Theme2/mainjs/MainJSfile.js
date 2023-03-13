//Add Purchase Payment Code Start
function PurchasePaymentType() {
  const totalRows = countTotalPurchasePaymentRows();
 for (let i = 0; i < totalRows; i++) {
      let PaymentTypeType = $(`#iPaymentTypeID-${i} option:selected`).data('id');
       if (PaymentTypeType == "CASH") {
        $(`#rate-section-${i}`).show();
        $(`#totalPaidAmount-${i}`).show();
        $(`#metal-section-${i}`).hide();
        $(`#gst-section-${i}`).hide();
        $(`#IGST-section-${i}`).hide();
      }else if (PaymentTypeType == "METAL" ) {
        $(`#metal-section-${i}`).show();
        $(`#rate-section-${i}`).hide();
        $(`#totalPaidAmount-${i}`).hide();
         $(`#gst-section-${i}`).hide();
        $(`#IGST-section-${i}`).hide();
      }else if (PaymentTypeType == "BANK" || PaymentTypeType == "UPI" ) {
        $(`#gst-section-${i}`).show();
        $(`#IGST-section-${i}`).show();
        $(`#rate-section-${i}`).show();
        $(`#totalPaidAmount-${i}`).show();
        $(`#metal-section-${i}`).hide(); 
      }
    }
}

$('input#IGST-0').on('click', function() {
  const totalRows = countTotalPurchasePaymentRows();
  for (let i = 0; i < totalRows; i++) {
      let IGSTChecked=$("#IGST-${i}").is(":checked");
      
      if (IGSTChecked == "true") {
         $("#IGST-section-${i}").show();
         $("#gst-section-${i}").hide();
      }else{
         $("#IGST-section-${i}").show();
         $("#gst-section-${i}").hide();
      }
       
      let IgstSelected = $('#IgstSelected-${i}').val();
    }

});
//Calculation for purchase payment
function purchasePaymentCalculation() {
  const totalRows = countTotalPurchasePaymentRows();
    let purchasePureWt = $(`#PurchaseModulePure`).val();

 for (let i = 0; i < totalRows; i++) {
      let IGSTChecked=$(`#IGST-${i}`).is(":checked");
      let pureWeight = $(`#pureWeight-${i}`).val();
      let rateAmount = $(`#rateAmount-${i}`).val();
      let PaymentTypeType = $(`#iPaymentTypeID-${i} option:selected`).data('id');

      //CASH CALCULATION
      if (PaymentTypeType == 'CASH') {
        totalpaidAmount = pureWeight * rateAmount ;
        $(`#paidAmount-${i}`).val(totalpaidAmount);
      }

      //BANK CALCULATION
      if (PaymentTypeType == 'BANK' || PaymentTypeType == 'UPI') {
        totalpaidAmount = pureWeight * rateAmount ;
         
         if (IGSTChecked == true) {
             IGST = (totalpaidAmount * 3) / 100;
             totalpaidAmount = totalpaidAmount + IGST ; 
             $(`#IGSTinput-${i}`).val(IGST); 
             
         }else{
             CGST = (totalpaidAmount * 1.5) / 100;
             SGST = (totalpaidAmount * 1.5) / 100;
             totalpaidAmount = totalpaidAmount + CGST + SGST ;
             $(`#CGST-${i}`).val(CGST);
             $(`#SGST-${i}`).val(SGST);
         }
        
        $(`#paidAmount-${i}`).val(totalpaidAmount); 
        
      }

        //MEATAL CALCULATION
        if (PaymentTypeType == 'METAL') {
           let netWt = $(`#netWt-${i}`).val();
          // let touch = $(`#touch-${i}`).val();
           let touchName = $(`#touch-${i}`).val();
           //alert(touchName);
           let PureWt = $(`#PureWt-${i}`).val();
         
           pureWtandNetWt = netWt * touchName;
           pureWts = pureWtandNetWt / 100;

           $(`#PureWt-${i}`).val(pureWts);
           $(`#pureWeight-${i}`).val(pureWts);
        } 

         //Pending purchase pure wt Calculation
            let pureWeightTest = $(`#pureWeight-${i}`).val();
            purchasePureWt = purchasePureWt - pureWeightTest;
           $(`#pendingPurchasePureWt-${i}`).val(purchasePureWt);
      }    
}
function countTotalPurchasePaymentRows(){
   const pcodes = $(".purchasePaymentRowSection");
   return pcodes.length;
}

//Add purchase calculation code start
function addPurchaseCaculation(){
   let GrossWeight = $('#GrossWeight').val();
   let LessWeight = $('#LessWeight').val();
   let caratVal = $('#caratSelect option:selected').text();
   let purchaseWastage = $('#PurchaseModuleWastage').val();
   let purchaseNetWt = $('#PurchaseModuleNW').val();

   totalNetWt = GrossWeight - LessWeight;
   $('#PurchaseModuleNW').val(totalNetWt);

   carat = caratVal / 10; //like 916  ans = 91.6 
   if (purchaseWastage) {
      caratandpurWt =  parseFloat(carat) + parseFloat(purchaseWastage) ;
   }else{
      caratandpurWt =  parseFloat(carat) ;
   }
   
   //alert(caratandpurWt);
   Pure = (purchaseNetWt * caratandpurWt) / 100;
 
   $('#pureWeight-0').val(Pure);

   $('#PurchaseModulePure').val(Pure);
}
//Add purchase calculation code end

function purchasePaymentAddNewBtn() {
    genereratePurchasePaymentSection();
}
function generatePurchasePaymentBlock(index) {
  $.ajax({
    url: BASE_URL + "/getPurchasePaymentHtmlForm?index=" + index,
    success: function (data) {
      //console.log(data);
      $("#purchase-payment-main").append(data);
    },
  });
}
function countTotalPurchasePaymentRows(){
   const pcodes = $(".purchasePaymentRowSection");
   return pcodes.length;
}

function genereratePurchasePaymentSection()
{
  let totalRows=countTotalPurchasePaymentRows();
  $("#purchase-payment-main").append(generatePurchasePaymentBlock(totalRows));
}

//Add Purchase Payment Code End

/////////////////// Add Sales Payment Code Start ///////////////////
function SalesPaymentType() {
  
const totalRows = countTotalPaymentRows();
 for (let i = 0; i < totalRows; i++) {
      let PaymentTypeType = $(`#iPaymentTypeID-${i} option:selected`).data('id');
       if (PaymentTypeType == "CASH") {
        $(`#rate-section-${i}`).show();
        $(`#totalPaidAmount-${i}`).show();
        $(`#metal-section-${i}`).hide();
      }else if (PaymentTypeType == "METAL" ) {
        $(`#metal-section-${i}`).show();
        $(`#rate-section-${i}`).hide();
        $(`#totalPaidAmount-${i}`).hide();
      }else if (PaymentTypeType == "BANK" || PaymentTypeType == "UPI" ) {
        $(`#rate-section-${i}`).show();
        $(`#totalPaidAmount-${i}`).show();
        $(`#metal-section-${i}`).hide(); 
      }
    }
      
}

function salesPaymentCalculation() {
  const totalRows = countTotalPaymentRows();
   let grandTotal = $(`#GrandTotal`).val();
  //let amountNew = 
 for (let i = 0; i < totalRows; i++) {
      let Amount = $(`#amount-${i}`).val();
      let paidAmount = $(`#paidAmount-${i}`).val();
      let PaymentTypeType = $(`#iPaymentTypeID-${i} option:selected`).data('id');
      let netWt = $(`#netWt-${i}`).val();
      //let touchId = $(`#touch-${i}`).val();
      let touch = $(`#touch-${i}`).val();
      let rate = $(`#rate-${i}`).val();
      let metalpaidAmount = $(`#metalpaidAmount-${i}`).val();

      //CASH CALCULATION
      if (PaymentTypeType == 'CASH') {
          $(`#paidAmount-${i}`).val(Amount);
      }

      //BANK CALCULATION
      if (PaymentTypeType == 'BANK') {
             $(`#paidAmount-${i}`).val(Amount);    
      }
      if (PaymentTypeType == 'UPI') {
             $(`#paidAmount-${i}`).val(Amount);    
      }
      //METAL CALCULATION
      if (PaymentTypeType == 'METAL') {
          PureWtTotal = (netWt * touch); 
          totalPureWt  = PureWtTotal / 100;
          $(`#PureWt-${i}`) .val(totalPureWt);

          metalpaidAmount = totalPureWt * rate;
          $(`#metalpaidAmount-${i}`) .val(metalpaidAmount);
          $(`#amount-${i}`) .val(metalpaidAmount);
      }
 

      //Pending Amount Calculation
      let AmountTest = $(`#amount-${i}`).val();
      grandTotal = grandTotal - AmountTest;
      $(`#pendingPaymentAmount-${i}`).val(grandTotal);

  }
   
 
}

function salesPaymentAddNewBtn() {
    genereratePaymentSection();
}
function generatePaymentBlock(index) {
  $.ajax({
    url: BASE_URL + "/getSalesPaymentHtmlForm?index=" + index,
    success: function (data) {
      //console.log(data);
      $("#sales-payment-main").append(data);
    },
  });
}
function countTotalPaymentRows(){
   const pcodes = $(".salesPaymentRowSection");
   return pcodes.length;
}
function genereratePaymentSection()
{
  let totalRows=countTotalPaymentRows();
//console.lol(generatePaymentBlock(totalRows));
  $("#sales-payment-main").append(generatePaymentBlock(totalRows));
}


/////////////////// Add Sales Payment Code End ///////////////////


// class for number only input
$(".numberOnly").on("keypress keyup blur", function(e) {
  $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
  if ((e.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
      event.preventDefault();
  }
});
// 
$("form").bind("keypress", function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    return false;
  }
});

var closeButton = document.getElementById("close-button");
function showProductImage(image) {
  var fullSizeImage = document.getElementById("full-size-image");
  fullSizeImage.src = image.src;
  fullSizeImage.style.display = "block";
  closeButton.style.display = "block";
  document.getElementById("overlay").style.display = "block";
}
function closeFullSize () {
  var fullSizeImage = document.getElementById("full-size-image");
  fullSizeImage.style.display = "none";
  closeButton.style.display = "none";
  document.getElementById("overlay").style.display = "none";
};
function closeFullImage() {
  $("#imageNameForFullPreview").hide();
}

// estimation work starts
function getTotalEstimateRows() {
  const count = $(".estimateGrossWt");
  return parseInt(count.length);
}
function removeEstimateblock(index) {
  const rows = getTotalEstimateRows() - 1;
  if (rows === 0) return;
  else {
    $(`#product-${rows}`).remove();
  }
}
function appendEstimateForm() {
  let val = parseInt($("#estimationMainCategory").val());
  const index = getTotalEstimateRows();
  if (val !== 0) {
    $(`product-${index}`).append(generateEtsimateForm(val, index));
  } else {
    alert("Please Select Category");
  }
}
function replaceEstimationRows(catId) {
  $.ajax({
    url: BASE_URL + "/estimateCatForm?id=" + catId + "&index=" + 0,
    success: function (data) {
      $("#productWrapper").html(data);
    },
  });
}

$("#estimationMainCategory").on("change", function () {
  let val = $("#estimationMainCategory").val();
  const index = getTotalEstimateRows();
  if (index > 0) {
    clear = confirm(
      "This will clear all the existing rows. Are you sure you want to change the Product Category?"
    );

    if (clear) {
      replaceEstimationRows(val);
    }
  } else generateEtsimateForm(val, index);
});
function generateEtsimateForm(id, index) {
  $.ajax({
    url: BASE_URL + "/estimateCatForm?id=" + id + "&index=" + index,
    success: function (data) {
      $("#productWrapper").append(data);
    },
  });
}
function calculateEstimateInvoice() {
  const totalRows = getTotalEstimateRows();
  let makingCharges = 0;

  let grossTotal = 0;
  for (let i = 0; i < totalRows; i++) {
    const netWeight1 = $(`#net_weight_1_${i}`).val()
      ? Number($(`#net_weight_1_${i}`).val())
      : null;
    console.log(netWeight1);
    const productRate1 = $(`#product_rate_1_${i}`).val()
      ? Number($(`#product_rate_1_${i}`).val())
      : null;
    if (!netWeight1 || !productRate1) return;
    const productAmount1 = netWeight1 * productRate1;
    $(`#product_amount_1_${i}`).val(productAmount1);

    const makingCharge = $(`#making_charge_${i}`).val()
      ? Number($(`#making_charge_${i}`).val())
      : 0;

    makingCharges += makingCharge;
    grossTotal += productAmount1;

    const netWeight2 = $(`#net_weight_2_${i}`).val()
      ? Number($(`#net_weight_2_${i}`).val())
      : null;

    const productRate2 = $(`#product_rate_2_${i}`).val()
      ? Number($(`#product_rate_2_${i}`).val())
      : null;
    if (netWeight2 && productRate2) {
      const productAmount2 = netWeight2 * productRate2;
      $(`#product_amount_2_${i}`).val(productAmount2);
      grossTotal += productAmount2;
    }
    const netWeight3 = $(`#net_weight_3_${i}`).val()
      ? Number($(`#net_weight_3_${i}`).val())
      : null;
    const productRate3 = $(`#product_rate_3_${i}`).val()
      ? Number($(`#product_rate_3_${i}`).val())
      : null;
    if (netWeight3 && productRate3) {
      const productAmount3 = netWeight3 * productRate3;
      $(`#product_amount_3_${i}`).val(productAmount3);
      grossTotal += productAmount3;
    }
  }
  grossTotal += makingCharges;

  const grandTotal = grossTotal;

  $("#GrandTotal").val(grandTotal.toFixed(2));
}

function deleteEstimation(id) {
  $("#modal-default").modal("show");
  $("#deleteEstimationInput").val(id);
}
function serchEstimation(
  estimationFrom,
  estimationTo,
  estimationCusName,
  estimationCusNo,
  page,
  sort_by,
  sort_type
) {
  $.ajax({
    url:
      BASE_URL +
      "/estimationFilter?estimationFrom=" +
      estimationFrom +
      "&estimationTo=" +
      estimationTo +
      "&estimationCusName=" +
      estimationCusName +
      "&estimationCusNo=" +
      estimationCusNo +
      "&page=" +
      page +
      "&sortBy=" +
      sort_by +
      "&sort_type=" +
      sort_type,

    success: function (data) {
      $("#estimationTable").html(data);
    },
  });
}
function estimationfilter() {
  let from = $("#estimationFromDateFilter").val();
  let to = $("#estimationtodateFilter").val();
  let customername = $("#estimationCustomerNameFilter").val();
  let customerPhone = $("#estimationcustomerPhoneFilter").val();

  let page = $("#hidden_estimation_page").val();
  let sortby = $("#hidden_estimation_column_name").val();
  let sort_type = $("#hidden_estimation_sort_type").val();
  serchEstimation(
    from,
    to,
    customername,
    customerPhone,
    page,
    sortby,
    sort_type
  );
}
function exportEstimation() {
  let from = $("#estimationFromDateFilter").val();
  let to = $("#estimationtodateFilter").val();
  let customername = $("#estimationCustomerNameFilter").val();
  let customerPhone = $("#estimationcustomerPhoneFilter").val();



  window.location=
    BASE_URL +
      "/estimation-export?estimationFrom=" +
      from +
      "&estimationTo=" +
      to +
      "&estimationCusName=" +
      customername +
      "&estimationCusNo=" +
      customerPhone 
  ;
}
// estimation work ends

let rateTodayCount = parseFloat($("#hiddenRatecount").val());

if (rateTodayCount <= 0) {
  $("#rateCountPopUP").modal("show");
}
function notAddtodayRate() {
  $("#rateCountPopUP").modal("hide");
}

// tax module

function filterTaxGST() {
  let to = $("#GSTtodateFilter").val();

  let from = $("#GSTFromDateFilter").val();
  $.ajax({
    url: BASE_URL + "/filtergst?from=" + from + "&to=" + to,
    success: function (data) {
      $("#gstReplace").html(data);
    },
  });
}
function filterTaxSales() {
  let from = $("#TaxsalesFromDateFilter").val();
  let to = $("#TaxsalestodateFilter").val();
  let page = $("#hidden_taxsales_page").val();
  let sortby = $("#hidden_taxsales_column_name").val();
  let sort_type = $("#hidden_taxsales_sort_type").val();
  $.ajax({
    url:
      BASE_URL +
      "/filterTaxSale?page=" +
      page +
      "&sortby=" +
      sortby +
      "&sort_type=" +
      sort_type +
      "&from=" +
      from +
      "&to=" +
      to,
    success: function (data) {
      $("#TaxSalesTable").html(data);
    },
  });
}
function filterTaxPurchase() {
  let from = $("#TaxPurchaseromDateFilter").val();
  let to = $("#TaxPurchaseodateFilter").val();
  let page = $("#hidden_taxpurchase_page").val();
  let sortby = $("#hidden_taxpurchase_column_name").val();
  let sort_type = $("#hidden_taxpurchase_sort_type").val();
  // alert(page + from + to + sortby + sort_type);
  $.ajax({
    url:
      BASE_URL +
      "/filterTaxPurhcase?page=" +
      page +
      "&sortby=" +
      sortby +
      "&sort_type=" +
      sort_type +
      "&from=" +
      from +
      "&to=" +
      to,
    success: function (data) {
      $("#TaxPurhcaseTable").html(data);
      console.log(data);
    },
  });
}

// expense module

$("#SearchExpense").on("keyup", function () {
  let search = $(this).val();
  let page = $("#hidden_expense_page").val();
  let sort_by = $("#hidden_expense_column_name").val();
  let sort_type = $("#hidden_expense_sort_type").val();

  searchExpenseAjax(page, sort_by, sort_type, search);
});

function searchExpenseAjax(page, sortby, sort_type, search) {
  $.ajax({
    url:
      BASE_URL +
      "/filterExpense?page=" +
      page +
      "&sortby=" +
      sortby +
      "&sort_type=" +
      sort_type +
      "&search=" +
      search,
    success: function (data) {
      $("#expenseTable").html(data);
    },
  });
}
function delteExpense(id) {
  $("#modal-default").modal("show");
  $("#deleteExpenseinput").val(id);
}

// expense type module
function deleteExpenseType(id) {
  $("#modal-default").modal("show");
  $("#deleteExpenseTypeinput").val(id);
  // alert('hello')
}

// box list module
function deleteBoxList(id) {
  $("#modal-default").modal("show");
  $("#deleteBoxinput").val(id);
 //alert('hello')
}

// rate module  price change functoins

function RatepremiumFun(id) {
  if (parseFloat($("#Gold999Value").val())) {
    let premiumVal = parseFloat($("#premium-" + id).val());
    let Inputvalue = parseFloat($("#Gold999Value").val());
    let CaratValue = parseFloat($("#name-" + id).val());
    let calculation = ((CaratValue / 10 + premiumVal) * Inputvalue) / 100;
    let setInputRate = $("#rate-" + id).val(calculation.toFixed(2));
  } else {
    alert("please fill value");
    let premiumVal = parseFloat($("#premium-" + id).val(""));
  }
}

function RatepremiumFunPla(id) {
  if (parseFloat($("#platinum999").val())) {
    let premiumVal = parseFloat($("#premium-" + id).val());
    let Inputvalue = parseFloat($("#platinum999").val());
    let CaratValue = parseFloat($("#name-" + id).val());
    let calculation = ((CaratValue / 10 + premiumVal) * Inputvalue) / 100;
    let setInputRate = $("#rate-" + id).val(calculation.toFixed(2));
  } else {
    alert("please fill value");
    let premiumVal = parseFloat($("#premium-" + id).val(""));
  }
}
function RatepremiumFunSilver(id) {
  if (parseFloat($("#platinum999").val())) {
    let premiumVal = parseFloat($("#premium-" + id).val());
    let Inputvalue = parseFloat($("#silver999").val());
    let CaratValue = parseFloat($("#name-" + id).val());
    let calculation = ((CaratValue / 10 + premiumVal) * Inputvalue) / 100;
    let setInputRate = $("#rate-" + id).val(calculation.toFixed(2));
  } else {
    alert("please fill value");
    let premiumVal = parseFloat($("#premium-" + id).val(""));
  }
}

function gold999Rate() {
  $(".gold_carat_actual_name").each(function () {
    let value = parseFloat($("#Gold999Value").val());
    var FullID = $(this).attr("id");
    var CaratValue = parseFloat($("#" + FullID).val());
    let SplitedID = FullID.split("-");
    let mainID = SplitedID[1];
    let calculation = ((CaratValue / 10) * value) / 100;
    if(CaratValue==999)
    {
      let setInputRate = $("#rate-" + mainID).val(value);

    }
    else
    {

      let setInputRate = $("#rate-" + mainID).val(calculation.toFixed(2));
    } 
  });
}

function platinum999Rate() {
  $(".platinum_carat_actual_name").each(function () {
    let value = parseFloat($("#platinum999").val());
    var FullID = $(this).attr("id");
    var CaratValue = parseFloat($("#" + FullID).val());
    let SplitedID = FullID.split("-");
    let mainID = SplitedID[1];
    let calculation = ((CaratValue / 10) * value) / 100;
    let setInputRate = $("#rate-" + mainID).val(calculation.toFixed(2));
  });
}

function silver999Rate() {
  $(".silver_carat_actual_name").each(function () {
    let value = parseFloat($("#silver999").val());
    var FullID = $(this).attr("id");
    var CaratValue = parseFloat($("#" + FullID).val());
    let SplitedID = FullID.split("-");
    let mainID = SplitedID[1];
    let calculation = ((CaratValue / 10) * value) / 100;
    let setInputRate = $("#rate-" + mainID).val(calculation.toFixed(2));
  });
}

// $("#filterRate").on("keyup", function () {
//   let search = $("#filterRate").val();
//   let page = $("#hidden_rate_page").val();
//   let sortby = $("#hidden_rate_column_name").val();
//   let sort_type = $("#hidden_rate_sort_type").val();

//   filterRateAJax(page, sort_type, sortby, search);
// });

function filterRates() {
let date=  $('#rateDate').val()
  $.ajax({
    url:
      BASE_URL +
      "/filterRates?date=" +date
   ,
    success: function (data) {
      $("#RateTable").html(data);
    },
  });
}

// custoemr module
function oncustomerIputSearch() {
  searchinput = $("#filterCustomersMo").val();
  page = $("#hidden_customer_page").val();
  columnName = $("#hidden_customer_column_name").val();
  sortBy = $("#hidden_customer_sort_type").val();

  filterCustomerModuleAjax(page, columnName, sortBy, searchinput);
}

$(".customerarrow").on("click", function () {
  var column_name = $(this).data("column_name");
  var order_type = $(this).data("sorting_type");
  var reverse_order = "";
  if (order_type == "asc") {
    $(this).data("sorting_type", "desc");
    reverse_order = "desc";
  } else {
    $(this).data("sorting_type", "asc");
    reverse_order = "asc";
  }
  $("#hidden_customer_column_name").val(column_name);
  $("#hidden_customer_sort_type").val(reverse_order);

  var page = $("#hidden_customer_page").val();
  var searchinput = $("#filterCustomersMo").val();

  filterCustomerModuleAjax(page, column_name, reverse_order, searchinput);
});
function filterCustomerModuleAjax(page, columnName, sortBy, searchInput) {
  $.ajax({
    url:
      BASE_URL +
      "/filterCustomer?page=" +
      page +
      "&sorttype=" +
      sortBy +
      "&sortby=" +
      columnName +
      "&search=" +
      searchInput,
    success: function (data) {
      $("#CustomerTableBody").html(data);
    },
  });
}

// customer module ends

// purchasemodule add work start
// purchase filter

function filterPurhcase() {
  let purchaseFrom = $("#productFromDateFilter").val();
  let purhcaseTo = $("#producttodateFilter").val();
  let PurhcaseType = $("#purhchaseTypeFilter").val();
  let CustomerID = $("#purchaseCustomerFilter").val();
  let DealersID = $("#PurhcaseDealerFilter").val();
  let BillNo = $("#purchaseFilterBillNO").val();
  var paymentStatus = $("#paymentStatusFilter").val();
  let page = $("#hidden_purchase_page").val();
  let column_name = $("#hidden_purchase_column_name").val();
  let order_type = $("#hidden_purchase_sort_type").val();

  purhcaseFilerAjax(
    paymentStatus,
    page,
    column_name,
    order_type,
    purchaseFrom,
    purhcaseTo,
    PurhcaseType,
    CustomerID,
    DealersID,
    BillNo
  );
}
// purhcase sorting
$(document).on("click", ".purchaseArrow", function () {
  var column_name = $(this).data("column_name");
  var order_type = $(this).data("sorting_type");

  var reverse_order = "";
  if (order_type == "asc") {
    $(this).data("sorting_type", "desc");
    reverse_order = "desc";
  } else {
    $(this).data("sorting_type", "asc");
    reverse_order = "asc";
  }
  let purchaseFrom = $("#productFromDateFilter").val();
  let purhcaseTo = $("#producttodateFilter").val();
  let PurhcaseType = $("#purhchaseTypeFilter").val();
  let CustomerID = $("#purchaseCustomerFilter").val();
  let DealersID = $("#PurhcaseDealerFilter").val();
  let BillNo = $("#purchaseFilterBillNO").val();

  $("#hidden_purchase_column_name").val(column_name);
  $("#hidden_purchase_sort_type").val(reverse_order);
  let page = $("#hidden_purchase_page").val();
  purhcaseFilerAjax(
    paymentStatus,
    page,
    column_name,
    order_type,
    purchaseFrom,
    purhcaseTo,
    PurhcaseType,
    CustomerID,
    DealersID,
    BillNo
  );
});

function purhcaseFilerAjax(
  paymentStatus,
  page,
  column_name,
  order_type,
  purchaseFrom,
  purhcaseTo,
  PurhcaseType,
  CustomerID,
  DealersID,
  BillNo
) {
  $.ajax({
    url:
      BASE_URL +
      "/purchaseFilter?page=" +
      page +
      "&column=" +
      column_name +
       "&paymentStatus=" +
      paymentStatus +
      "&order=" +
      order_type +
      "&purchaseFrom=" +
      purchaseFrom +
      "&purchaseTo=" +
      purhcaseTo +
      "&purchaseType=" +
      PurhcaseType +
      "&customerID=" +
      CustomerID +
      "&dealerID=" +
      DealersID +
      "&billNo=" +
      BillNo,

    success: function (data) {
      $("#PurhcaseTableBody").html(data);
    },
  });
}
// export purchase
function purhcaseExport()
{
  let purchaseFrom = $("#productFromDateFilter").val();
  let purhcaseTo = $("#producttodateFilter").val();
  let PurhcaseType = $("#purhchaseTypeFilter").val();
  let CustomerID = $("#purchaseCustomerFilter").val();
  let DealersID = $("#PurhcaseDealerFilter").val();
  let BillNo = $("#purchaseFilterBillNO").val();

  window.location =
    BASE_URL +
    "/purchase-export?purchaseFrom=" +
    purchaseFrom +
    "&purchaseTo=" +
    purhcaseTo +
    "&purchaseType=" +
    PurhcaseType +
    "&customerID=" +
    CustomerID +
    "&dealerID=" +
    DealersID +
    "&billNo=" +
    BillNo;

}
//    deleteing purchase

function deletePurchase(id) {
  {
    $("#modal-default").modal("show");
    $("#deletePurchaseInput").val(id);
    // alert('hello')
  }
}

$("#PaymentType").on("change", function () {
  if ($("#PaymentType").val() == 1) {
    $("#cashPaymentType").hide();
    $("#grandTotalForCustomerRow").show();
    $("#purchaseMetalPaymentType").hide();
  } else if ($("#PaymentType").val() == 2) {
    $("#grandTotalForCustomerRow").hide();
    $("#cashPaymentType").show();
    $("#purchaseMetalPaymentType").hide();
  } else if ($("#PaymentType").val() == 3) {
    $("#cashPaymentType").hide();
    $("#grandTotalForCustomerRow").hide();
    $("#purchaseMetalPaymentType").show();
  } else if ($("#PaymentType").val() == 0) {
    $("#cashPaymentType").hide();
    $("#grandTotalForCustomerRow").hide();
    $("#purchaseMetalPaymentType").hide();
  }
});

function setDealetBillNo(catId) {
  $.ajax({
    url: BASE_URL + "/getBillForDealer?catid=" + catId,

    success: function (data) {
      $("#DealerBillNO").html(data);
    },
  });
}

function replaceDealerPurchaseForm(catid) {
  $.ajax({
    url: BASE_URL + "/replacePurchaseDealerForm?catid=" + catid,

    success: function (data) {
      $("#replacePurchaseDealerForm").html(data);
    },
  });
}

$("#searchDealerInput").on("change", function () {
  let dealerID = $("#searchDealerInput").val();
  searchDealer(dealerID);
});
function searchDealer(dealerID) {
  $.ajax({
    url: BASE_URL + "/getDealerDeatils?dealerID=" + dealerID,

    success: function (data) {
      $("#dealerDetailsRow").html(data);
    },
  });
}

// ends

// purchase module caltulationfunctions
function purchaseMgoldRateChange() {
  let GldRate = parseFloat($("#PurchaseModuleGoldRate").val());
  let pureGold = parseFloat($("#PurchaseModulePure").val());

  GoldTotal = pureGold * GldRate;
  $("#PurchaseModuleGoldTotal").val(GoldTotal);

  OverallTotal = GoldTotal;
  $("#PurchaseOverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#PurchaseGrandTotal").val(GrandTotal);
}
// for Silver calculation
function purchaseMSilverRateChange() {
  let SilverRate = parseFloat($("#PurchaseModuleSilverRate").val());
  let PureSilver = parseFloat($("#PurchaseModulePureSilver").val());
  SilverTotal = PureSilver * SilverRate;

  $("#PurchaseModuleSilverTotal").val(SilverTotal);

  OverallTotal = SilverTotal;
  $("#PurchaseOverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#PurchaseGrandTotal").val(GrandTotal);
}
// for Platinum calculation
function purchaseMplatinumRateChange() {
  let PlatinumRate = parseFloat($("#PurchaseModulePlatinumRate").val());
  let PurePlatinum = parseFloat($("#PurchaseModulePurePlatinum").val());
  PlatinumTotal = PurePlatinum * PlatinumRate;
  $("#PurchaseModulePlatinumTotal").val(PlatinumTotal);

  OverallTotal = PlatinumTotal;
  $("#PurchaseOverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#PurchaseGrandTotal").val(GrandTotal);
}
// for diamond
function purchaseMdiamondRateChange() {
  let DiamondRate = parseFloat($("#PurchaseModuleDiamondRate").val());
  let DiamondnetWeight = parseFloat($("#PurchaseModuleDiamondNW").val());
  DiamondTotal = DiamondnetWeight * DiamondRate;
  $("#PurchaseModuleDiamondTotal").val(DiamondTotal);

  OverallTotal = DiamondTotal;

  $("#PurchaseOverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#PurchaseGrandTotal").val(GrandTotal);
}

// for gold and platinum
function PurchaseMgoldPlatinumRateChange() {
  let GldRate = parseFloat($("#PurchaseModuleGoldRate").val());
  let pureGold = parseFloat($("#PurchaseModulePureGold").val());
  GoldTotal = pureGold * GldRate;
  $("#PurchaseModuleGoldTotal").val(GoldTotal);

  let PlatinumRate = parseFloat($("#PurchaseModulePlatinumRate").val());
  let PurePlatinum = parseFloat($("#PurchaseModulePurePlatinum").val());
  PlatinumTotal = PurePlatinum * PlatinumRate;
  $("#PurchaseModulePlatinumTotal").val(PlatinumTotal);

  OverallTotal = GoldTotal + PlatinumTotal;

  $("#PurchaseOverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#PurchaseGrandTotal").val(GrandTotal);
}
// gold and diamond

function purchaseMgoldDiamondRateChange() {
  let GldRate = parseFloat($("#PurchaseModuleGoldRate").val());
  let pureGold = parseFloat($("#PurchaseModulePureGold").val());
  GoldTotal = pureGold * GldRate;
  $("#PurchaseModuleGoldTotal").val(GoldTotal);

  let DiamondRate = parseFloat($("#PurchaseModuleDiamondRate").val());
  let DiamondnetWeight = parseFloat($("#PurchaseModuleDiamondNW").val());
  DiamondTotal = DiamondnetWeight * DiamondRate;
  $("#PurchaseModuleDiamondTotal").val(DiamondTotal);

  OverallTotal = GoldTotal + DiamondTotal;
  $("#PurchaseOverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#PurchaseGrandTotal").val(GrandTotal);
}
// for silver and platinum
function purchaseMsilverPlatinumRateChange() {
  let SilverRate = parseFloat($("#PurchaseModuleSilverRate").val());
  let PureSilver = parseFloat($("#PurchaseModulePureSilver").val());
  SilverTotal = PureSilver * SilverRate;
  $("#PurchaseModuleSilverTotal").val(SilverTotal);

  let PlatinumRate = parseFloat($("#PurchaseModulePlatinumRate").val());
  let PurePlatinum = parseFloat($("#PurchaseModulePurePlatinum").val());
  PlatinumTotal = PurePlatinum * PlatinumRate;
  $("#PurchaseModulePlatinumTotal").val(PlatinumTotal);

  OverallTotal = SilverTotal + PlatinumTotal;
  $("#PurchaseOverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#PurchaseGrandTotal").val(GrandTotal);
}
// silver nad diamond
function purchaseMsilverDiamondRateChange() {
  let SilverRate = parseFloat($("#PurchaseModuleSilverRate").val());
  let PureSilver = parseFloat($("#PurchaseModulePureSilver").val());
  SilverTotal = PureSilver * SilverRate;
  $("#PurchaseModuleSilverTotal").val(SilverTotal);

  let DiamondWastage = parseFloat($("#PurchaseDiamondWastage").val());
  let DiamondRate = parseFloat($("#PurchaseModuleDiamondRate").val());
  let DiamondnetWeight = parseFloat($("#PurchaseModuleDiamondNW").val());
  DiamondTotal = DiamondnetWeight * DiamondRate;
  $("#PurchaseModuleDiamondTotal").val(DiamondTotal);

  OverallTotal = SilverTotal + DiamondTotal;
  $("#PurchaseOverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#PurchaseGrandTotal").val(GrandTotal);
}
//  platinum diamond   //
function purchaseMplatinumDiamondRateChange() {
  let DiamondWastage = parseFloat($("#PurchaseDiamondWastage").val());
  let DiamondRate = parseFloat($("#PurchaseModuleDiamondRate").val());
  let DiamondnetWeight = parseFloat($("#PurchaseModuleDiamondNW").val());
  DiamondTotal = DiamondnetWeight * DiamondRate;
  $("#PurchaseModuleDiamondTotal").val(DiamondTotal);

  let PlatinumRate = parseFloat($("#PurchaseModulePlatinumRate").val());
  let PurePlatinum = parseFloat($("#PurchaseModulePurePlatinum").val());
  PlatinumTotal = PurePlatinum * PlatinumRate;
  $("#PurchaseModulePlatinumTotal").val(PlatinumTotal);
  OverallTotal = PlatinumTotal + DiamondTotal;
  $("#PurchaseOverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#PurchaseGrandTotal").val(GrandTotal);
}
// silver for platinum diamond

function purchaseMSilverplatinumDiamondRateChange() {
  let SilverRate = parseFloat($("#PurchaseModuleSilverRate").val());
  let PureSilver = parseFloat($("#PurchaseModulePureSilver").val());
  SilverTotal = PureSilver * SilverRate;
  $("#PurchaseModuleSilverTotal").val(SilverTotal);

  let DiamondWastage = parseFloat($("#PurchaseDiamondWastage").val());
  let DiamondRate = parseFloat($("#PurchaseModuleDiamondRate").val());
  let DiamondnetWeight = parseFloat($("#PurchaseModuleDiamondNW").val());
  DiamondTotal = DiamondnetWeight * DiamondRate;
  $("#PurchaseModuleDiamondTotal").val(DiamondTotal);

  let PlatinumRate = parseFloat($("#PurchaseModulePlatinumRate").val());
  let PurePlatinum = parseFloat($("#PurchaseModulePurePlatinum").val());
  PlatinumTotal = PurePlatinum * PlatinumRate;
  $("#PurchaseModulePlatinumTotal").val(PlatinumTotal);
  OverallTotal = PlatinumTotal + DiamondTotal + SilverTotal;
  $("#PurchaseOverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#PurchaseGrandTotal").val(GrandTotal);
}
// for gold platinum diamoind
function purchaseMgoldPlatinumDiamon() {
  let GldRate = parseFloat($("#PurchaseModuleGoldRate").val());
  let pureGold = parseFloat($("#PurchaseModulePureGold").val());

  GoldTotal = pureGold * GldRate;
  $("#PurchaseModuleGoldTotal").val(GoldTotal);

  let DiamondWastage = parseFloat($("#PurchaseDiamondWastage").val());
  let DiamondRate = parseFloat($("#PurchaseModuleDiamondRate").val());
  let DiamondnetWeight = parseFloat($("#PurchaseModuleDiamondNW").val());
  DiamondTotal = DiamondnetWeight * DiamondRate;
  $("#PurchaseModuleDiamondTotal").val(DiamondTotal);

  let PlatinumRate = parseFloat($("#PurchaseModulePlatinumRate").val());
  let PurePlatinum = parseFloat($("#PurchaseModulePurePlatinum").val());
  PlatinumTotal = PurePlatinum * PlatinumRate;
  $("#PurchaseModulePlatinumTotal").val(PlatinumTotal);
  OverallTotal = PlatinumTotal + DiamondTotal + GoldTotal;
  $("#PurchaseOverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#PurchaseSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#PurchaseGrandTotal").val(GrandTotal);
}

// purchase add module calutaon ends

$("#selectPurcaseBillCat").on("change", function () {
  let catID = $("#selectPurcaseBillCat").val();

  if ($("#selectPurchaseFor").val() == 2) {
    $(".showForDealer").hide();
    $(".showForCustomer").show();
    billgenerateforPurchase(catID);
  }
  if ($("#selectPurchaseFor").val() == 1) {
    billgenerateforPurchase(1);
    $(".showForCustomer").show();
    $(".showForDealer").show();
  }
  PurchaseFormReplace(catID);
});
function PurchaseFormReplace(catId) {
  {
    $.ajax({
      url: BASE_URL + "/purchasemoduleCustomerForm?catid=" + catId,

      success: function (data) {
        $("#replacePurchaseForm").html(data);
      },
    });
  }
}
function billgenerateforPurchase(catId) {
  $.ajax({
    url: BASE_URL + "/billnoforpurchase?catid=" + catId,

    success: function (data) {
      $("#PurchaseBillNo").html(data);
    },
  });
}
$("#selectPurchaseFor").on("change", function () {
  let type = parseInt($("#selectPurchaseFor").val());

  if (type == 1) {
    $(".showfordealer").show();
    $(".showForcustomer").hide();
    $(".grandTotalRow").hide();
    $("#showPurchaseForm").show();
  }
  if (type == 2) {
    $(".showfordealer").hide();
    $("#showPurchaseForm").show();
    $(".showForcustomer").show();
    $(".grandTotalRow").show();
  }
  if (type == 0) {
    $("#purchaseForDealer").hide();
    $("#purchaseForCustomer").hide();
  }
});

// purchase module work end

// sales work start
// search urd in sales module
function showSalesBillDetails() {
  let purchaseID = $("#hiddenSalesURDID").val();
  if (purchaseID) {
    $.ajax({
      url: BASE_URL + "/getSalesShowBill?purchaseID=" + purchaseID,

      success: function (data) {
        $("#billDetails").html(data);
      },
    });
  }
  $("#modal-default").modal("show");
  let CashPayment = parseFloat($("#CashPayment").val());
  let GooglePay = parseFloat($("#GPayPayment").val());
  let PhonePayPayment = parseFloat($("#PhonePayPayment").val());
  let CardPayment = parseFloat($("#CardPayment").val());
  let PayTmPayment = parseFloat($("#PayTmPayment").val());
  let BankPayment = parseFloat($("#BankPayment").val());

  let GrandTotal = parseFloat($("#GrandTotal").val());
  let HURDAmount = parseFloat($("#urdAmountOnSalesPage").val());

  if (!GooglePay) {
    GooglePay = 0;
  }
  if (!PhonePayPayment) {
    PhonePayPayment = 0;
  }
  if (!CardPayment) {
    CardPayment = 0;
  }
  if (!PayTmPayment) {
    PayTmPayment = 0;
  }
  if (!BankPayment) {
    BankPayment = 0;
  }

  if (!CashPayment) {
    CashPayment = 0;
  }
  if (!HURDAmount) {
    HURDAmount = 0;
  }

  let AllTransactionTotal =
    CashPayment +
    GooglePay +
    PhonePayPayment +
    CardPayment +
    PayTmPayment +
    BankPayment;
  $("#SalesBillPaidAmount").html(AllTransactionTotal);
  let paybaleAmount = GrandTotal - AllTransactionTotal;
  if (purchaseID) {
    paybaleAmount = GrandTotal - AllTransactionTotal - HURDAmount;
    $("#SalesBillGrandTotal").html(paybaleAmount);
  } else {
    $("#SalesBillGrandTotal").html(paybaleAmount);
  }
}

function searchUrd() {
  let BillNo = $("#searchURDBill").val();
  $.ajax({
    url: BASE_URL + "/getUrdSales?&billNo=" + BillNo,

    success: function (data) {
      $("#replaceUrdDetails").html(data);
    },
  });
  alert("#searchedURDAmount".val());
}

function saleURDCheckbox() {
  if ($("#SaleURDCheckBox").is(":checked")) {
    $("#urdHide").show();
  } else {
    $("#urdHide").hide();
  }
}

// delete sales
// delte product work

function deleteSales($id) {
  {
    $("#modal-default").modal("show");
    $("#deleteSalesInput").val($id);
    // alert('hello')
  }
}
// sales filter work
function filterSales() {
  let salesFrom = $("#salesFromDateFilter").val();
  let salesTo = $("#salestodateFilter").val();
  let salesCusName = $("#SalesCustomerNameFilter").val();
  let salesCusNo = $("#SalescustomerPhoneFilter").val();
  var page = $("#hidden_sales_page").val();
  var paymentStatus = $("#paymentStatusFilter").val();
  var column_name = $("#hidden_sales_column_name").val();
  var sort_type = $("#hidden_sales_sort_type").val();

  searchCustomer(
    salesFrom,
    salesTo,
    salesCusName,
    salesCusNo,
    page,
    paymentStatus,
    column_name,
    sort_type
  );
}
// sales export
function exportExcelsales() {
  let salesFrom = $("#salesFromDateFilter").val();
  let salesTo = $("#salestodateFilter").val();
  let salesCusName = $("#SalesCustomerNameFilter").val();
  let salesCusNo = $("#SalescustomerPhoneFilter").val();

  window.location =
    BASE_URL +
    "/sales/export?&salesFrom=" +
    salesFrom +
    "&salesTo=" +
    salesTo +
    "&salesCusName=" +
    salesCusName +
    "&salesCusNo=" +
    salesCusNo;
}
function searchCustomer(
  salesFrom,
  salesTo,
  salesCusName,
  salesCusNo,
  page,
  paymentStatus,
  sort_by,
  sort_type
) {
  $.ajax({
    url:
      BASE_URL +
      "/getSalesFiler?salesFrom=" +
      salesFrom +
      "&salesTo=" +
      salesTo +
      "&salesCusName=" +
      salesCusName +
      "&salesCusNo=" +
      salesCusNo +
      "&page=" +
      page +
      "&paymentStatus=" +
      paymentStatus +
      "&sortBy=" +
      sort_by +
      "&sort_type=" +
      sort_type,

    success: function (data) {
      $("#SalesTable").html(data);
    },
  });
}

$(document).on("click", ".salesarrow", function () {
  var column_name = $(this).data("column_name");
  var order_type = $(this).data("sorting_type");
  var reverse_order = "";
  if (order_type == "asc") {
    $(this).data("sorting_type", "desc");
    reverse_order = "desc";
  } else {
    $(this).data("sorting_type", "asc");
    reverse_order = "asc";
  }
  let salesFrom = $("#salesFromDateFilter").val();
  let salesTo = $("#salestodateFilter").val();
  let salesCusName = $("#SalesCustomerNameFilter").val();
  let salesCusNo = $("#SalescustomerPhoneFilter").val();
  $("#hidden_sales_column_name").val(column_name);
  $("#hidden_sales_sort_type").val(reverse_order);
  var page = $("#hidden_sales_page").val();

  searchCustomer(
    salesFrom,
    salesTo,
    salesCusName,
    salesCusNo,
    page,
    column_name,
    reverse_order
  );
});

// sale page on rate change show result amount
// for only gold calculation
function goldRateChange() {
  let GldRate = parseFloat($("#goldSalesInputValue").val()).toFixed(2);
  let makingCharges = parseFloat($("#SalemakingCharges").val()).toFixed(2);
  let netWeight = parseFloat($("#goldNetWeight").val()).toFixed(2);
  GoldTotal = parseFloat(netWeight * GldRate).toFixed(2);

  $("#setTotalGoldAmount").val(GoldTotal);
  OverallTotal = parseFloat(GoldTotal + makingCharges).toFixed(2);
  $("#OverAllTotal").val(OverallTotal);
  CGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesCGST").val(CGST);
  SGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesSGST").val(SGST);
  GrandTotal = parseFloat(OverallTotal + CGST + SGST).toFixed(2);
  $("#GrandTotal").val(GrandTotal);
  $("#setBillTotalAmount").html(GrandTotal);
}
// for Silver calculation
function SilverRateChange() {
  let SilverRate = parseFloat($("#SilverSalesInputRate").val()).toFixed(2);
  let makingCharges = parseFloat($("#SalemakingCharges").val()).toFixed(2);
  let SilvernetWeight = parseFloat($("#silverNetWeight").val()).toFixed(2);
  SilverTotal = parseFloat(SilvernetWeight * SilverRate).toFixed(2);
  OverallTotal = parseFloat(SilverTotal + makingCharges).toFixed(2);
  $("#siverTotal").val(OverallTotal);
  $("#OverAllTotal").val(OverallTotal);
  CGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesCGST").val(CGST);
  SGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesSGST").val(SGST);
  GrandTotal = parseFloat(OverallTotal + CGST + SGST).toFixed(2);
  $("#GrandTotal").val(GrandTotal);
  $("#setBillTotalAmount").html(GrandTotal);
}
// for Platinum calculation
function platinumRateChange() {
  let PlatinumRate = parseFloat($("#PlatinumSalesInputRate").val()).toFixed(2);
  let makingCharges = parseFloat($("#SalemakingCharges").val()).toFixed(2);
  let PlatinumnetWeight = parseFloat($("#platinumnetWeight").val()).toFixed(2);
  PlatinumTotal = parseFloat(PlatinumnetWeight * PlatinumRate).toFixed(2);
  $("#platinumTotal").val(PlatinumTotal);
  OverallTotal = parseFloat(PlatinumTotal + makingCharges).toFixed(2);
  $("#OverAllTotal").val(OverallTotal);
  CGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesCGST").val(CGST);
  SGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesSGST").val(SGST);
  GrandTotal = parseFloat(OverallTotal + CGST + SGST).toFixed(2);
  $("#GrandTotal").val(GrandTotal);
  $("#setBillTotalAmount").html(GrandTotal);
}
// for diamond
function diamondRateChange() {
  let makingCharges = parseFloat($("#SalemakingCharges").val()).toFixed(2);
  let DiamondRate = parseFloat($("#diamondSalesRate").val()).toFixed(2);
  let DiamondnetWeight = parseFloat($("#diamondNetWeight").val()).toFixed(2);
  DiamondTotal = DiamondnetWeight * DiamondRate;
  $("#diamondTotal").val(DiamondTotal);

  OverallTotal = parseFloat(DiamondTotal + makingCharges).toFixed(2);
  $("#OverAllTotal").val(OverallTotal);
  CGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesCGST").val(CGST);
  SGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesSGST").val(SGST);
  GrandTotal = parseFloat(OverallTotal + CGST + SGST).toFixed(2);
  $("#GrandTotal").val(GrandTotal);
  $("#setBillTotalAmount").html(GrandTotal);
}
// for gold and platinum
function goldPlatinumRateChange() {
  let makingCharges = parseFloat($("#SalemakingCharges").val()).toFixed(2);

  let GoldRate = parseFloat($("#goldSalesInputValue").val()).toFixed(2);
  let GoldnetWeight = parseFloat($("#goldNetWeight").val()).toFixed(2);
  GoldTotal = parseFloat(GoldnetWeight * GoldRate).toFixed(2);
  $("#setTotalGoldAmount").val(GoldTotal);

  let PlatinumRate = parseFloat($("#PlatinumSalesInputRate").val()).toFixed(2);
  let PlatinumnetWeight = parseFloat($("#platinumnetWeight").val()).toFixed(2);
  PlatinumTotal = parseFloat(PlatinumnetWeight * PlatinumRate).toFixed(2);
  $("#platinumTotal").val(PlatinumTotal);
  OverallTotal = parseFloat(GoldTotal + PlatinumTotal + makingCharges).toFixed(
    2
  );

  $("#OverAllTotal").val(OverallTotal);
  CGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesCGST").val(CGST);
  SGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesSGST").val(SGST);
  GrandTotal = parseFloat(OverallTotal + CGST + SGST).toFixed(2);
  $("#GrandTotal").val(GrandTotal);
  $("#setBillTotalAmount").html(GrandTotal);
}
// gold and diamond

function goldDiamondRateChange() {
  let makingCharges = parseFloat($("#SalemakingCharges").val()).toFixed(2);

  let GoldRate = parseFloat($("#goldSalesInputValue").val()).toFixed(2);
  let GoldnetWeight = parseFloat($("#goldNetWeight").val()).toFixed(2);
  GoldTotal = parseFloat(GoldnetWeight * GoldRate).toFixed(2);
  $("#setTotalGoldAmount").val(GoldTotal);

  let DiamondRate = parseFloat($("#diamondSalesRate").val()).toFixed(2);
  let DiamondnetWeight = parseFloat($("#diamondNetWeight").val()).toFixed(2);
  DiamondTotal = parseFloat(DiamondnetWeight * DiamondRate).toFixed(2);
  $("#diamondTotal").val(DiamondTotal);

  OverallTotal = parseFloat(DiamondTotal + GoldTotal + makingCharges).toFixed(
    2
  );
  $("#OverAllTotal").val(OverallTotal);
  CGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesCGST").val(CGST);
  SGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesSGST").val(SGST);
  GrandTotal = parseFloat(OverallTotal + CGST + SGST).toFixed(2);
  $("#GrandTotal").val(GrandTotal);
  $("#setBillTotalAmount").html(GrandTotal);
}
// for silver and platinum
function silverPlatinumRateChange() {
  let makingCharges = parseFloat($("#SalemakingCharges").val()).toFixed(2);

  let SilverRate = parseFloat($("#SilverSalesInputRate").val()).toFixed(2);
  let SilvernetWeight = parseFloat($("#silverNetWeight").val()).toFixed(2);
  SilverTotal = parseFloat(SilvernetWeight * SilverRate).toFixed(2);
  $("#siverTotal").val(SilverTotal);
  let PlatinumRate = parseFloat($("#PlatinumSalesInputRate").val()).toFixed(2);
  let PlatinumnetWeight = parseFloat($("#platinumnetWeight").val()).toFixed(2);
  PlatinumTotal = parseFloat(PlatinumnetWeight * PlatinumRate).toFixed(2);
  $("#platinumTotal").val(PlatinumTotal);

  OverallTotal = parseFloat(
    SilverTotal + PlatinumTotal + makingCharges
  ).toFixed(2);
  $("#OverAllTotal").val(OverallTotal);
  CGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesCGST").val(CGST);
  SGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesSGST").val(SGST);
  GrandTotal = parseFloat(OverallTotal + CGST + SGST).toFixed(2);
  $("#GrandTotal").val(GrandTotal);
  $("#setBillTotalAmount").html(GrandTotal);
}
// silver nad diamond
function silverDiamondRateChange() {
  let makingCharges = parseFloat($("#SalemakingCharges").val()).toFixed(2);

  let SilverRate = parseFloat($("#SilverSalesInputRate").val()).toFixed(2);
  let SilvernetWeight = parseFloat($("#silverNetWeight").val()).toFixed(2);
  SilverTotal = parseFloat(SilvernetWeight * SilverRate).toFixed(2);
  $("#siverTotal").val(SilverTotal);

  let DiamondRate = parseFloat($("#diamondSalesRate").val()).toFixed(2);
  let DiamondnetWeight = parseFloat($("#diamondNetWeight").val()).toFixed(2);
  DiamondTotal = parseFloat(DiamondnetWeight * DiamondRate).toFixed(2);
  $("#diamondTotal").val(DiamondTotal);

  OverallTotal = parseFloat(SilverTotal + DiamondTotal + makingCharges).toFixed(
    2
  );
  alert(OverallTotal);
  $("#OverAllTotal").val(OverallTotal);
  CGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesCGST").val(CGST);
  SGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesSGST").val(SGST);
  GrandTotal = parseFloat(OverallTotal + CGST + SGST).toFixed(2);
  $("#GrandTotal").val(GrandTotal);
  $("#setBillTotalAmount").html(GrandTotal);
}
//  platinum diamond   //
function platinumDiamondRateChange() {
  let makingCharges = parseFloat($("#SalemakingCharges").val()).toFixed(2);

  let DiamondRate = parseFloat($("#diamondSalesRate").val()).toFixed(2);
  let DiamondnetWeight = parseFloat($("#diamondNetWeight").val()).toFixed(2);
  DiamondTotal = parseFloat(DiamondnetWeight * DiamondRate).toFixed(2);
  $("#diamondTotal").val(DiamondTotal);

  let PlatinumRate = parseFloat($("#PlatinumSalesInputRate").val()).toFixed(2);
  let PlatinumnetWeight = parseFloat($("#platinumnetWeight").val()).toFixed(2);
  PlatinumTotal = parseFloat(PlatinumnetWeight * PlatinumRate).toFixed(2);
  $("#platinumTotal").val(PlatinumTotal);

  OverallTotal = parseFloat(
    PlatinumTotal + DiamondTotal + makingCharges
  ).toFixed(2);
  $("#OverAllTotal").val(OverallTotal);
  CGST = parseFloat((OverallTotal * 1.5) / 100).toFixed;
  $("#SalesCGST").val(CGST);
  SGST = parseFloat((OverallTotal * 1.5) / 100).toFixed;
  $("#SalesSGST").val(SGST);
  GrandTotal = parseFloat(OverallTotal + CGST + SGST).toFixed(2);
  $("#GrandTotal").val(GrandTotal);
  $("#setBillTotalAmount").html(GrandTotal);
}
// silver for platinum diamond

function SilverplatinumDiamondRateChange() {
  let makingCharges = parseFloat($("#SalemakingCharges").val()).toFixed(2);

  let SilverRate = parseFloat($("#SilverSalesInputRate").val()).toFixed(2);
  let SilvernetWeight = parseFloat($("#silverNetWeight").val()).toFixed(2);
  SilverTotal = parseFloat(SilvernetWeight * SilverRate).toFixed(2);
  $("#siverTotal").val(SilverTotal);

  let DiamondRate = parseFloat($("#diamondSalesRate").val()).toFixed(2);
  let DiamondnetWeight = parseFloat($("#diamondNetWeight").val()).toFixed(2);
  DiamondTotal = parseFloat(DiamondnetWeight * DiamondRate).toFixed(2);
  $("#diamondTotal").val(DiamondTotal);

  let PlatinumRate = parseFloat($("#PlatinumSalesInputRate").val()).toFixed(2);
  let PlatinumnetWeight = parseFloat($("#platinumnetWeight").val()).toFixed(2);
  PlatinumTotal = parseFloat(PlatinumnetWeight * PlatinumRate).toFixed(2);
  $("#platinumTotal").val(PlatinumTotal);

  OverallTotal = parseFloat(
    SilverTotal + PlatinumTotal + DiamondTotal + makingCharges
  ).toFixed(2);
  $("#OverAllTotal").val(OverallTotal);
  CGST = (OverallTotal * 1.5) / 100;
  $("#SalesCGST").val(CGST);
  SGST = (OverallTotal * 1.5) / 100;
  $("#SalesSGST").val(SGST);
  GrandTotal = OverallTotal + CGST + SGST;
  $("#GrandTotal").val(GrandTotal);
  $("#setBillTotalAmount").html(GrandTotal);
}

// for gold platinum diamoind
function goldPlatinumDiamon() {
  let makingCharges = parseFloat($("#SalemakingCharges").val()).toFixed(2);

  let GoldRate = parseFloat($("#goldSalesInputValue").val()).toFixed(2);
  let GoldnetWeight = parseFloat($("#goldNetWeight").val()).toFixed(2);
  GoldTotal = parseFloat(GoldnetWeight * GoldRate).toFixed(2);
  $("#setTotalGoldAmount").val(GoldTotal);
  alert(GoldTotal);

  let DiamondRate = parseFloat($("#diamondSalesRate").val()).toFixed(2);
  let DiamondnetWeight = parseFloat($("#diamondNetWeight").val()).toFixed(2);
  DiamondTotal = parseFloat(DiamondnetWeight * DiamondRate).toFixed(2);
  $("#diamondTotal").val(DiamondTotal);

  let PlatinumRate = parseFloat($("#PlatinumSalesInputRate").val()).toFixed(2);
  let PlatinumnetWeight = parseFloat($("#platinumnetWeight").val()).toFixed(2);
  PlatinumTotal = parseFloat(PlatinumnetWeight * PlatinumRate).toFixed(2);
  $("#platinumTotal").val(PlatinumTotal);

  OverallTotal = parseFloat(
    GoldTotal + PlatinumTotal + DiamondTotal + makingCharges
  ).toFixed(2);
  $("#OverAllTotal").val(OverallTotal);
  CGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesCGST").val(CGST);
  SGST = parseFloat((OverallTotal * 1.5) / 100).toFixed(2);
  $("#SalesSGST").val(SGST);
  GrandTotal = parseFloat(OverallTotal + CGST + SGST).toFixed(2);
  $("#GrandTotal").val(GrandTotal);
  $("#setBillTotalAmount").html(GrandTotal);
}

// sale module purchase hidden check box work
function salePurchaseCheckbox(index) {
  if ($("#saleProductCat").val() == 0) {
    alert("Please Select Product Category");
    $(`#SalePurchasePageCheckBox-${index}`).prop("checked", false);
  }
  if ($(`#pCodeSelect-${index}`).val() == 0) {
    alert("Please Select Product Category");
    $(`#SalePurchasePageCheckBox-${index}`).prop("checked", false);
  } else {
    if ($(`#SalePurchasePageCheckBox-${index}`).is(":checked")) {
      $(`#salePurchaseHide-${index}`).show();
    } else {
      $(`#salePurchaseHide-${index}`).hide();
    }
  }
}

function getTotalSalesRows() {
  const pcodes = $(".pCodeSelect");
  return pcodes.length;
}

function removeProductBlock(index) {
  const rows = getTotalSalesRows();
  if (rows === 1) return;
  $(`#product-block-${index}`).remove();
}

function generateProductBlock(data, index) {
  const html = `
  <div class="bg-light pt-3 px-3" id="product-block-${index}">
    <h4 class="text-center">Product Details</h4>
    <div class="row">
        <div id="pCodeG" class="col-xs-10 col-md-3 mb-3">
            <div class="form-group" id="SalesprocductCodeAjax-${index}">${data}</div>
        </div>
        <div class="col-xs-2 col-md-1 offset-md-8">
          <button type="button" class="btn btn-sm btn-danger" onclick="removeProductBlock(${index})">Remove</button>
        </div>
    </div>
  
    <div id="productDetailsSales-${index}"></div>

    <div id="AddproductPurchaseDetails-${index}">
      <div class="col-xs-12 col-md-2">
          <input onclick="salePurchaseCheckbox(${index})" type="checkbox" class="SalePurchasePageCheckBox"
              id="SalePurchasePageCheckBox-${index}" name="SalePurchasePageCheckBox"
              value="salePurchaseHide-${index}">
          <label for="">Purchase Details </label><br>
      </div>
      </br>
      <div id="salePurchaseHide-${index}" style="display: none">
          <div class="row" id="replaceAddProductPurchaseDetails-${index}">
          </div>
      </div>
    </div>

    <div id="saleDetailsrowhide-${index}">
      <h4 class="text-center mb-3">Sales Details</h4>
      <div class="row" id="SaleDetailsReplace-${index}"></div>
    </div>
    <hr />
  </div>
  `;
  return html;
}

function generateNewSalesRow(catID, index) {
  
  $.ajax({
    url: BASE_URL + "/salesPcodeOptions?catID=" + catID + "&index=" + index,
    success: function (data) {
      $("#sales-product-wrapper").append(generateProductBlock(data, index));
    },
  });
}
function replaceSalesRows(catID) {
  $.ajax({
    url: BASE_URL + "/salesPcodeOptions?catID=" + catID + "&index=" + 0,
    success: function (data) {
      $("#sales-product-wrapper").html(generateProductBlock(data, 0));
    },
  });
}

$(document).ready(function () {
  $("#saleProductCat").change(function () {
    const count = $(".customerPhoneNumber").length;
    
    if(count===0||count===undefined)
    {
    alert("Please search customer first")
    $("#saleProductCat").val(0)
    return;
    }
    const index = getTotalSalesRows();
    const catID = $("#saleProductCat").val();
    $.ajax({
      url: BASE_URL + "/setBillNo?catID=" + catID,
      success: function (data) {
        $("#setBillNo").html(data);
      },
    });
    let clear = false;
    if (index > 0) {
      clear = confirm(
        "This will clear all the existing rows. Are you sure you want to change the Product Category?"
      );
      if (clear) replaceSalesRows(catID);
    } else {
      generateNewSalesRow(catID, index);
      $("#add-product-button").show();
    }
  });
});

// products details ajax work accoriding to product code
// function productDetialsCode(ProductCode) {
//   $.ajax({
//     url: BASE_URL + "/getProductDetails?productCode=" + ProductCode,
//     success: function (data) {
//       $("#productDetailsSales").html(data);
//     },
//   });
//   // yaha ek or aajax chlega jo ki replace krega sale details ko
//   $.ajax({
//     url: BASE_URL + "/getProductSaleDetails?productCode=" + ProductCode,
//     success: function (data) {
//       $("#SaleDetailsReplace").html(data);
//     },
//   });
//   // ends
//   // purchase detilas
//   $.ajax({
//     url: BASE_URL + "/getProductPurchaseDetails?productCode=" + ProductCode,
//     success: function (data) {
//       $("#replaceAddProductPurchaseDetails").html(data);
//     },
//   });
//   // ends
// }
function calculateEMI() {
  const vEmiAmountPerMonth = $(`#vEmiAmountPerMonth`).val()
  const vDurationMonth = $(`#vDurationMonth`).val()
  const totalEMIAmount = vEmiAmountPerMonth * vDurationMonth;

        $("#vTotalEMIAmount").val(totalEMIAmount.toFixed(2));
}
function calculateInvoice() {
  const totalRows = getTotalSalesRows();
  let makingCharges = 0;
  let makingChargePercentage = 0;
  let otherCharges = 0;
  let grossTotal = 0;
  for (let i = 0; i < totalRows; i++) {
    const netWeight1 = $(`#net_weight_1_${i}`).val()
      ? Number($(`#net_weight_1_${i}`).val())
      : null;
    const productRate1 = $(`#product_rate_1_${i}`).val()
      ? Number($(`#product_rate_1_${i}`).val())
      : null;
    if (!netWeight1 || !productRate1) return;
    const productAmount1 = netWeight1 * productRate1;
    $(`#product_amount_1_${i}`).val(productAmount1);

    const makingCharge = $(`#making_charge_${i}`).val()
      ? Number($(`#making_charge_${i}`).val())
      : 0;
      //alert(makingCharge);

    const makingChargePercentage = $(`#making_charge_percentage${i}`).val()
      ? Number($(`#making_charge_percentage${i}`).val())
      : 0;

    const otherCharge = $(`#other_charges_${i}`).val()
      ? Number($(`#other_charges_${i}`).val())
      : null;
    otherCharges = otherCharge;
    makingCharges = makingCharge;
    grossTotal += productAmount1;

    if (makingChargePercentage != "0") {
       makingCharges = grossTotal * makingChargePercentage / 100;
    }

    const netWeight2 = $(`#net_weight_2_${i}`).val()
      ? Number($(`#net_weight_2_${i}`).val())
      : null;
    const productRate2 = $(`#product_rate_2_${i}`).val()
      ? Number($(`#product_rate_2_${i}`).val())
      : null;
    if (netWeight2 && productRate2) {
      const productAmount2 = netWeight2 * productRate2;
      $(`#product_amount_2_${i}`).val(productAmount2);
      grossTotal += productAmount2;
    }
    const netWeight3 = $(`#net_weight_3_${i}`).val()
      ? Number($(`#net_weight_3_${i}`).val())
      : null;
    const productRate3 = $(`#product_rate_3_${i}`).val()
      ? Number($(`#product_rate_3_${i}`).val())
      : null;
    if (netWeight3 && productRate3) {
      const productAmount3 = netWeight3 * productRate3;
      $(`#product_amount_3_${i}`).val(productAmount3);
      grossTotal += productAmount3;
    }

    const adjustableAmount = $(`#adjustableAmount`).val()
  //Adjustable Amount Calculation
  if (adjustableAmount) {

      //adjustable Amount Calculate
      adjustableAmountCal  = (adjustableAmount * 100) / 103;
      grossTotal += makingCharges + otherCharges;
      const adjustable_cgst = adjustableAmountCal * 0.015;
      const adjustable_sgst = adjustableAmountCal * 0.015;

      const cgst = grossTotal * 0.015;
      const sgst = grossTotal * 0.015;
      const grandTotal = grossTotal + cgst + sgst;

      $("#grossTotal").val(adjustableAmountCal.toFixed(2));
      $("#SalesSGST").val(adjustable_cgst.toFixed(2));
      $("#SalesCGST").val(adjustable_sgst.toFixed(2));
      $("#GrandTotal").val(grandTotal.toFixed(2));

      //Reverse Making Charge Calculation
      const adjustableValue = $(`#adjustableAmount`).val()
      ? Number($(`#adjustableAmount`).val())
      : 0;
      if(adjustableAmount != "0"){
        const productAmount1 = netWeight1 * productRate1;
        const reverseMakingChargeCal  = adjustableAmountCal - productAmount1;
        $(`#making_charge_${i}`).val(Math.round(reverseMakingChargeCal));
      }else{
         //adjustable Amount Calculate
        adjustableAmountCal  = (adjustableAmount * 100) / 103;
        grossTotal += makingCharges + otherCharges;
        const adjustable_cgst = adjustableAmountCal * 0.015;
        const adjustable_sgst = adjustableAmountCal * 0.015;

        const cgst = grossTotal * 0.015;
        const sgst = grossTotal * 0.015;
        const grandTotal = grossTotal + cgst + sgst;

        $("#grossTotal").val(adjustableAmountCal.toFixed(2));
        $("#SalesSGST").val(adjustable_cgst.toFixed(2));
        $("#SalesCGST").val(adjustable_sgst.toFixed(2));
        $("#GrandTotal").val(grandTotal.toFixed(2));

      }

      

  }else{
      grossTotal += makingCharges + otherCharges;
      const cgst = grossTotal * 0.015;
      const sgst = grossTotal * 0.015;
      const grandTotal = grossTotal + cgst + sgst;
      
      $("#grossTotal").val(grossTotal.toFixed(2));
      $("#SalesSGST").val(sgst.toFixed(2));
      $("#SalesCGST").val(sgst.toFixed(2));
      $("#GrandTotal").val(grandTotal.toFixed(2));
  }
  
  }
}
function productDetialsCode(ProductCode, index) {
  if (Number(ProductCode) === 0) {
    $(`#productDetailsSales-${index}`).html("");
    $(`#replaceAddProductPurchaseDetails-${index}`).html("");
    return;
  }

  $.ajax({
    url:
      BASE_URL +
      "/getProductDetails?productCode=" +
      ProductCode +
      "&index=" +
      index,
    success: function (data) {
      $(`#productDetailsSales-${index}`).html(data);
    },
  });
  // yaha ek or aajax chlega jo ki replace krega sale details ko
  $.ajax({
    url:
      BASE_URL +
      "/getProductSaleDetails?productCode=" +
      ProductCode +
      "&index=" +
      index,
    success: function (data) {
      $(`#SaleDetailsReplace-${index}`).html(data);
    },
  });
  // ends
  // purchase detilas
  $.ajax({
    url:
      BASE_URL +
      "/getProductPurchaseDetails?productCode=" +
      ProductCode +
      "&index=" +
      index,
    success: function (data) {
      $(`#replaceAddProductPurchaseDetails-${index}`).append(data);
    },
  });
  setTimeout(() => {
    calculateInvoice();
  }, 1000);
}

function addProduct(productCategoryId = null) {
  const index = getTotalSalesRows();
  const catID = productCategoryId ?? $("#saleProductCat").val();
  generateNewSalesRow(catID, index);
}

// ends

// search customer in sales module
function searchCustomerSales() {
  let searchInput = $("#searchCustomerSalesInput").val();
  searchCustomer(searchInput);
  //    ajax
  function searchCustomer(CustomerSearch) {
    $.ajax({
      url: BASE_URL + "/getCustomerSales?CustomerSearch=" + CustomerSearch,

      success: function (data) {
        $("#customerInputAjax").html(data);
      },
    });
  }
}
// SALES  ends

// EMI SHOW CUSTOMER START
function getCustomerDataEmi() {
  let customerSelectData = $("#getCustomerDataEmiId select").attr('select','selected');
  alert(customerSelectData);

  //searchCustomer(searchInput);
  //    ajax
  function searchCustomer(CustomerSearch) {
    $.ajax({
      url: BASE_URL + "/getCustomerSales?CustomerSearch=" + CustomerSearch,

      success: function (data) {
        $("#customerInputAjax").html(data);
      },
    });
  }
}
// EMI SHOW CUSTOMER  END

// delte product work
function deleteProduct($id) {
  {
    $("#modal-default").modal("show");
    $("#deleteProduuctInput").val($id);
    // alert('hello')
  }
}

// on cilck current product check box ad class
$("#ProductTable .ckeckboxProduct ").on("change", function () {
  if ($(this).is(":checked")) {
    // alert('checked')
    $(this).parents("tr").addClass("selected");
  } else {
    // {alert('uncekecked')
    $(this).parents("tr").removeClass("selected");
  }
});
// all product check box
$("#AllProductTable .ckeckboxProduct ").on("change", function () {
  if ($(this).is(":checked")) {
    // alert('checked')
    $(this).parents("tr").addClass("selected");
  } else {
    // {alert('uncekecked')
    $(this).parents("tr").removeClass("selected");
  }
});

// product sorting
$(document).on("click", ".productsArrow", function () {
  var column_name = $(this).data("column_name");
  var order_type = $(this).data("sorting_type");

  var reverse_order = "";
  if (order_type == "asc") {
    $(this).data("sorting_type", "desc");
    reverse_order = "desc";
  } else {
    $(this).data("sorting_type", "asc");
    reverse_order = "asc";
  }
  let pCode = $("#productCodeFilter").val();
  let pFromDate = $("#productFromDateFilter").val();
  let pTODate = $("#producttodateFilter").val();
  let pCategory = $("#productCategoryFilter").val();
  let pType = $("#productTypeFilter").val();
  let page = $("#hidden_Product_page").val();

  $("#hidden_Product_column_name").val(column_name);
  $("#hidden_Produtc_sort_type").val(reverse_order);

  filterProductAjax(
    page,
    reverse_order,
    column_name,
    pCode,
    pHUID,
    pHuIDFilter,
    pFromDate,
    pTODate,
    pCategory,
    pType
  );
});
// all product ajax
function allfilterProductAjax(
  page,
  sort_type,
  sort_by,
  pCode,
  pHUID,
  pHuIDFilter,
  pFrom,
  pTo = " ",
  pCat = " ",
  pType = " "
) {
  $.ajax({
    url:
      BASE_URL +
      "/filterAllProduct?page=" +
      page +
      "&sorttype=" +
      sort_type +
      "&sortby=" +
      sort_by +
      "&pCode=" +
      pCode +
      "&pHUID=" +
      pHUID +
      "&pHuIDFilter=" +
      pHuIDFilter +
      "&pTo=" +
      pTo +
      "&pFrom=" +
      pFrom +
      "&pCat=" +
      pCat +
      "&pType=" +
      pType,
    success: function (data) {
      $("#allProdTable").html(data);
      console.log(data);
    },
  });
}

// all products page
function filterAllproduct() {
  let allpCode = $("#allproductCodeFilter").val();
  let allpHUID = $("#allproductHUIDFilter").val();
  let pHuIDFilter = $("#HuIdFilter").val();
  let allpFromDate = $("#allproductFromDateFilter").val();
  let allpTODate = $("#allproducttodateFilter").val();
  let allpCategory = $("#allproductCategoryFilter").val();
  let allpType = $("#allproductTypeFilter").val();
  let allsort_type = $("#allhidden_Produtc_sort_type").val();
  let allsort_by = $("#allhidden_Product_column_name  ").val();
  let allpage = $("#allhidden_Product_page").val();
  allfilterProductAjax(
    allpage,
    allsort_type,
    allsort_by,
    allpCode,
    allpHUID,
    pHuIDFilter,
    allpFromDate,
    allpTODate,
    allpCategory,
    allpType
  );
}
// export current product
function exportCurrentProducts() {
  let pCode = $("#productCodeFilter").val();
  let pHUID = $("#productHUIDFilter").val();
  let pHuIDFilter = $("#HuIDFilter").val();
  let pboxCodeFilter = $("#boxCodeFilter").val();
  let pFrom = $("#productFromDateFilter").val();
  let pTo = $("#producttodateFilter").val();
  let pCat = $("#productCategoryFilter").val();
  let pType = $("#productTypeFilter").val();
  let sort_type = $("#hidden_Produtc_sort_type").val();
  let sort_by = $("#hidden_Product_column_name  ").val();
  let page = $("#hidden_Product_page").val();

  window.location =
    BASE_URL +
    "/exportProducts/current?page=" +
    page +
    "&sorttype=" +
    sort_type +
    "&sortby=" +
    sort_by +
    "&pboxCodeFilter=" +
    pboxCodeFilter +
    "&pCode=" +
    "&pHUID=" +
    pHUID +
    "&pHuIDFilter=" +
    pHuIDFilter +
    "&pboxCodeFilter=" +
    pboxCodeFilter +
    pCode +
    "&pTo=" +
    pTo +
    "&pFrom=" +
    pFrom +
    "&pCat=" +
    pCat +
    "&pType=" +
    pType;
}
// export all pproducts
function exportAllProducts() {
  let pCode = $("#allproductCodeFilter").val();
  let pHUID = $("#allproductHUIDFilter").val();
  let pboxCodeFilter = $("#boxCodeFilter").val();
  let pHuIDFilter = $("#HuIdFilter").val();
  let pFrom = $("#allproductFromDateFilter").val();
  let pTo = $("#allproducttodateFilter").val();
  let pCat = $("#allproductCategoryFilter").val();
  let pType = $("#allproductTypeFilter").val();

  window.location =
    BASE_URL +
    "/exportProducts/all?pCode=" +
    pCode +
    "&pHUID=" +
    pHUID +
    "&pHuIDFilter=" +
    pHuIDFilter +
    "&pboxCodeFilter=" +
    pboxCodeFilter +
    "&pTo=" +
    pTo +
    "&pFrom=" +
    pFrom +
    "&pCat=" +
    pCat +
    "&pType=" +
    pType;
}
// product ajax function
function filterProductAjax(
  page,
  sort_type,
  sort_by,
  boxCodeFilter = "",
  pCode,
  pHUID = "",
  pHuIDFilter = "",
  pFrom,
  pTo = " ",
  pCat = " ",
  pType = " "
) {
  $.ajax({
    url:
      BASE_URL +
      "/filterProduct?page=" +
      page +
      "&sorttype=" +
      sort_type +
      "&sortby=" +
      sort_by +
      "&boxCodeFilter=" +
      boxCodeFilter +
      "&pCode=" +
      pCode +
      "&pHUID=" +
      pHUID +
      "&pHuIDFilter=" +
      pHuIDFilter +
      "&pTo=" +
      pTo +
      "&pFrom=" +
      pFrom +
      "&pCat=" +
      pCat +
      "&pType=" +
      pType,

    success: function (data) {
      $("#ProductTable").html(data);
    },
  });
}
//  current product on filter button click
function filterproduct() {
  let boxCodeFilter = $("#boxCodeFilter").val();
  let pCode = $("#productCodeFilter").val();
  let pHUID = $("#productHUIDFilter").val();
  let pHuIDFilter = $("#HuIDFilter").val();
  let pCat = $("#productCategoryFilter").val();
  let pFromDate = $("#productFromDateFilter").val();
  let pTODate = $("#producttodateFilter").val();
  let pCategory = $("#productCategoryFilter").val();
  let pType = $("#productTypeFilter").val();
  let sort_type = $("#hidden_Produtc_sort_type").val();
  let sort_by = $("#hidden_Product_column_name  ").val();
  let page = $("#hidden_Product_page").val();


 
  filterProductAjax(
    page,
    sort_type,
    sort_by,
    boxCodeFilter,
    pCode,
    pHUID,
    pHuIDFilter,
    pFromDate,
    pTODate,
    pCategory,
    pType
  );
}

// eidt product form work //on page open
$(document).ready(function () {
  let currentOption = $("#editPurchaseCat").val();

  if (currentOption == 1) {
    alert("gemstone selected");
  }
  // for gold
  else if (currentOption == 2) {
    // purchase form
    $("#PurchareforGold").show();
    $("#PurchareforSilver").hide();
    $("#Purcharefordiamond").hide();
    $("#PurchareforPlatinum").hide();
    // carat
    $("#for-diamond").hide();
    $("#EditCaratGold").show();
    $("#EditCaratDiamond").hide();
    $("#EditCaratSilver").hide();
    $("#EditCaratPlatinum").hide();

    // net weight

    $("#editgoldNetWeight").show();
    $("#editsilverNetWeight").hide();
    $("#editplatinumNetWeight").hide();
  } else if (currentOption == 3) {
    // purchase form
    $("#PurchareforGold").show();
    $("#PurchareforSilver").hide();
    $("#Purcharefordiamond").hide();
    $("#PurchareforPlatinum").show();
    // carat

    $("#for-diamond").hide();
    $("#EditCaratGold").show();
    $("#EditCaratDiamond").hide();
    $("#EditCaratSilver").hide();
    $("#EditCaratPlatinum").show();
    // net weight

    $("#editgoldNetWeight").show();
    $("#editsilverNetWeight").hide();
    $("#editplatinumNetWeight").show();
  } else if (currentOption == 4) {
    // purchase form
    $("#PurchareforGold").show();
    $("#PurchareforSilver").hide();
    $("#PurchaseFormDiamond").show();
    $("#PurchareforPlatinum").hide();
    // carat
    $("#for-diamond").show();

    $("#EditCaratGold").show();
    $("#EditCaratDiamond").show();
    $("#EditCaratSilver").hide();
    $("#EditCaratPlatinum").hide();
    // net weight

    $("#editgoldNetWeight").show();
    $("#editsilverNetWeight").hide();
    $("#editplatinumNetWeight").show();
  } else if (currentOption == 5) {
    // purchase form
    $("#PurchareforGold").show();
    $("#PurchareforSilver").hide();
    $("#PurchaseFormDiamond").show();
    $("#PurchareforPlatinum").show();
    // carat

    $("#for-diamond").show();
    $("#EditCaratGold").show();
    $("#EditCaratDiamond").show();
    $("#EditCaratSilver").hide();
    $("#EditCaratPlatinum").show();
    $("#EditCaratPlatinum").hide();
    // net weight

    $("#editgoldNetWeight").show();
    $("#editsilverNetWeight").hide();
    $("#editplatinumNetWeight").show();
  } else if (currentOption == 6) {
    // purchase form
    $("#PurchareforGold").hide();
    $("#PurchareforSilver").show();
    $("#PurchaseFormDiamond").hide();
    $("#PurchareforPlatinum").hide();
    // carat

    $("#for-diamond").hide();
    $("#EditCaratGold").hide();
    $("#EditCaratDiamond").hide();
    $("#EditCaratSilver").show();
    $("#EditCaratPlatinum").hide();
    // net weight

    $("#editgoldNetWeight").hide();
    $("#editsilverNetWeight").show();
    $("#editplatinumNetWeight").hide();
  } else if (currentOption == 7) {
    // purchase form
    $("#PurchareforGold").hide();
    $("#PurchareforSilver").show();
    $("#PurchaseFormDiamond").hide();
    $("#PurchareforPlatinum").show();
    // carat
    $("#for-diamond").hide();
    $("#EditCaratGold").hide();
    $("#EditCaratDiamond").hide();
    $("#EditCaratSilver").show();
    $("#EditCaratPlatinum").show();
    // net weight

    $("#editgoldNetWeight").hide();
    $("#editsilverNetWeight").show();
    $("#editplatinumNetWeight").show();
  } else if (currentOption == 8) {
    // purchase form
    $("#PurchareforGold").hide();
    $("#PurchareforSilver").show();
    $("#PurchaseFormDiamond").show();
    $("#PurchareforPlatinum").hide();
    // carat
    $("#for-diamond").show();
    $("#EditCaratGold").hide();
    $("#EditCaratDiamond").show();
    $("#EditCaratSilver").show();
    $("#EditCaratPlatinum").hide();
    // net weight

    $("#editgoldNetWeight").hide();
    $("#editsilverNetWeight").show();
    $("#editplatinumNetWeight").hide();
  } else if (currentOption == 9) {
    // purchase form
    $("#PurchareforGold").hide();
    $("#PurchareforSilver").show();
    $("#PurchaseFormDiamond").show();
    $("#PurchareforPlatinum").show();
    // carat
    $("#for-diamond").show();
    $("#EditCaratGold").hide();
    $("#EditCaratDiamond").show();
    $("#EditCaratSilver").show();
    $("#EditCaratPlatinum").show();
    // net weight

    $("#editgoldNetWeight").hide();
    $("#editsilverNetWeight").show();
    $("#editplatinumNetWeight").show();
  } else if (currentOption == 10) {
    // purchase form
    $("#PurchareforGold").hide();
    $("#PurchareforSilver").hide();
    $("#PurchaseFormDiamond").show();
    $("#PurchareforPlatinum").show();
    // carat
    $("#for-diamond").show();
    $("#EditCaratGold").hide();
    $("#EditCaratDiamond").show();
    $("#EditCaratSilver").hide();
    $("#EditCaratPlatinum").show();
    // net weight

    $("#editgoldNetWeight").hide();
    $("#editsilverNetWeight").hide();
    $("#editplatinumNetWeight").show();
  } else if (currentOption == 11) {
    // purchase form
    $("#PurchareforGold").hide();
    $("#PurchareforSilver").hide();
    $("#PurchaseFormDiamond").hide();
    $("#PurchareforPlatinum").show();
    // carat
    $("#for-diamond").hide();
    $("#EditCaratGold").hide();
    $("#EditCaratDiamond").hide();
    $("#EditCaratSilver").hide();
    $("#EditCaratPlatinum").show();
    // net weight

    $("#editgoldNetWeight").hide();
    $("#editsilverNetWeight").hide();
    $("#editplatinumNetWeight").show();
  } else if (currentOption == 12) {
    // purchase form
    $("#PurchareforGold").hide();
    $("#PurchareforSilver").hide();
    $("#PurchaseFormDiamond").show();
    $("#PurchareforPlatinum").hide();
    // carat

    $("#for-diamond").show();
    $("#EditCaratGold").hide();
    $("#EditCaratDiamond").show();
    $("#EditCaratSilver").hide();
    $("#EditCaratPlatinum").hide();
    // net weight

    $("#editgoldNetWeight").hide();
    $("#editsilverNetWeight").hide();
    $("#editplatinumNetWeight").hide();
  }
});

// edit form on option change
$(document).ready(function () {
  $("#editPurchaseCat").change(function () {
    var optionID = $("#editPurchaseCat").val();
    $("#purchaseDetailBox").prop("checked", false);
    $("#huidDetailBox").prop("checked", false);
    $("#otherDetailBox").prop("checked", false);
    $("#stoneDetailBox").prop("checked", false);
    if (optionID == 1) {
      alert("gemstone selected");
    }
    // for gold
    else if (optionID == 2) {
      // purchase form
      $("#PurchareforGold").show();
      $("#PurchareforSilver").hide();
      $("#Purcharefordiamond").hide();
      $("#PurchareforPlatinum").hide();
      // carat
      $("#for-diamond").hide();
      $("#EditCaratGold").show();
      $("#EditCaratDiamond").hide();
      $("#EditCaratSilver").hide();
      $("#EditCaratPlatinum").hide();
    } else if (optionID == 3) {
      // purchase form
      $("#PurchareforGold").show();
      $("#PurchareforSilver").hide();
      $("#Purcharefordiamond").hide();
      $("#PurchareforPlatinum").show();
      // carat

      $("#for-diamond").hide();
      $("#EditCaratGold").show();
      $("#EditCaratDiamond").hide();
      $("#EditCaratSilver").hide();
      $("#EditCaratPlatinum").show();
    } else if (optionID == 4) {
      // purchase form
      $("#PurchareforGold").show();
      $("#PurchareforSilver").hide();
      $("#PurchaseFormDiamond").show();
      $("#PurchareforPlatinum").hide();
      // carat
      $("#for-diamond").show();

      $("#EditCaratGold").show();
      $("#EditCaratDiamond").show();
      $("#EditCaratSilver").hide();
      $("#EditCaratPlatinum").hide();
    } else if (optionID == 5) {
      // purchase form
      $("#PurchareforGold").show();
      $("#PurchareforSilver").hide();
      $("#PurchaseFormDiamond").show();
      $("#PurchareforPlatinum").show();
      // carat

      $("#for-diamond").show();
      $("#EditCaratGold").show();
      $("#EditCaratDiamond").show();
      $("#EditCaratSilver").hide();
      $("#EditCaratPlatinum").show();
    } else if (optionID == 6) {
      // purchase form
      $("#PurchareforGold").hide();
      $("#PurchareforSilver").show();
      $("#PurchaseFormDiamond").hide();
      $("#PurchareforPlatinum").hide();
      // carat

      $("#for-diamond").hide();
      $("#EditCaratGold").hide();
      $("#EditCaratDiamond").hide();
      $("#EditCaratSilver").show();
      $("#EditCaratPlatinum").hide();
    } else if (optionID == 7) {
      // purchase form
      $("#PurchareforGold").hide();
      $("#PurchareforSilver").show();
      $("#PurchaseFormDiamond").hide();
      $("#PurchareforPlatinum").show();
      // carat
      $("#for-diamond").hide();
      $("#EditCaratGold").hide();
      $("#EditCaratDiamond").hide();
      $("#EditCaratSilver").show();
      $("#EditCaratPlatinum").show();
    } else if (optionID == 8) {
      // purchase form
      $("#PurchareforGold").hide();
      $("#PurchareforSilver").show();
      $("#PurchaseFormDiamond").show();
      $("#PurchareforPlatinum").hide();
      // carat
      $("#for-diamond").show();
      $("#EditCaratGold").hide();
      $("#EditCaratDiamond").show();
      $("#EditCaratSilver").show();
      $("#EditCaratPlatinum").hide();
    } else if (optionID == 9) {
      // purchase form
      $("#PurchareforGold").hide();
      $("#PurchareforSilver").show();
      $("#PurchaseFormDiamond").show();
      $("#PurchareforPlatinum").show();
      // carat
      $("#for-diamond").show();
      $("#EditCaratGold").hide();
      $("#EditCaratDiamond").show();
      $("#EditCaratSilver").show();
      $("#EditCaratPlatinum").show();
    } else if (optionID == 10) {
      // purchase form
      $("#PurchareforGold").hide();
      $("#PurchareforSilver").hide();
      $("#PurchaseFormDiamond").show();
      $("#PurchareforPlatinum").show();
      // carat
      $("#for-diamond").show();
      $("#EditCaratGold").hide();
      $("#EditCaratDiamond").show();
      $("#EditCaratSilver").hide();
      $("#EditCaratPlatinum").show();
    } else if (optionID == 11) {
      // purchase form
      $("#PurchareforGold").hide();
      $("#PurchareforSilver").hide();
      $("#PurchaseFormDiamond").hide();
      $("#PurchareforPlatinum").show();
      // carat
      $("#for-diamond").hide();
      $("#EditCaratGold").hide();
      $("#EditCaratDiamond").hide();
      $("#EditCaratSilver").hide();
      $("#EditCaratPlatinum").show();
    } else if (optionID == 12) {
      // purchase form
      $("#PurchareforGold").hide();
      $("#PurchareforSilver").hide();
      $("#PurchaseFormDiamond").show();
      $("#PurchareforPlatinum").hide();
      // carat

      $("#for-diamond").show();
      $("#EditCaratGold").hide();
      $("#EditCaratDiamond").show();
      $("#EditCaratSilver").hide();
      $("#EditCaratPlatinum").hide();
    }
  });
});

// product form work

$(document).ready(function () {
  $("#otherDetailBox").click(function () {
    var inputValue = $(this).attr("value");
    if ($("#productCatChange").val() == 0) {
      $("#otherDetailBox").prop("checked", false);
      alert("Please Select Category First");
    } else {
      $("." + inputValue).toggle();
    }
  });
  $("#stoneDetailBox").click(function () {
    var inputValue = $(this).attr("value");
    if ($("#productCatChange").val() == 0) {
      $("#stoneDetailBox").prop("checked", false);
      alert("Please Select Category First");
    } else {
      $("." + inputValue).toggle();
    }
  });
  $("#huidDetailBox").click(function () {
    var inputValue = $(this).attr("value");
    if ($("#productCatChange").val() == 0) {
      $("#huidDetailBox").prop("checked", false);
      alert("Please Select Category First");
    } else {
      $("." + inputValue).toggle();
    }
  });
  $("#purchaseDetailBox").click(function () {
    var inputValue = $(this).attr("value");
    if ($("#productCatChange").val() == 0) {
      $("#purchaseDetailBox").prop("checked", false);
      alert("Please Select Category First");
    } else {
      $("." + inputValue).toggle();
    }
  });

  // if($('#otherDetailBox').is(":checked")   )
  // {
  //     alert('helo');
  // }
  // else
  // {
  //     alert('no')
  // }
});
// product form show according to category ajax options
$(document).ready(function () {
  function fetch_form(optionID) {
    $.ajax({
      url: BASE_URL + "/getForm?optionid=" + optionID,

      success: function (data) {
        $("#form-change").html(data);
      },
    });
  }
  function setCaratOption(optionID) {
    $.ajax({
      url: BASE_URL + "/setCaratOption?optionid=" + optionID,

      success: function (data) {
        $("#setCarat").html(data);
      },
    });
  }

  $("#productCatChange").change(function () {
    var optionID = $("#productCatChange").val();
    $("#purchaseDetailBox").prop("checked", false);
    $("#huidDetailBox").prop("checked", false);
    $("#otherDetailBox").prop("checked", false);
    $("#stoneDetailBox").prop("checked", false);

    if (optionID == 12) {
      $(".hide-on-diamond").hide();
      $(".for-diamond").show();
    } else if (
      optionID == 4 ||
      optionID == 5 ||
      optionID == 8 ||
      optionID == 9 ||
      optionID == 10
    ) {
      $(".for-diamond").show();
    } else {
      $(".hide-on-diamond").show();
      $(".for-diamond").hide();
    }
    // for silver
    if (optionID == 6 || optionID == 7 || optionID == 8 || optionID == 9) {
      $("#silverNetWeight").show();
    } else {
      $("#silverNetWeight").hide();
    }
    // for gold
    if (optionID == 2 || optionID == 3 || optionID == 4 || optionID == 5) {
      $("#goldNetWeight").show();
    } else {
      $("#goldNetWeight").hide();
    }
    // for platinum
    if (
      optionID == 3 ||
      optionID == 5 ||
      optionID == 7 ||
      optionID == 9 ||
      optionID == 10 ||
      optionID == 11
    ) {
      $("#platinumNetWeight").show();
    } else {
      $("#platinumNetWeight").hide();
    }

    // alert(optionID)
    fetch_form(optionID);
    setCaratOption(optionID);
  });
});

// {{-- show password row in salesman--}}
function showpassrow() {
  var x = document.getElementById("passwordrow");
  x.style.display = "block";
}
function showcompanypassrow() {
  var x = document.getElementById("companypasswordrow");
  x.style.display = "block";
}
function showAdminPass() {
  var x = document.getElementById("adminPasswordRow");
  x.style.display = "block";
}

// delete salesman model
function delteSalesman($id) {
  $("#modal-default").modal("show");
  $("#delteinput").val($id);
}

// delete product category model
function deleteProductCat($id) {
  $("#modal-default").modal("show");
  $("#deleteProductCategoryinput").val($id);
}

// delete Order model
function delteOrder($id) {
  $("#modal-default").modal("show");
  $("#deleteOrderInput").val($id);
}

// SEARCING SALESMAN
$(document).ready(function () {
  function fetch_data(page, sort_type = "", sort_by = "", search = "") {
    $.ajax({
      url:
        BASE_URL +
        "/searchSalesman?page=" +
        page +
        "&sorttype=" +
        sort_type +
        "&sortby=" +
        sort_by +
        "&search=" +
        search,

      success: function (data) {
        $("#salesmanbody").html(data);
      },
    });
  }

  $(document).on("keyup", "#searchSalesman", function () {
    var search = $("#searchSalesman").val();
    var column_name = $("#hidden_column_name").val();
    var sort_type = $("#hidden_sort_type").val();
    var page = $("#hidden_page").val();
    fetch_data(page, sort_type, column_name, search);
  });
  $(document).on("click", ".salesmanarrow", function () {
    var column_name = $(this).data("column_name");
    var order_type = $(this).data("sorting_type");
    var reverse_order = "";
    if (order_type == "asc") {
      $(this).data("sorting_type", "desc");
      reverse_order = "desc";
    } else {
      $(this).data("sorting_type", "asc");
      reverse_order = "asc";
    }
    $("#hidden_column_name").val(column_name);
    $("#hidden_sort_type").val(reverse_order);
    var page = $("#hidden_page").val();
    var search = $("#searchSalesman").val();
    fetch_data(page, reverse_order, column_name, search);
  });
});

//  SEARCHING CARTEGORY
$(document).ready(function () {
  function fetch_product_cat_data(
    page,
    sort_type = "",
    sort_by = "",
    searchCat = ""
  ) {
    $.ajax({
      url:
        BASE_URL +
        "/searchProductCategory?page=" +
        page +
        "&sorttype=" +
        sort_type +
        "&sortby=" +
        sort_by +
        "&searchCat=" +
        searchCat,

      success: function (data) {
        $("#productCatTableBody").html(data);
      },
    });
  }

  $(document).on("keyup", "#searchProductCat", function () {
    var searchCat = $("#searchProductCat").val();
    var column_name = $("#hidden_cat_column_name").val();
    var sort_type = $("#hidden_cat_sort_type").val();
    var page = $("#hidden_cat_page").val();
    fetch_product_cat_data(page, sort_type, column_name, searchCat);
  });
  $(document).on("click", ".productCatArrow", function () {
    var column_name = $(this).data("column_name");
    var order_type = $(this).data("sorting_type");
    var reverse_order = "";
    if (order_type == "asc") {
      $(this).data("sorting_type", "desc");
      reverse_order = "desc";
    } else {
      $(this).data("sorting_type", "asc");
      reverse_order = "asc";
    }
    $("#hidden_cat_column_name").val(column_name);
    $("#hidden_cat_sort_type").val(reverse_order);
    var page = $("#hidden_cat_page").val();
    var searchCat = $("#searchProductCat").val();
    fetch_product_cat_data(page, reverse_order, column_name, searchCat);
  });
});

// search dealer
$(document).ready(function () {
  function fetch_dealer_data(page, sort_type = "", sort_by = "", search = "") {
    $.ajax({
      url:
        BASE_URL +
        "/searchdealers?page=" +
        page +
        "&sorttype=" +
        sort_type +
        "&sortby=" +
        sort_by +
        "&search=" +
        search,

      success: function (data) {
        $("#dealerTableBody").html(data);
      },
    });
  }

  $(document).on("keyup", "#dealerInput", function () {
    var searchdealer = $("#dealerInput").val();
    var column_name = $("#hidden_dealer_column_name").val();
    var sort_type = $("#hidden_dealer_sort_type").val();
    var page = $("#hidden_dealer_page").val();

    fetch_dealer_data(page, sort_type, column_name, searchdealer);
  });
  $(document).on("click", ".dealersArrow", function () {
    var column_name = $(this).data("column_name");
    var order_type = $(this).data("sorting_type");
    var reverse_order = "";
    if (order_type == "asc") {
      $(this).data("sorting_type", "desc");
      reverse_order = "desc";
    } else {
      $(this).data("sorting_type", "asc");
      reverse_order = "asc";
    }
    $("#hidden_dealer_column_name").val(column_name);
    $("#hidden_dealer_sort_type").val(reverse_order);
    var page = $("#hidden_dealer_page").val();
    var searchCat = $("#dealerInput").val();
    fetch_dealer_data(page, reverse_order, column_name, searchCat);
  });
});

//  delete dealer
function delteProductCat($iDealerID) {
  $("#modal-default").modal("show");
  $("#deletedealerinput").val($iDealerID);
}

// delete carat
function delteCarat($iCaratID) {
  $("#modal-default").modal("show");
  $("#deletecaratinput").val($iCaratID);
}

// search carat
$(document).ready(function () {
  function fetch_carat_data(page, sort_type = "", sort_by = "", search = "") {
    $.ajax({
      url:
        BASE_URL +
        "/searchcarat?page=" +
        page +
        "&sorttype=" +
        sort_type +
        "&sortby=" +
        sort_by +
        "&search=" +
        search,

      success: function (data) {
        $("#caratTableBody").html(data);
      },
    });
  }

  $(document).on("keyup", "#caratInputSearch", function () {
    var searchcarat = $("#caratInputSearch").val();
    var column_name = $("#hidden_carat_column_name").val();
    var sort_type = $("#hidden_carat_sort_type").val();
    var page = $("#hidden_carat_page").val();
    // alert(searchdealer);
    fetch_carat_data(page, sort_type, column_name, searchcarat);
  });
  $(document).on("click", ".CaratArrow", function () {
    var column_name = $(this).data("column_name");
    var order_type = $(this).data("sorting_type");
    var reverse_order = "";
    if (order_type == "asc") {
      $(this).data("sorting_type", "desc");
      reverse_order = "desc";
    } else {
      $(this).data("sorting_type", "asc");
      reverse_order = "asc";
    }
    $("#hidden_carat_column_name").val(column_name);
    $("#hidden_carat_sort_type").val(reverse_order);

    var page = $("#hidden_carat_page").val();
    var searchCat = $("#caratInputSearch").val();
    fetch_carat_data(page, reverse_order, column_name, searchCat);
  });
});

// delete company

function deleteCompany($iCompanyID) {
  $("#modal-default").modal("show");
  $("#deletecompanyinput").val($iCompanyID);
}

// search admin
$(document).ready(function () {
  function fetch_admin_data(page, sort_type = "", sort_by = "", search = "") {
    $.ajax({
      url:
        BASE_URL +
        "/adminsearch?page=" +
        page +
        "&sorttype=" +
        sort_type +
        "&sortby=" +
        sort_by +
        "&search=" +
        search,

      success: function (data) {
        $("#adminTable").html(data);
      },
    });
  }

  $(document).on("keyup", "#AdminSearch", function () {
    var searchadmin = $("#AdminSearch").val();
    var column_name = $("#hidden_admin_column_name").val();
    var sort_type = $("#hidden_admin_sort_type").val();
    var page = $("#hidden_admin_page").val();
    // alert(page);
    fetch_admin_data(page, sort_type, column_name, searchadmin);
  });
  $(document).on("click", ".AdminArrow", function () {
    var column_name = $(this).data("column_name");
    var order_type = $(this).data("sorting_type");
    var reverse_order = "";
    if (order_type == "asc") {
      $(this).data("sorting_type", "desc");
      reverse_order = "desc";
    } else {
      $(this).data("sorting_type", "asc");
      reverse_order = "asc";
    }
    $("#hidden_admin_column_name").val(column_name);
    $("#hidden_admin_sort_type").val(reverse_order);

    var page = $("#hidden_admin_page").val();
    var searchCat = $("#AdminSearch").val();
    fetch_admin_data(page, reverse_order, column_name, searchCat);
  });
});

// search company
$(document).ready(function () {
  function fetch_company_data(page, sort_type = "", sort_by = "", search = "") {
    $.ajax({
      url:
        BASE_URL +
        "/searchcompany?page=" +
        page +
        "&sorttype=" +
        sort_type +
        "&sortby=" +
        sort_by +
        "&search=" +
        search,

      success: function (data) {
        $("#CompanyTableBody").html(data);
      },
    });
  }

  $(document).on("keyup", "#companySearchInput", function () {
    var searchcompany = $("#companySearchInput").val();
    var column_name = $("#hidden_company_column_name").val();
    var sort_type = $("#hidden_company_sort_type").val();
    var page = $("#hidden_company_page").val();

    fetch_company_data(page, sort_type, column_name, searchcompany);
  });
  $(document).on("click", ".companyArrow", function () {
    var column_name = $(this).data("column_name");
    var order_type = $(this).data("sorting_type");
    var reverse_order = "";
    if (order_type == "asc") {
      $(this).data("sorting_type", "desc");
      reverse_order = "desc";
    } else {
      $(this).data("sorting_type", "asc");
      reverse_order = "asc";
    }
    $("#hidden_company_column_name").val(column_name);
    $("#hidden_company_sort_type").val(reverse_order);

    var page = $("#hidden_company_page").val();
    var searchCat = $("#companySearchInput").val();
    fetch_company_data(page, reverse_order, column_name, searchCat);
  });
});

// orders search
$(document).ready(function () {
  function fetch_orders_data(page, sort_type = "", sort_by = "", search = "") {
    $.ajax({
      url:
        BASE_URL +
        "/searchorders?page=" +
        page +
        "&sorttype=" +
        sort_type +
        "&sortby=" +
        sort_by +
        "&search=" +
        search,

      success: function (data) {
        $("#OrderTable").html(data);
      },
    });
  }

  $(document).on("keyup", "#SearchOrders", function () {
    var searchOrders = $("#SearchOrders").val();
    var column_name = $("#hidden_orders_column_name").val();
    var sort_type = $("#hidden_orders_sort_type").val();
    var page = $("#hidden_orders_page").val();

    fetch_orders_data(page, sort_type, column_name, searchOrders);
  });
  $(document).on("click", ".OrdersArrow", function () {
    var column_name = $(this).data("column_name");
    var order_type = $(this).data("sorting_type");
    var reverse_order = "";
    if (order_type == "asc") {
      $(this).data("sorting_type", "desc");
      reverse_order = "desc";
    } else {
      $(this).data("sorting_type", "asc");
      reverse_order = "asc";
    }
    $("#hidden_orders_column_name").val(column_name);
    $("#hidden_orders_sort_type").val(reverse_order);

    var page = $("#hidden_orders_page").val();
    var searchCat = $("#SearchOrders").val();
    fetch_orders_data(page, reverse_order, column_name, searchCat);
  });
});

// repairing search
$(document).ready(function () {
  function fetch_repairing_data(
    page,
    sort_type = "",
    sort_by = "",
    search = ""
  ) {
    $.ajax({
      url:
        BASE_URL +
        "/searchrepairing?page=" +
        page +
        "&sorttype=" +
        sort_type +
        "&sortby=" +
        sort_by +
        "&search=" +
        search,

      success: function (data) {
        $("#RepairingTable").html(data);
      },
    });
  }

  $(document).on("keyup", "#SearchRepairing", function () {
    var saerchRepair = $("#SearchRepairing").val();
    var column_name = $("#hidden_repairing_column_name").val();
    var sort_type = $("#hidden_repairing_sort_type").val();
    var page = $("#hidden_repairing_page").val();
    // alert(saerchRepair)
    fetch_repairing_data(page, sort_type, column_name, saerchRepair);
  });
  $(document).on("click", ".RepairArrow", function () {
    var column_name = $(this).data("column_name");
    var order_type = $(this).data("sorting_type");
    var reverse_order = "";
    if (order_type == "asc") {
      $(this).data("sorting_type", "desc");
      reverse_order = "desc";
    } else {
      $(this).data("sorting_type", "asc");
      reverse_order = "asc";
    }
    $("#hidden_repairing_column_name").val(column_name);
    $("#hidden_repairing_sort_type").val(reverse_order);

    var page = $("#hidden_repairing_page").val();
    var searchCat = $("#SearchRepairing").val();

    fetch_repairing_data(page, reverse_order, column_name, searchCat);
  });
});

// delete admin
function delteAdmin($iAdminID) {
  $("#modal-default").modal("show");
  $("#deleteAdmininput").val($iAdminID);
}

// deleteRepair
function deleteRepair($repairID) {
  $("#modal-default").modal("show");
  $("#deleteRepairingInput").val($repairID);
}
// product image logo live preview
const ProductImage = document.getElementById("productImage")??undefined;
const productImagePreview = document.getElementById("imagepreview")??undefined;
ProductImage?.addEventListener("change", function () {
  const productImageFIle = this.files[0];
  if (productImageFIle) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      productImagePreview.setAttribute("src", this.result);
    });
    reader.readAsDataURL(productImageFIle);
  }
});

// company logo live preview
const logo = document.getElementById("Companylogo")??0;
const CompanyLogoPreview = document.getElementById("CompanyLogoPreview")??0;

logo.addEventListener("change", function () {
  const CompanyLogofile = this.files[0];
  if (CompanyLogofile) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      CompanyLogoPreview.setAttribute("src", this.result);
    });
    reader.readAsDataURL(CompanyLogofile);
  }
});



