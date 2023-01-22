// IDs needed
//  id="amortizationTemplate
//  id="btnCalculate"
// id="interestRateInput"
// id="loanTermInput"
// id="loanAmountInput"




// Entry Function
// Initial Function that happens when we press Calculate button

function getValues() {

    // Get inputs, store in object
    let inputsObject = {
        loanAmount: parseInt(document.getElementById('loanAmountInput').value),
        loanTerm: parseInt(document.getElementById('loanTermInput').value),
        interestRate: parseInt(document.getElementById('interestRateInput').value)
    }



    // Calculate functions
    let totalMonthlyPayment = Number(totalMonthly(inputsObject)).toFixed(2);


    // let initialValuesObject = {
    //     initialInterest: initialInterestPayment(inputsObject, totalMonthlyPayment),
    //     initialPrincipal: initialPrincipalPayment(inputsObject, initialValuesObject.)
    // }


    let amortizationDataArray = balanceInterestPrin(inputsObject, totalMonthlyPayment);

    console.log(amortizationDataArray)

    displayAmortization(amortizationDataArray);








    // let interestPaymentArray = interestPayment(remainingBalanceArray)
    // let principalPayments = principalPayment(inputsObject);
    // let remainingBalanceArray = remainingBalance(inputsObject, principalPayments);


    // let calculationsObject = {
    //     totalMonthly: totalMonthlyPayment,
    //     remainingBalance: remainingBalanceArray,
    //     principal: principalPayments,
    //     interest: interestPaymentArray
    // }

    // Display






}


// Logic Functions

function totalMonthly(values) {
    // Calculate total monthly payment. (loanAmount) * (interestRate / 1200) / (1-(1+interestRate/1200)^-LoanTerm)

    let totalMonthlyPayment = values.loanAmount * (values.interestRate / 1200) / (1 - (1 + values.interestRate / 1200) ** -values.loanTerm)

    return totalMonthlyPayment;
}


function initialPrincipalPayment(totalMonthly, initialInterest) {

    let initialPrincipal = totalMonthly - initialInterest;

    return initialPrincipal;

    // let principalPayment = totalMonthly - interestPayment()
    // return principalPayment

}

function initialInterestPayment(values) {

    let initialInterest = values.loanAmount * values.rate / 1200;

    return initialInterest;



    // for (i = 0; i < remainingBalance.length; i++) {

    //     let interestPayment = remainingBalance[i] * rate / 1200;
    //     interestArray.push(interestPayment);

    // }

    // return interestArray;

}


function balanceInterestPrin(values, totalMonthlyPayment) {

    let loanTerm = values.loanTerm;
    let month = 1;
    let balance = Number(values.loanAmount).toFixed(2);
    let interest = (balance * values.interestRate / 1200, 10).toFixed(2);
    let totalInterest = 0;
    let principal = 0;
    let amortizationArray = [];

    let amortizationObject = {
        termMth: Number(month).toFixed(2),
        bomBalance: Number(balance).toFixed(2),
        get interest() { return Number(this.bomBalance * (values.interestRate / 1200)).toFixed(2) },
        get principal() { return Number(totalMonthlyPayment - this.interest).toFixed(2) },
        get eomBalance() { return Number(this.bomBalance - this.principal).toFixed(2) },

    }

    while (month <= loanTerm) {

        amortizationObject = {
            termMth: Number(month).toFixed(2),
            bomBalance: Number(balance).toFixed(2),
            get interest() { return Number(this.bomBalance * (values.interestRate / 1200)).toFixed(2) },
            get principal() { return Number(totalMonthlyPayment - this.interest).toFixed(2) },
            get eomBalance() { return Number(this.bomBalance - this.principal).toFixed(2) },
        }


        interest = amortizationObject.interest;
        principal = amortizationObject.principal
        balance = amortizationObject.eomBalance;

        totalInterest += Math.round(interest * 100) / 100;

        amortizationObject.totalInterest = Math.round(totalInterest * 100) / 100;
        amortizationObject.tmp = totalMonthlyPayment;


        month = month + 1;

        amortizationArray.push(amortizationObject)

    }

    return amortizationArray;

}


// Display onto Page Function

function displayAmortization(amortizationArray) {
    let tableBody = document.getElementById('tableBody');
    const amortizationTemplate = document.getElementById('amortizationTemplate');

    tableBody.innerHTML = '';



    for (i = 0; i < amortizationArray.length; i++) {
        let amortizationRow = document.importNode(amortizationTemplate.content, true);
        let currentMth = amortizationArray[i];

        let tableCells = amortizationRow.querySelectorAll("td");

        tableCells[0].textContent = currentMth.termMth;
        tableCells[1].textContent = currentMth.tmp;
        tableCells[2].textContent = currentMth.principal;
        tableCells[3].textContent = currentMth.interest;
        tableCells[4].textContent = currentMth.totalInterest;
        tableCells[5].textContent = currentMth.eomBalance;

        tableBody.appendChild(amortizationRow);

    }


}







// function remainingBalance(values, principalPayment) {
//     let remainingBalanceArray = [];


//     for (let remainingBalance = values.loanAmount; remainingBalance > 0; remainingBalance -= principalPayment) {

//         remainingBalanceArray.push(remainingBalance)




//     }
//     return remainingBalanceArray;

// }














// function remainingBalance(values, totalMonthlyPayment) {
//     let currentBalance = values.loanAmount;
//     for (i = 1; i < values.loanTerm; i++) {
//         let remainingBalance = values.loanAmount - (currentBalance - (totalMonthlyPayment - (remainingBalance * values.interestRate / 1200)))
//     }

// }






