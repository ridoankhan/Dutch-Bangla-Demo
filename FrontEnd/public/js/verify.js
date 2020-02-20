$(document).ready(function() {
    $("#verifyIconSuccess").hide();
    $("#verifyIconFail").hide();
    $("#one").hide();
    $("#two").hide();
    $("#three").hide();
    $("#four").hide();
    $("#five").hide();
    $("#six").hide();
    $("#iconOne").hide();
    $("#iconTwo").hide();
    $("#iconThree").hide();
    $("#iconFour").hide();
    $("#iconFive").hide();
    $("#iconSix").hide();
    $("#verifyIconFail").hide();

    var statementId = window.location.href.split("?")[1].split("=")[1];

    $.ajax({
        type: 'GET',
        contentType: "application/json",
        url: "http://115.127.24.181:9091/statement/" + statementId,
        success: function(response) {
            console.log(response);

            $("#fullNameIDTd").html(response.account.customer.customerName);
            $("#accountNumber").html(response.account.accountNumber);
            $("#openingBalance").html(String(response.opening_balance) + ".00");
            $("#closingBalance").html(String(response.closing_balance) + ".00");
            $("#startDate").html(response.startDate);
            $("#endDate").html(response.endDate);
            $("#totalCredit").html(response.credits);
            $("#totalDebit").html(response.debits);
            $("#creditCount").html(response.cr_count);
            $("#debitCounts").html(response.dr_count);
            $("#unCollected").html(response.uncollected_funds);
            $("#currencylabel").html("Bangladeshi Taka");

        },
        error: function(response) {
            // console.log(response);
            alert("No Related Information Found");
            $("#verifyButton").remove();
            $("#verifyIconFail").show();
        }
    });

    $("#verifyButton").click(function() {

        $("#one").fadeIn(1237, function() {
            $("#iconOne").fadeIn(300);
            $("#two").fadeIn(1152, function() {
                $("#iconTwo").fadeIn(350);
                $("#three").fadeIn(1346, function() {
                    $("#iconThree").fadeIn(323);
                    $("#four").fadeIn(1390,
                        function() {
                            $("#iconFour").fadeIn(
                                312);
                            $("#five").fadeIn(
                                1058,
                                function() {
                                    $(
                                            "#iconFive"
                                        )
                                        .fadeIn(
                                            320
                                        );
                                    $(
                                            "#six"
                                        )
                                        .fadeIn(
                                            1817,
                                            function() {
                                                $
                                                    (
                                                        "#iconSix"
                                                    )
                                                    .fadeIn(
                                                        300
                                                    );
                                                $
                                                    (
                                                        "#verifyIconSuccess"
                                                    )
                                                    .show();
                                            }
                                        );
                                });
                        });
                });
            });

        });
        // else {
        //     $("#verifyIconFail").show();
        // }
        // },



    });
});