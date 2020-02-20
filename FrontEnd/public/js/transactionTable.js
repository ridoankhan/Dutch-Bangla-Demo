let customerId;
let start;
let end;
let totalDebit = 0;
let totalCredit = 0;
let drCount = 0;
let crCount = 0;
let endingStatement = 0;

function convertMonth(mon) {
    var mnth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return mnth[mon - 1];
}

function convertTime(time) {

    var inputTime = time;
    inputTime = inputTime.split("T")[0];
    var day = inputTime.split("-")[2];
    var month = inputTime.split("-")[1];
    var year = inputTime.split("-")[0];

    year = year % 100;
    month = convertMonth(month);
    var fullDate = day + "-" + month + "-" + year;
    return fullDate;
}

$("#showAccountbtn").click(function() {



    customerId = $("#customerNumberTextbox").val();
    start = $("#startDate").val();
    end = $("#endDate").val();

    let customerInfo = {
        customerId: customerId,
        startDate: start,
        endDate: end
    };
    // console.log(customerInfo);


    $.ajax({
        type: "POST",
        url: "http://115.127.24.181:9091/transaction/by-date-range",
        data: customerInfo,
        dataType: "json",
        success: function(response) {
            // console.log(response);



            for (let i = 0; i < response.accountInfo.length; i++) {
                if (response.accountInfo[i].debit > 0) {
                    totalDebit = totalDebit + response.accountInfo[i].debit;
                    drCount += 1;
                }
                // console.log(response.accountInfo[i].debit);

                response.accountInfo[i].debit = (response.accountInfo[i].debit.toString()) + ".00";

                if (response.accountInfo[i].credit > 0) {
                    totalCredit = totalCredit + response.accountInfo[i].credit;
                    crCount += 1;
                }
                response.accountInfo[i].credit = (response.accountInfo[i].credit.toString()) + ".00";

                if (response.accountInfo[i].reference == "NULL") {
                    response.accountInfo[i].reference = '';
                }

                response.accountInfo[i].date = convertTime(response.accountInfo[i].date);
                endingStatement = response.accountInfo[response.accountInfo.length - 1].balance;
                response.accountInfo[i].balance = (response.accountInfo[i].balance.toString()) + ".00";


            }
            response.accountInfo[0].debit = '';

            $("#finalDebits").html(totalDebit.toString() + ".00");
            $("#finalCredits").html(totalCredit.toString() + ".00");
            $("#openingBalanceFinal").html(response.accountInfo[0].balance);
            $("#drCount").html(drCount);
            $("#crCount").html(crCount);
            $("#endingStatement").html(endingStatement.toString() + ".00");


            $("#mainTable").DataTable({
                "paging": false,
                searching: false,
                "info": false,
                "ordering": false,
                data: response.accountInfo,
                columns: [{
                    'data': 'date'
                }, {
                    'data': 'brn'
                }, {
                    'data': 'description'
                }, {
                    'data': 'reference'
                }, {
                    'data': 'debit'
                }, {
                    'data': 'credit'
                }, {
                    'data': 'balance'
                }]
            });

            $.ajax({
                type: "GET",
                url: "http://115.127.24.181:9091/account/" + customerId,
                dataType: "json",
                success: function(response) {
                    // console.log(response);
                    $("#accountNumber").html(response.accountInfo.accountNumber);
                    $("#startDat").html(convertTime(start));
                    $("#endDat").html(convertTime(end));
                    $("#customerId").html(response.accountInfo.customer.id);
                    $("#accountHolderName").html(response.accountInfo.customer.customerName);
                    var home = response.accountInfo.customer.address.split(",")[0];
                    var area = response.accountInfo.customer.address.split(",")[1];
                    var city = response.accountInfo.customer.address.split(",")[2];
                    var postCode = response.accountInfo.customer.address.split(",")[3];
                    $("#accountHolderAddressHouse").html(home + ",");
                    $("#accountHolderAddressRoad").html(area + ",");
                    $("#accountHolderAddressArea").html(city + ",");
                    $("#accountHolderPostCode").html(postCode);


                    $("#showAccountbtn").remove();
                    $('#statement').attr("style", "visibility: visible");
                    $("#CreateCon").attr("style", "visibility: visible");

                },
                error: function(response) {
                    // console.log(response);
                }
            });
        },
        error: function(response) {
            // console.log(response);

        }
    });
});