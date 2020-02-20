$("#CreateCon").click(function() {
    $("#publishingModal").modal();
    var txHash = '';
    var statementId = '';

    var obj = {
        customerId: $("#customerId").html(),
        accountName: $("#accountHolderName").html(),
        accountNumber: $("#accountNumber").html(),
        totalCr: $("#finalCredits").html(),
        totalDb: $("#finalDebits").html(),
        openingBal: $("#openingBalanceFinal").html(),
        endBalance: $("#endingStatement").html(),
        crCount: $("#crCount").html(),
        drCount: $("#drCount").html(),
        dateStart: $("#startDate").val(),
        dateEnd: $("#endDate").val()

    };

    $.ajax({
        type: "GET",
        url: "http://115.127.24.181:9092/nonce/0xeE21a5572f6089924AF72019F653E32812e87cF4",
        success: function(response) {
            console.log(response.nonce);
            let nonce = response.nonce;

            obj.nonce = nonce;

            // console.log("Aita holo amader Obj", obj);
            function genarateQR() {
                return new QRCode("qrcode", {
                    text: "http://115.127.24.181:9090/verify.html?statementId=" + statementId,
                    width: $(this).width() / 15,
                    height: $(this).width() / 15,
                    colorDark: "#000000",
                    colorLight: "#FFFFFF",
                    correctLevel: QRCode.CorrectLevel.H
                });
            }

            $.ajax({
                type: 'post',
                contentType: "application/json",
                url: "http://115.127.24.181:9092/publish",
                data: JSON.stringify(obj),
                success: function(response) {
                    console.log(response);
                    $('#rowLoader').html("<h2 style='color:green;'>Data Successfully Published in Blockchain</h2>");
                    $("#modalTitleHead").hide();
                    txHash = response;
                    // genarateQR();
                    $("#CreateCon").remove();
                    $("#createPdfbtn").attr("style", "visibility: visible");

                    var statementObj = {
                        customerId: $("#customerId").html(),
                        startDate: $("#startDate").val(),
                        endDate: $("#endDate").val(),
                        tx_hash: txHash,
                        closing_balance: $("#endingStatement").html(),
                        opening_balance: $("#openingBalanceFinal").html(),
                        debits: $("#finalDebits").html(),
                        credits: $("#finalCredits").html(),
                        dr_count: $("#drCount").html(),
                        cr_count: $("#crCount").html(),
                        uncollected_funds: "0.00"
                    };
                    console.log("This is My own Created Object ",
                        statementObj);

                    $.ajax({
                        type: "post",
                        contentType: "application/json",
                        url: "http://115.127.24.181:9091/statement",
                        data: JSON.stringify(statementObj),
                        success: function(response) {
                            console.log(response);
                            statementId = response.id;
                            genarateQR();
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    });
                },
                error: function(err) {
                    console.log(err);

                }
            });
        },
        error: function(err) {
            console.log(err);

        }
    });
});