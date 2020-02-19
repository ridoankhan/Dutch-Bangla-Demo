let customerId;
let start;
let end;
let totalDebit = 0;
let totalCredit = 0;
let drCount = 0;
let crCount = 0;

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
    console.log(customerInfo);


    $.ajax({
        type: "POST",
        url: "http://localhost:9091/transaction/by-date-range",
        data: customerInfo,
        dataType: "json",
        success: function(response) {

            for (let i = 0; i < response.transactions.length; i++) {
                if (response.transactions[i].debit > 0) {
                    totalDebit = totalDebit + response.transactions[i].debit;
                    drCount += 1;
                }
                // console.log(response.transactions[i].debit);

                response.transactions[i].debit = (response.transactions[i].debit.toString()) + ".00";

                if (response.transactions[i].credit > 0) {
                    totalCredit = totalCredit + response.transactions[i].credit;
                    crCount += 1;
                }
                response.transactions[i].credit = (response.transactions[i].credit.toString()) + ".00";

                if (response.transactions[i].reference == "NULL") {
                    response.transactions[i].reference = '';
                }

                response.transactions[i].date = convertTime(response.transactions[i].date);

                response.transactions[i].balance = (response.transactions[i].balance.toString()) + ".00";

            }

            $("#finalDebits").html(totalDebit.toString() + ".00");
            $("#finalCredits").html(totalCredit.toString() + ".00");
            $("#openingBalanceFinal").html(response.accountOpeningBalance + ".00");
            $("#drCount").html(drCount);
            $("#crCount").html(crCount);
            let endingStatement = (response.accountOpeningBalance + totalCredit) - totalDebit;
            $("#endingStatement").html(endingStatement.toString() + ".00");


            $("#mainTable").DataTable({
                "paging": false,
                searching: false,
                "info": false,
                "ordering": false,
                data: response.transactions,
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
                url: "http://127.0.0.1:9091/account/" + customerId,
                dataType: "json",
                success: function(response) {
                    console.log(response);
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


                    $("#showAccountbtn").attr("style", "visibility: hidden");
                    $("#CreateCon").attr("style", "visibility: visible");
                    
                },
                error: function(response) {
                    console.log(response);
                }
            });
        },
        error: function(response) {
            console.log(response);

        }
    });
});