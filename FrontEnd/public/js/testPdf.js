$(document).ready(function () {
    const btnCreatePdf = $("#createPdfbtn");
    const COL_WIDTH = 48.867;
    const margins = {
        top: 25.4,
        bottom: 25.4,
        left: 31.7,
        width: 146.6
    };
    let currentMarginTop = margins.top;
    const lineHeigth = 3;

    let pdf = new jsPDF("p", "mm", [210, 297]);

    btnCreatePdf.click(function (e) {
        e.preventDefault();

        //adding first row
        addFirstRow();
        addSecondRow();
        addThirdRow();
        addFourthRow();
        addFifthRow();
        addSixthRow();
        addSeventhRow();

        pdf.save("stmt.pdf");
    });

    function addFirstRow() {
        pdf.setFontSize(8);
        pdf.setFont("times");
        pdf.setFontType("normal");
        pdf.setTextColor(0, 0, 0);

        const branchInfo = [
            $("#bankName").text(),
            $("#bankBranchName").text(),
            $("#bankBranchAddressRoad").text(),
            $("#BankBranchAddressArea").text(),
            $("#BankBranchAddressCity").text()
        ];

        const numOfColumn = 3;
        const colWidth = margins.width / numOfColumn;
        const marginLeft = margins.left + colWidth;
        const marginTop = currentMarginTop;
        let rowHeight = 0;

        branchInfo.forEach((info, index) => {
            addText(info, marginLeft, marginTop + rowHeight, colWidth);
            rowHeight += lineHeigth;
        });

        currentMarginTop = currentMarginTop + rowHeight + lineHeigth;
    }

    function addSecondRow() {
        const numOfColumn = 3;
        const colWidth = margins.width / numOfColumn;
        let rowHeight = 0;
        let colHeight = 0;

        //first column
        const firstColInfo = [
            $("#accountHolderName").text(),
            $("#accountHolderAddressHouse").text(),
            formatText($("#accountHolderAddressRoad").text()),
            formatText($("#accountHolderAddressArea").text()),
            formatText($("#accountHolderPostCode").text())
        ];
        const thirdColInfo = [
            `Acount Number`,
            `Period From`,
            `Page`,
            `Currency Name`,
            `Branch Code`,
            `Customer Id`
        ];
        const fourthColInfo = [':', ':', ':', ':', ':', ':',];
        const fifththColInfo = [
            $("#accountNumber").text(),
            formatText($("#timePeriod").text()),
            $("#pageCount").text(),
            formatText($("#currencyName").text()),
            $("#branchCode").text(),
            $("#customerId").text()
        ];

        colHeight = addColumn(
            firstColInfo,
            margins.left / 2,
            currentMarginTop,
            colWidth
        );
        rowHeight = adjustRowHeight(rowHeight, colHeight);

        colHeight = addColumn(
            thirdColInfo,
            margins.left + (colWidth * 2),
            currentMarginTop,
            colWidth
        );
        colHeight = addColumn(
            fourthColInfo,
            margins.left + (colWidth * 8) / 3.2,
            currentMarginTop,
            colWidth
        );
        colHeight = addColumn(
            fifththColInfo,
            margins.left + (colWidth * 8) / 3.1,
            currentMarginTop,
            colWidth
        );
        rowHeight = adjustRowHeight(rowHeight, colHeight);
        currentMarginTop = currentMarginTop + rowHeight + lineHeigth;
    }

    function addThirdRow() {
        const numOfColumn = 4;
        const colWidth = margins.width / numOfColumn;
        let rowHeight = lineHeigth;
        addText("ONLINE STATEMENT", margins.left + colWidth / 2, currentMarginTop, colWidth);
        currentMarginTop = currentMarginTop + rowHeight + lineHeigth;
    }

    function addFourthRow() {

        let table = $('#mainTable');
        let data = pdf.autoTableHtmlToJson(table[0]);
        console.log(data);

        pdf.autoTable(data.columns, data.rows, {
            tableLineColor: [255, 255, 255],
            tableLineWidth: 0.20,
            styles: {
                font: 'times',
                lineColor: [255, 255, 255],
                lineWidth: .20
            },
            headStyles: {
                fillColor: [255, 255, 255],
                fontSize: 8,
                textColor: [0, 0, 0],
            },
            bodyStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 8,
            },
            footStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 8,
            },
            alternateRowStyles: {

            },
            columnStyles: {
                4: { halign: 'right' },
                5: { halign: 'right' },
                6: { halign: 'right' },
            },
            startY: currentMarginTop,
        });

        currentMarginTop = pdf.previousAutoTable.finalY + lineHeigth;
        const endingStatement = $('#endingStatement').text();
        const numberOfCols = 10;
        const colWidth = margins.width / numberOfCols;
        addText(endingStatement, (margins.left + (colWidth * 10)), currentMarginTop, colWidth);
        currentMarginTop = currentMarginTop + lineHeigth * 3;
    }
    function addFifthRow() {
        const numOfColumn = 4;
        addText("STATEMENT CLOSING BALANCE", margins.left + getColWidth(numOfColumn) / 2, currentMarginTop, getColWidth(numOfColumn) * 2);
        currentMarginTop += (2 * lineHeigth);
    }

    function addSixthRow() {
        const numOfCols = 4;
        const colWidth = getColWidth(numOfCols);
        let rowHeight = 0;
        let colHeight = 0;
        const firstColInfo = ["OPENNING BANALNCE", "DEBITS", "CREDITS", "UNCOLLECTED FUNDS"];
        const secondColInfo = [
            $('#openingBalanceFinal').text(),
            $('#finalDebits').text(),
            $('#finalCredits').text(),
            formatText($('#uncollectedFunds').text()),
        ];
        const thirdColInfo = ['DRCOUNT', 'CRCOUNT'];
        const fourthColInfo = [$('#drCount').text(), $('#crCount').text()];

        colHeight = addColumn(firstColInfo, margins.left + colWidth / 2, currentMarginTop, colWidth);
        rowHeight = adjustRowHeight(rowHeight, colHeight)
        colHeight = addColumn(secondColInfo, margins.left + (colWidth * 3) / 2, currentMarginTop, colWidth);
        rowHeight = adjustRowHeight(rowHeight, colHeight);
        colHeight = addColumn(thirdColInfo, margins.left + colWidth * 2, currentMarginTop + lineHeigth, colWidth);
        colHeight = addColumn(fourthColInfo, margins.left + (colWidth * 5) / 2, currentMarginTop + lineHeigth, colWidth);
        currentMarginTop = currentMarginTop + rowHeight + lineHeigth;
        addText('*   =   UNAUTH ENTRY   /   R   =   REVERSAL', margins.left + colWidth / 2, currentMarginTop);
        currentMarginTop = currentMarginTop + lineHeigth * 2;
        addText(`- - - - - - - - - - - - - - - - - - - - - - - - END OF STATEMENT - - - - - - - - - - - - - - - - - - - - - - - -`,
            margins.left + colWidth / 2, currentMarginTop, colWidth * 3);
        currentMarginTop = currentMarginTop + lineHeigth * 2;
    }

    function addSeventhRow() {
        const text = `Please note that any dispency must be notified to the bank within 15 days from the date of this statement.Else it will be deemed that the customer has found this statementis corret.`
        const numOfCols = 1;
        const colWidth = getColWidth(numOfCols);
        addText(text, margins.left, currentMarginTop, colWidth);
    }

    function getColWidth(numOfCols) {
        return margins.width / numOfCols;
    }

    function adjustRowHeight(rowHeight, colHeight) {
        return rowHeight > colHeight ? rowHeight : colHeight;
    }

    function addColumn(firstColInfo, marginLeft, marginTop, colWidth) {
        pdf.setFontSize(8);
        pdf.setFont("times");
        pdf.setFontType("normal");
        pdf.setTextColor(0, 0, 0);

        let colHeight = 0;
        firstColInfo.forEach((info, index) => {
            addText(info, marginLeft, marginTop + colHeight, colWidth);
            colHeight += lineHeigth;
        });

        return colHeight;
    }

    function formatText(text) {
        console.log(text);
        text.replace('\n', '');
        let textArray = text.split(' ');
        let finaltext = '';
        textArray.forEach(element => {
            if (element !== '') {
                finaltext = finaltext + element.replace('\n', '') + ' ';
            }
        });
        console.log(finaltext);
        return finaltext.substring(1);

    }

    function addText(text, marginLeft, marginTop, colwidth) {
        const lines = pdf.splitTextToSize(text, colwidth, {
            orientation: "p",
            lineHeight: lineHeigth
        });

        pdf.text(marginLeft, marginTop, lines);
    }
});
