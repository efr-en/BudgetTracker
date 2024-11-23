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

function updateChart() {
    const income = budget.getTotalIncome();
    const expenses = budget.getTotalExpenses();

    // Makes data appear on pie chart
    budgetChart.data.datasets[0].data = [income, expenses];
    budgetChart.update();
}

function updateUI() {
    const income = budget.getTotalIncome();
    const expenses = budget.getTotalExpenses();
    const totalBudget = budget.getTotalBudget();

    if (totalBudget < 0) {
        totalBudgetEl.textContent = "You're Over Budget!!";
        totalBudgetEl.style.color = "#ff5722";
    } else {
        totalBudgetEl.textContent = `$${totalBudget}`;
        totalBudgetEl.style.color = "#4caf50";
    }

    // Updates income/expense display
    totalIncomeEl.textContent = `$${income}`;
    totalExpensesEl.textContent = `$${expenses}`;

    //"..." prevent undefined transaction errors
    transactionsEl.innerHTML = '';
    [...budget.incomes, ...budget.expenses].forEach((item) => {
        const li = document.createElement('li');
        const isExpense = budget.expenses.includes(item);
        
        li.textContent = isExpense ? `${item.description}: -$${item.amount}` : `${item.description}: $${item.amount}`;
        li.style.color = isExpense ? "#ff5722" : "#4caf50";
        transactionsEl.appendChild(li);
    });
    updateChart();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const type = typeInput.value;

    if (!description || isNaN(amount)) {
        alert('Please provide valid input only');
        return;
    }
    if (type === 'income') {
        budget.addIncome(description, amount);
    } else {
        budget.addExpense(description, amount);
    }

    form.reset();
    updateUI();
});

// console.log()