$("#CreateCon").click(function() {
    $("#publishingModal").modal();
    var txHash = '';
    var statementId = '';

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
                    text: "http://127.0.0.1:9091/statement/1",
                    width: $(this).width() / 10,
                    height: $(this).width() / 10,
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

                    $('#rowLoader').html("<h2>Data Successfully Published in Blockchain</h2>");
                    txHash = response;
                    genarateQR();
                    $("#CreateCon").attr("style", "visibility: hidden");
                    $("#createPdfbtn").attr("style", "visibility: visible");


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