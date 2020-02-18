$("#showAccountbtn").click(function() {
    let id = $("#customerNumberTextbox").val();
    let start = $("#startDate").val();
    let end = $("#endDate").val();

    let customerInfo = {
        customerId: id,
        startDate: start,
        endDate: end
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:9091/transaction/by-date-range",
        data: customerInfo,
        dataType: "json",
        success: function(response) {
            console.log(response);

            $("#mainTable").DataTable({
                data: response.transactions,
                columns: [{
                    'data': 'transactionDate'
                }, {
                    'data': 'brn'
                }, {
                    'data': 'description'
                }, {
                    'data': 'reference'
                }, {
                    'data': 'debits'
                }, {
                    'data': 'credits'
                }, {
                    'data': 'balance'
                }]
            });

        }
    });
});