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
}