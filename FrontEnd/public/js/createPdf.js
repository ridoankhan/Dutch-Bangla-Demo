$(document).ready(function() {
    const btnCreatePdf = $("#createPdfbtn");
    const lineHeigth = 3;
    const margins = {
        top: 25.4,
        bottom: 25.4,
        left: 15.85,
        width: 178.3,
    };
    let currentMarginTop = margins.top;

    let pdf = new jsPDF("p", "mm", [210, 297]);

    btnCreatePdf.click(function(e) {
        e.preventDefault();

        setPdfStyles();

        //adding rows
        addFirstRow();
        addSecondRow();
        addThirdRow();
        addFourthRow();
        addFifthRow();
        addSixthRow();
        addSeventhRow();

        pdf.save("stmt.pdf");
    });

    function setPdfStyles() {
        pdf.setFontSize(6);
        pdf.setFont("times");
        pdf.setFontType("normal");
        pdf.setTextColor(0, 0, 0);
    }

    function addFirstRow() {
        const numOfCols = 3;
        const marginTop = currentMarginTop;
        const colWidth = getColWidth(numOfCols);
        const branchMarginLeft = margins.left + colWidth / 2;
        const qrMarginLeft = branchMarginLeft + colWidth * 2;
        const branchInfo = [
            $("#bankName").text(),
            $("#bankBranchName").text(),
            $("#bankBranchAddressRoad").text(),
            $("#BankBranchAddressArea").text(),
            $("#BankBranchAddressCity").text(),
        ];

        let rowHeight = 0;
        let options = {};

        branchInfo.forEach(info => {
            let heightAdded = addText(
                info,
                branchMarginLeft,
                marginTop + rowHeight,
                colWidth,
                options,
            );
            rowHeight += heightAdded;
        });

        const qrHeight = addQrCode(
            qrMarginLeft,
            currentMarginTop,
            colWidth / 3,
            colWidth / 3,
        );
        rowHeight = adjustRowHeight(rowHeight, qrHeight);
        adjustTopMargin(rowHeight, 0);
    }

    function addSecondRow() {
        const numOfCols = 3;
        const colWidth = getColWidth(numOfCols);
        let rowHeight = 0;
        let colHeight = 0;

        //first column info
        const firstColInfo = [
            $("#accountHolderName").text(),
            $("#accountHolderAddressHouse").text(),
            $("#accountHolderAddressRoad").text(),
            $("#accountHolderAddressArea").text(),
            $("#accountHolderPostCode").text(),
        ];

        //second column empty

        /**
         * Third column info
         * Third column is divided in three separate columns
         */
        const thirdColFirstInfo = [
            `Acount Number`,
            `Period From`,
            `Page`,
            `Currency Name`,
            `Branch Code`,
            `Customer Id`,
        ];
        const thirdColSecondInfo = [":", ":", ":", ":", ":", ":"];
        const thirdColThirdInfo = [
            $("#accountNumber").text(),
            formatText($("#timePeriod").text()),
            $("#pageCount").text(),
            formatText($("#currencyName").text()),
            $("#branchCode").text(),
            $("#customerId").text(),
        ];

        /**
         * Adding first column to pdf
         * Column height is required
         * to adjust top margin of next row
         */
        colHeight = addColumn(
            firstColInfo,
            margins.left,
            currentMarginTop,
            colWidth,
            {},
        );
        rowHeight = adjustRowHeight(rowHeight, colHeight);

        colHeight = addColumn(
            thirdColFirstInfo,
            margins.left + (colWidth * 3) / 2,
            currentMarginTop,
            colWidth,
            {},
        );
        colHeight = addColumn(
            thirdColSecondInfo,
            margins.left + (colWidth * 4) / 2.2,
            currentMarginTop,
            colWidth,
            {},
        );
        colHeight = addColumn(
            thirdColThirdInfo,
            margins.left + (colWidth * 4) / 2.1,
            currentMarginTop,
            colWidth,
            {},
        );
        rowHeight = adjustRowHeight(rowHeight, colHeight);
        adjustTopMargin(rowHeight, 0);
    }

    function addThirdRow() {
        const numOfCols = 4;
        const colWidth = getColWidth(numOfCols);
        let rowHeight = addText(
            "ONLINE STATEMENT",
            margins.left + colWidth,
            currentMarginTop,
            colWidth,
            {},
        );
        adjustTopMargin(rowHeight, 0);
    }

    function addFourthRow() {
        const table = $("#mainTable");
        const data = pdf.autoTableHtmlToJson(table[0]);

        pdf.autoTable(data.columns, data.rows, {
            tableLineColor: [255, 255, 255],
            tableLineWidth: 0.2,
            styles: {
                font: "times",
                lineColor: [255, 255, 255],
                lineWidth: 0.2,
            },
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 6,
            },
            bodyStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 6,
            },
            footStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 8,
            },
            alternateRowStyles: {},
            columnStyles: {
                4: { halign: "right" },
                5: { halign: "right" },
                6: { halign: "right" },
            },
            startY: currentMarginTop,
        });

        adjustTopMargin(
            pdf.previousAutoTable.finalY - currentMarginTop,
            lineHeigth * 2,
        );
    }

    function addFifthRow() {
        const numOfCols = 5;
        const colWidth = getColWidth(numOfCols);
        const heightAdded = addText(
            "STATEMENT CLOSING BALANCE",
            margins.left + colWidth / 2,
            currentMarginTop,
            colWidth * 2,
            {},
        );

        const endingStatement = $("#endingStatement").text();
        let addedHeight = addText(
            endingStatement,
            margins.left + colWidth * 5,
            currentMarginTop,
            colWidth,
            { align: "right" },
        );

        adjustTopMargin(heightAdded, 0);
    }

    function addSixthRow() {
        const numOfCols = 5;
        const colWidth = getColWidth(numOfCols);
        let rowHeight = 0;
        let colHeight = 0;
        const firstColInfo = [
            "OPENNING BANALNCE",
            "DEBITS",
            "CREDITS",
            "UNCOLLECTED FUNDS",
        ];
        const secondColInfo = [
            $("#openingBalanceFinal").text(),
            $("#finalDebits").text(),
            $("#finalCredits").text(),
            formatText($("#uncollectedFunds").text()),
        ];
        const thirdColInfo = ["DRCOUNT", "CRCOUNT"];
        const fourthColInfo = [$("#drCount").text(), $("#crCount").text()];

        colHeight = addColumn(
            firstColInfo,
            margins.left + colWidth / 2,
            currentMarginTop,
            colWidth,
            {},
        );
        rowHeight = adjustRowHeight(rowHeight, colHeight);
        colHeight = addColumn(
            secondColInfo,
            margins.left + (colWidth * 3) / 2,
            currentMarginTop,
            colWidth,
            { align: "right" },
        );
        rowHeight = adjustRowHeight(rowHeight, colHeight);
        colHeight = addColumn(
            thirdColInfo,
            margins.left + colWidth * 2,
            currentMarginTop + lineHeigth,
            colWidth,
            {},
        );
        colHeight = addColumn(
            fourthColInfo,
            margins.left + (colWidth * 5) / 2,
            currentMarginTop + lineHeigth,
            colWidth,
            {},
        );
        adjustTopMargin(rowHeight, lineHeigth);

        let heightAdded = addText(
            "*   =   UNAUTH ENTRY   /   R   =   REVERSAL",
            margins.left + colWidth / 2,
            currentMarginTop,
            colWidth * 2,
            {},
        );
        adjustTopMargin(heightAdded, lineHeigth);
        heightAdded = addText(
            `- - - - - - - - - - - - - - - - - - - - - - - - END OF STATEMENT - - - - - - - - - - - - - - - - - - - - - - - -`,
            margins.left + (colWidth * 3) / 2,
            currentMarginTop,
            colWidth * 3,
            {},
        );
        adjustTopMargin(heightAdded, lineHeigth);
    }

    function addSeventhRow() {
        const text = `Please note that any dispency must be notified to the bank within 15 days from the date of this statement.Else it will be deemed that the customer has found this statementis corret.`;
        const numOfCols = 1;
        const colWidth = getColWidth(numOfCols);
        let heightAdded = addText(
            text,
            margins.left,
            currentMarginTop,
            colWidth,
            {},
        );
        adjustTopMargin(heightAdded, lineHeigth);
    }

    function getColWidth(numOfCols) {
        return margins.width / numOfCols;
    }

    function adjustRowHeight(rowHeight, colHeight) {
        return rowHeight > colHeight ? rowHeight : colHeight;
    }

    function addColumn(firstColInfo, marginLeft, marginTop, colWidth, options) {
        let colHeight = 0;
        firstColInfo.forEach((info, index) => {
            let heightAdded = addText(
                info,
                marginLeft,
                marginTop + colHeight,
                colWidth,
                options,
            );
            colHeight += heightAdded;
        });

        return colHeight;
    }

    function formatText(text) {
        console.log(text);
        text.replace("\n", "");
        let textArray = text.split(" ");
        let finaltext = "";
        textArray.forEach(element => {
            if (element !== "") {
                finaltext = finaltext + element.replace("\n", "") + " ";
            }
        });
        console.log(finaltext);
        return finaltext.substring(1);
    }

    function addText(text, marginLeft, marginTop, colwidth, options) {
        const lines = pdf.splitTextToSize(text, colwidth, {
            orientation: "p",
            lineHeight: lineHeigth,
        });
        console.log(options);

        if (options) {
            pdf.text(marginLeft, marginTop, lines, options.align);
        } else {
            pdf.text(marginLeft, marginTop, lines);
        }

        return lines.length * lineHeigth;
    }

    function adjustTopMargin(rowHeight, height) {
        currentMarginTop = currentMarginTop + rowHeight + height;
    }

    function addQrCode(marginLeft, marginTop, width, height) {
        let x = marginLeft;
        let y = currentMarginTop;

        var qrImg = $("#qrcode").children()[1].src;
        pdf.addImage(qrImg, "PNG", marginLeft, marginTop, width, height);

        return height;
    }
});
