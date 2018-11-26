import {elements} from '../base';
import * as budgetView from '../views/budgetView';
import Budget from '../models/Budget';

const budget = new Budget();

export const init = () =>{
    initialSteup();

    elements.addButton.addEventListener('click', addAction);
    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            addAction();
        }
    });

    elements.inputType.addEventListener('change', changeType);
    elements.container.addEventListener('click', removeAction);
}

const initialSteup = () =>{
    budgetView.updateTotal(budget.getTotalIncome(), budget.getTotalExpense());
    budgetView.updateDate();

    // update list aera
    budgetView.refreshIncomesList(budget.getIncomes());
    budgetView.refreshExpensesList(budget.getExpenses(), budget.getTotalIncome());
}

const addAction= () =>{
    if(elements.inputDescription.value && elements.inputValue.value){
        // add to model
        const result = budget.addTransaction(elements.inputType.value, elements.inputValue.value, elements.inputDescription.value);
        
        // update overall aerea
        budgetView.updateTotal(budget.getTotalIncome(), budget.getTotalExpense());

        if(elements.inputType.value === 'inc'){
            budgetView.addToIncomesList(result);
        }else if(elements.inputType.value === 'exp'){
            budgetView.addToExpensesList(result);
        }

        //clear UI
        budgetView.clearInput();
    }
}

const removeAction = (e) => {
    if(e.target.closest('.item__delete')){
        const el = e.target.closest('.item');
        const id = el.id.split('-')[1];
        const type = el.id.split('-')[0];
        if(type === 'income'){
            budget.removeIncome(id);
            budgetView.removeIncome(id);
            budgetView.refreshExpensesList(budget.getExpenses());
        }else{
            budget.removeExpense(id);
            budgetView.removeExpense(id);
        }
        budgetView.updateTotal(budget.getTotalIncome(), budget.getTotalExpense());
    }
}

const changeType = () => {
    budgetView.changeTypeColor();
}