$("#CreateCon").click(function() {
    var txHash = '';
    var obj = {

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
        url: "http://localhost:9092/nonce/0xeE21a5572f6089924AF72019F653E32812e87cF4",
        success: function(response) {
            console.log(response.nonce);
            let nonce = response.nonce;

            obj.nonce = nonce;

            // console.log("Aita holo amader Obj", obj);
            function genarateQR() {
                return new QRCode("qrcode", {
                    text: " http://127.0.0.1:9091/statement/" +
                        txHash,
                    width: $(this).width() / 11,
                    height: $(this).width() / 11,
                    colorDark: "#000000",
                    colorLight: "#FFFFFF",
                    correctLevel: QRCode.CorrectLevel.H
                });
            }

            $.ajax({
                type: 'post',
                contentType: "application/json",
                url: "http://localhost:9092/publish",
                data: JSON.stringify(obj),
                success: function(response) {
                    console.log(response);
                    txHash = response;
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
});