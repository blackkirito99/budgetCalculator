import { IncomingMessage } from "http";

export default class Budget{
    constructor(){
        this.totalExpense = 0;
        this.totalIncome = 0;
        this.incomes = [];
        this.expenses = [];
    }

    addTransaction(type, value, description){
        const parsedValue = parseFloat(value);
        if(type === 'inc'){
            this.incomes.push({
                id: this.incomes.length === 0 ? 0 : this.incomes[this.incomes.length-1].id + 1,
                value: parsedValue,
                description,
            });
            this.totalIncome += parsedValue;
            return this.incomes[this.incomes.length-1];
        }else if(type === 'exp'){
            this.expenses.push({
                id: this.expenses.length === 0 ? 0 : this.expenses[this.expenses.length-1].id + 1,
                value: parsedValue,
                description,
                percentage: this.totalIncome !== 0 ? (value/this.totalIncome*100).toFixed(0)+'%' : '---',
            });
            this.totalExpense += parsedValue;
            return this.expenses[this.expenses.length-1];
        }
    }

    removeIncome(id){
        this.incomes.filter(el => {
            const match = el.id.toString() !== id.toString();
            this.totalIncome -= match ? 0 : el.value;
            return match;
        });
        this.expenses.forEach(expense => {
            expense.percentage = this.totalIncome !== 0 ? (expense.value/this.totalIncome*100).toFixed(0)+'%' : '---';
        });
        console.log(this.incomes);
    }

    removeExpense(id){
        console.log(id);
        this.expenses.filter(el => {
            const match = el.id.toString() !== id.toString();
            this.totalexpense -= match ? 0 :  el.value;
            console.log(this.expenses);
            return match;
        });
        console.log(this.expenses);
    }

    getIncomes(){
        return this.incomes.slice();
    }

    getExpenses(){
        return this.expenses.slice();
    }

    getTotalExpense(){
        return this.totalExpense;
    }

    getTotalIncome(){
        return this.totalIncome;
    }


}