var id = $("#customerNumberTextbox").val();
var start = $("#startDate").val();
var end = $("#endDate").val();
var totalDebit = 0;
var totalCredit = 0;
var drCount = 0;
var crCount = 0;
$("#showAccountbtn").click(function() {


    // console.log(id, start, end);

    let customerInfo = {
        customerId: id,
        startDate: start,
        endDate: end
    };
    // console.log(customerInfo);


    $.ajax({
        type: "POST",
        url: "http://localhost:9091/transaction/by-date-range",
        data: customerInfo,
        dataType: "json",
        success: function(response) {

            for (var i = 0; i < response.transactions.length; i++) {
                totalDebit = totalDebit + response.transactions[i].debit;
                if (response.transactions[i].debit > 0) {
                    drCount += 1;
                }
                response.transactions[i].debit = (response.transactions[i].debit.toString()) + ".00";

                totalCredit = totalCredit + response.transactions[i].credit;
                if (response.transactions[i].credit > 0) {
                    crCount += 1;
                }
                response.transactions[i].credit = (response.transactions[i].credit.toString()) + ".00";

                if (response.transactions[i].reference == "NULL") {
                    response.transactions[i].reference = '';
                }
            }

            $("#finalDebits").html(totalDebit.toString() + ".00");
            $("#finalCredits").html(totalCredit.toString() + ".00");
            $("#openingBalanceFinal").html(response.accountOpeningBalance);
            $("#drCount").html(drCount);
            $("#crCount").html(crCount);

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
        },
        error: function(response) {
            console.log(response);

        }
    });

    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:9091/account/" + id,
        dataType: "json",
        success: function(response) {
            console.log(response);
            $("#accountNumber").html(response.accountInfo.accountNumber);
            $("#startDat").html(start);
            $("#endDat").html(end);
            $("#customerId").html(response.accountInfo.customer.id);
            $("#accountHolderName").html(response.accountInfo.customer.customerName);
            $("#accountHolderAddressHouse").html(response.accountInfo.customer.address);

        },
        error: function(response) {
            console.log(response);
        }
    });
});