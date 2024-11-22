// DOM elements
const totalBudgetEl = document.getElementById('total-budget');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const transactionsEl = document.getElementById('transactions');
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');

class Budget {
    constructor() {
        this.incomes = [];
        this.expenses = [];
    }
    addIncome(description, amount) {
        this.incomes.push({description, amount});
    }
    addExpense(description, amount) {
        this.expenses.push({description, amount});
    }
    getTotalIncome () {
        return this.incomes.reduce((total, item) => total + item.amount, 0);
    }
    getTotalExpenses () {
        return this.expenses.reduce((total, item) => total + item.amount, 0)
    }
    getTotalBudget () {
        return this.getTotalIncome() - this.getTotalExpenses();
    }
}

const budget = new Budget();

//Pie chart initialization from chart.js
const ctx = document.getElementById('budgetChart').getContext('2d');
let budgetChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Income', 'Expenses'],
        datasets: [
        {
            label: 'Budget Breakdown',
            data: [0, 0],
            backgroundColor: ['#4caf50', '#ff5722'], // Colors for income and expenses
            hoverOffset: 4,
        },
        ],
    },
});