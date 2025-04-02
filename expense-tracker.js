const readline = require("readline");

class Expense {
  constructor(amount, category, date) {
    this.amount = amount;
    this.category = category;
    this.date = new Date(date);
    this.next = null;
  }
}

class ExpenseList {
  constructor() {
    this.head = null;
  }

  addExpense(amount, category, date) {
    const newExpense = new Expense(amount, category, date);
    if (!this.head) {
      this.head = newExpense;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newExpense;
    }
  }

  displayExpenses() {
    let current = this.head;
    if (!current) {
      console.log("No expenses recorded.");
      return;
    }
    console.log("\nExpense List:");
    while (current) {
      console.log(
        `Amount: $${current.amount}, Category: ${current.category}, Date: ${current.date.toDateString()}`
      );
      current = current.next;
    }
  }

  deleteExpense(amount, date) {
    if (!this.head) {
      console.log("No expenses found.");
      return;
    }
    let current = this.head;
    let prev = null;
    const formattedDate = new Date(date).toDateString();
    while (current) {
      if (current.amount === amount && current.date.toDateString() === formattedDate) {
        if (prev) {
          prev.next = current.next;
        } else {
          this.head = current.next;
        }
        console.log(`Expense of $${amount} on ${formattedDate} deleted.`);
        return;
      }
      prev = current;
      current = current.next;
    }
    console.log("Expense not found.");
  }
}

class ExpenseTracker {
  constructor() {
    this.expenseList = new ExpenseList();
  }

  addExpense(amount, category, date) {
    this.expenseList.addExpense(amount, category, date);
    console.log("Expense added.");
  }

  displayExpenses() {
    this.expenseList.displayExpenses();
  }

  deleteExpense(amount, date) {
    this.expenseList.deleteExpense(amount, date);
  }
}

const myTracker = new ExpenseTracker();
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function addExpenseFromUser() {
  rl.question("Enter Amount: ", (amount) => {
    rl.question("Enter Category: ", (category) => {
      rl.question("Enter Date (YYYY-MM-DD): ", (date) => {
        myTracker.addExpense(parseFloat(amount), category, date);
        showMenu();
      });
    });
  });
}

function deleteExpenseFromUser() {
  rl.question("Enter Amount of Expense to Delete: ", (amount) => {
    rl.question("Enter Date of Expense (YYYY-MM-DD): ", (date) => {
      myTracker.deleteExpense(parseFloat(amount), date);
      showMenu();
    });
  });
}

function showMenu() {
  console.log("\nExpense Tracker Menu:");
  console.log("1. Add Expense");
  console.log("2. View Expenses");
  console.log("3. Delete Expense");
  console.log("4. Exit");
  
  rl.question("Choose an option (1-4): ", (choice) => {
    if (choice === "1") {
      addExpenseFromUser();
    } else if (choice === "2") {
      myTracker.displayExpenses();
      showMenu();
    } else if (choice === "3") {
      deleteExpenseFromUser();
    } else if (choice === "4") {
      console.log("Exiting Expense Tracker...");
      rl.close();
    } else {
      console.log("Invalid choice. Try again.");
      showMenu();
    }
  });
}

showMenu();
