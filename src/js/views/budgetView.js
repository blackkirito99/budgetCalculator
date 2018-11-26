import {elements} from '../base';

export const updateTotal = (totalIncome, totalExpense) =>{
    elements.budgetIncomeValue.innerHTML = totalIncome;
    elements.budgetExpenseValue.innerHTML = totalExpense;
    if(totalIncome !== 0){
        elements.budgetExpensePercentage.innerHTML = `${(totalExpense*100/totalIncome).toFixed(0)}%`;
    }else{
        elements.budgetExpensePercentage.innerHTML = '---';
    }
    elements. bugetValue.innerHTML = totalIncome - totalExpense;
}

export const addToExpensesList =  expense=> {
    const markup = `
    <div class="item clearfix" id="expense-${expense.id}">
        <div class="item__description">${expense.description}</div>
        <div class="right clearfix">
            <div class="item__value">- ${expense.value}</div>
            <div class="item__percentage">${expense.percentage}</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>
    `;
    elements.expenseList.insertAdjacentHTML('beforeend', markup);
}


export const refreshExpensesList = expenses => {
    elements.expenseList.innerHTML = "";
    expenses.forEach(el =>{
       addToExpensesList(el);
    })
}

export const addToIncomesList = income => {
    const markup = `
    <div class="item clearfix" id="income-${income.id}">
        <div class="item__description">${income.description}</div>
        <div class="right clearfix">
            <div class="item__value">${income.value}</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>
    `;
    elements.incomeList.insertAdjacentHTML('beforeend', markup);
}

export const refreshIncomesList = incomes => {
    elements.incomeList.innerHTML = "";
    incomes.forEach(el =>{
        addToExpensesList(el);
    })
}
export const removeIncome = id =>{
    const income = document.getElementById(`income-${id}`);
    income.parentNode.removeChild(income);
}

export const removeExpense = id =>{
    const expense = document.getElementById(`expense-${id}`);
    expense.parentNode.removeChild(expense);
}

export const clearInput = () =>{
    elements.inputDescription.value = "";
    elements.inputValue.value = "";
}

export const updateDate = () =>{
    const date = new Date()
    elements.date.innerHTML = `${date.getFullYear()}/${date.getMonth()}`;
}

export const changeTypeColor = () => {
    Array.from(elements.typeBundle).forEach(el => {
        el.classList.toggle('red-focus');
    })

    elements.addButton.classList.toggle('red');
}