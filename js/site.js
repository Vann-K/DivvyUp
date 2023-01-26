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

    if (isNaN(inputsObject.loanAmount) || isNaN(inputsObject.loanTerm) || isNaN(inputsObject.interestRate)) {
        Swal.fire({
            icon: 'error',
            title: 'Whoops',
            text: 'Please enter a valid number.'
        })
        return;
    }


    // Calculate  Total Monthly Payment, assign to variable
    let totalMonthlyPayment = totalMonthly(inputsObject);


    // Calculate all of the necessary 
    let amortizationDataArray = balanceInterestPrin(inputsObject, totalMonthlyPayment);


    displayCurrentMonth(amortizationDataArray, totalMonthlyPayment, inputsObject);

    displayAmortization(amortizationDataArray, totalMonthlyPayment);
}


// Logic Functions

function totalMonthly(values) {
    // Calculate total monthly payment.

    let totalMonthlyPayment = values.loanAmount * (values.interestRate / 1200) / (1 - (1 + values.interestRate / 1200) ** -values.loanTerm)

    return totalMonthlyPayment;
}


function balanceInterestPrin(values, totalMonthlyPayment) {

    let loanTerm = values.loanTerm;
    let month = 1;
    let balance = (values.loanAmount);
    let interest = 0;
    let totalInterest = 0;

    // Storage Variables
    let amortizationArray = [];
    let amortizationObject = {};

    while (month <= loanTerm) {

        amortizationObject = {
            termMth: month,
            bomBalance: balance,
            get interest() { return this.bomBalance * (values.interestRate / 1200) },
            get principal() { return totalMonthlyPayment - this.interest },
            get eomBalance() { return this.bomBalance - this.principal },
        }


        interest = amortizationObject.interest;
        balance = amortizationObject.eomBalance;

        totalInterest += interest;

        amortizationObject.totalInterest = totalInterest;


        amortizationArray.push(amortizationObject)

        month = month + 1;

    }

    return amortizationArray;

}


// Display onto Page Function

function displayCurrentMonth(amortizationArray, totalMonthlyPayment, inputsObject) {
    let firstMonthTMP = document.getElementById('firstMonthTMP');
    let firstMonthPrincipal = document.getElementById('firstMonthPrincipal');
    let firstMonthInterest = document.getElementById('firstMonthInterest');
    let firstMonthTotalCost = document.getElementById('firstMonthTotalCost')
    let totalInterest = (amortizationArray[inputsObject.loanTerm - 1].totalInterest);

    firstMonthTMP.textContent = totalMonthlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    firstMonthPrincipal.textContent = amortizationArray[0].bomBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    firstMonthInterest.textContent = amortizationArray[inputsObject.loanTerm - 1].totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    firstMonthTotalCost.textContent = Number(inputsObject.loanAmount + totalInterest).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

}

function displayAmortization(amortizationArray, totalMonthlyPayment) {
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    let bottomHalf = document.getElementById('bottomHalf')

    bottomHalf.classList.remove('invisible');







    for (i = 0; i < amortizationArray.length; i++) {
        let amortizationRow = document.importNode(amortizationTemplate.content, true);
        let currentMth = amortizationArray[i];

        let tableCells = amortizationRow.querySelectorAll("td");

        tableCells[0].textContent = currentMth.termMth;
        tableCells[1].textContent = Number(totalMonthlyPayment).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        tableCells[2].textContent = Number(currentMth.principal).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        tableCells[3].textContent = Number(currentMth.interest).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        tableCells[4].textContent = currentMth.totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        tableCells[5].textContent = Math.abs(currentMth.eomBalance).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        tableBody.appendChild(amortizationRow);

    }


}