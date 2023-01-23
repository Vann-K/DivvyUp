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
    let totalMonthlyPayment = Number(totalMonthly(inputsObject)).toFixed(2);


    // Calculate all of the necessary 
    let amortizationDataArray = balanceInterestPrin(inputsObject, totalMonthlyPayment);

    console.log(amortizationDataArray);

    displayCurrentMonth(amortizationDataArray, totalMonthlyPayment, inputsObject);

    displayAmortization(amortizationDataArray);
}


// Logic Functions

function totalMonthly(values) {
    // Calculate total monthly payment. (loanAmount) * (interestRate / 1200) / (1-(1+interestRate/1200)^-LoanTerm)

    let totalMonthlyPayment = values.loanAmount * (values.interestRate / 1200) / (1 - (1 + values.interestRate / 1200) ** -values.loanTerm)

    return totalMonthlyPayment;
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

    while (month <= loanTerm) { //piss

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

        totalInterest += interest * 100 / 100;

        amortizationObject.totalInterest = Math.round(totalInterest * 100) / 100;
        amortizationObject.tmp = totalMonthlyPayment;


        month = month + 1;

        amortizationArray.push(amortizationObject)

    }

    return amortizationArray;

}


// Display onto Page Function

function displayCurrentMonth(amortizationArray, totalMonthlyPayment, inputsObject) {
    let firstMonthTMP = document.getElementById('firstMonthTMP');
    let firstMonthPrincipal = document.getElementById('firstMonthPrincipal');
    let firstMonthInterest = document.getElementById('firstMonthInterest');
    let firstMonthTotalCost = document.getElementById('firstMonthTotalCost')
    let totalInterest = Number(amortizationArray[inputsObject.loanTerm - 1].totalInterest);

    firstMonthTMP.textContent = Number(totalMonthlyPayment).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    firstMonthPrincipal.textContent = Number(amortizationArray[0].bomBalance).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    firstMonthInterest.textContent = Number(amortizationArray[inputsObject.loanTerm - 1].totalInterest).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    firstMonthTotalCost.textContent = Number(inputsObject.loanAmount + totalInterest).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

}

function displayAmortization(amortizationArray) {
    let tableBody = document.getElementById('tableBody');
    const amortizationTemplate = document.getElementById('amortizationTemplate');

    tableBody.innerHTML = '';

    let amorBtn = document.getElementById('amortizationBtn')
    amorBtn.classList.remove('invisible');

    let bottomHalf = document.getElementById('bottomHalf')

    bottomHalf.classList.remove('invisible');







    for (i = 0; i < amortizationArray.length; i++) {
        let amortizationRow = document.importNode(amortizationTemplate.content, true);
        let currentMth = amortizationArray[i];

        let tableCells = amortizationRow.querySelectorAll("td");

        tableCells[0].textContent = parseInt(currentMth.termMth);
        tableCells[1].textContent = Number(currentMth.tmp).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        tableCells[2].textContent = Number(currentMth.principal).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        tableCells[3].textContent = Number(currentMth.interest).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        tableCells[4].textContent = currentMth.totalInterest.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        tableCells[5].textContent = parseInt(currentMth.eomBalance).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        tableBody.appendChild(amortizationRow);

    }


}