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

var globalObj = {};
var tx;

$(document).ready(function() {
    $("#id01").show();
    $('#mainContents').hide();
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
    $("#blockchainAddressText").hide();
    $("#blockAddress").hide();

    var statementId = window.location.href.split("?")[1].split("=")[1];

    $.ajax({
        type: 'GET',
        contentType: "application/json",
        url: "http://115.127.24.181:9091/statement/" + statementId,
        success: function(response) {
            console.log(response);
            globalObj = response;

            $("#fullNameIDTd").html(response.account.customer.customerName);
            $("#accountNumber").html(response.account.accountNumber);
            $("#openingBalance").html(String(response.opening_balance) + ".00");
            $("#closingBalance").html(String(response.closing_balance) + ".00");
            $("#startDate").html(convertTime(response.startDate));
            $("#endDate").html(convertTime(response.endDate));
            $("#totalCredit").html(String(response.credits) + ".00");
            $("#totalDebit").html(String(response.debits) + ".00");
            $("#creditCount").html(String(response.cr_count) + " Times");
            $("#debitCounts").html(String(response.dr_count) + " Times");
            $("#unCollected").html(String(response.uncollected_funds) + ".00");
            $("#currencylabel").html("Bangladeshi Taka");
            $("#blockAddress").html(response.tx_hash);
            $("#blockAddress").attr('href', 'https://ropsten.etherscan.io/tx/' + response.tx_hash);
            tx = response.tx_hash;
        },
        error: function(response) {
            // console.log(response);
            alert("No Related Information Found");
            $("#verifyButton").remove();
            $("#verifyIconFail").show();
        }
    });

    $("#verifyButton").click(function() {

        $.ajax({
            type: "get",
            url: "http://115.127.24.181:9092/verify/" + tx,
            data: "data",
            contentType: "application/json",
            success: function(response) {
                var block = JSON.parse(response);
                console.log(block);
                if ((globalObj.account.customer.customerName == block.accountName) &&
                    (globalObj.account.accountNumber == block.accountNumber) &&
                    (globalObj.closing_balance == block.endBalance) &&
                    (globalObj.cr_count == block.crCount) &&
                    (globalObj.credits == block.totalCr) &&
                    (globalObj.debits == block.totalDb) &&
                    (globalObj.dr_count == block.drCount) &&
                    (globalObj.endDate.split("T")[0] == block.dateEnd) &&
                    (globalObj.opening_balance == block.openingBal) &&
                    (globalObj.startDate.split("T")[0] == block.dateStart)) {

                    afterSuccess();
                } else {
                    afterFailure();
                }
            }
        });

    });

    $('#loginbtn').click(function() {
        var username = $("#userName").val();
        var password = $("#password").val();
        var loginObj = {
            password: password,
            email: username
        }
        $.ajax({
            type: "post",
            url: "http://115.127.24.181:9091/auth/login",
            data: loginObj,
            success: function(response) {
                console.log(response);
                $('#mainContents').show();
                document.getElementById('id01').style.display = 'none';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });


    function afterSuccess() {
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
                                        ).fadeIn(
                                            1817,
                                            function() {
                                                $
                                                    (
                                                        "#blockchainAddressText"
                                                    )
                                                    .fadeIn(
                                                        300
                                                    );
                                                $
                                                    (
                                                        "#blockAddress"
                                                    )
                                                    .show();
                                            }
                                        );;
                                });
                        });
                });
            });

        });
    }

    function afterFailure() {
        $("#verifyIconFail").show();

    }

});