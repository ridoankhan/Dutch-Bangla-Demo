$(document).ready(function() {
    const btnCreatePdf = $("#createPdfbtn");
    const COL_WIDTH = 48.867;
    const margins = {
        top: 25.4,
        bottom: 25.4,
        left: 31.7,
        width: 146.6,
    };
    let currentMarginTop = margins.top;
    const lineHeigth = 3;

    let pdf = new jsPDF("p", "mm", [210, 297]);

    btnCreatePdf.click(function(e) {
        e.preventDefault();

        //adding first row
        addFirstRow();
        addSecondRow();
        addThirdRow();

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
            $("#BankBranchAddressCity").text(),
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
            $("#accountHolderAddressRoad").text(),
            $("#accountHolderAddressArea").text(),
            $("#accountHolderPostCode").text(),
        ];
        const thirdColInfo = [
            `Acount Number : ${$("#accountNumber").text()}`,
            `Period From   : ${$("#timePeriod").text()}`,
            `Page          : ${$("#pageCount").text()}`,
            `Currency Name : ${$("#currencyName").text()}`,
            `Branch Code   : ${$("#branchCode").text()}`,
            `Customer Id   : ${$("#customerId").text()}`,
        ];

        console.log(thirdColInfo);

        colHeight = addFirstCol(
            firstColInfo,
            margins.left,
            currentMarginTop,
            colWidth,
        );
        rowHeight = adjustRowHeight(rowHeight, colHeight);

        colHeight = addFirstCol(
            thirdColInfo,
            margins.left + colWidth * 2,
            currentMarginTop,
            colWidth,
        );
        rowHeight = adjustRowHeight(rowHeight, colHeight);
        currentMarginTop = currentMarginTop + rowHeight + lineHeigth;
    }

    function addThirdRow() {
        pdf.autoTable({
            html: "#mainTable",
            startY: currentMarginTop,
            styles: {
                fontSize: 8,
                font: "times",
            },
        });
    }
    function addFourthRow() {}
    function addFifthRow() {}

    function adjustRowHeight(rowHeight, colHeight) {
        return rowHeight > colHeight ? rowHeight : colHeight;
    }

    function addFirstCol(firstColInfo, marginLeft, marginTop, colWidth) {
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

    function addFromHtml(element, marginLeft, marginTop, colWidth) {
        pdf.fromHTML(element, marginLeft, marginTop, {
            width: colWidth,
            align: "left",
        });
    }

    function addText(text, marginLeft, marginTop, colwidth) {
        const lines = pdf.splitTextToSize(text, colwidth, {
            orientation: "p",
            lineHeight: lineHeigth,
        });

        pdf.text(marginLeft, marginTop, lines);
    }
});
