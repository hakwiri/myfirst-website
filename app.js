// ==========================================
// PAYDAY SURVIVAL LIST - SIMPLE VERSION
// Idea: REMEMBER something, LISTEN for clicks, UPDATE the screen
// ==========================================

// 1. GRAB THE ELEMENTS (our "remote control" for the page)
const form = document.querySelector('#expense-form');
const nameInput = document.querySelector('#expense-name');
const costInput = document.querySelector('#expense-cost');
const list = document.querySelector('#expense-list');
const totalStatus = document.querySelector('#total-status');
const countdownBanner = document.querySelector('#countdown-banner');

console.log("form", form)
console.log("list", list)

// 2. REMEMBER: our shopping list of expenses
let expenses = [];

// 3. MATH: add up everything that is NOT paid yet
function calculateTotal() {
  let total = 0;
  for (const expense of expenses) {
    if (expense.paid === false) {
      total = total + expense.cost;
    }
  }
  return total;
}

// 4. MATH: how many days until payday?
//    Simple trick: payday day minus today's day
function showCountdown() {
  const paydayDay = -1;                    // change this to your payday
  const todayDay = new Date().getDate(); 
  console.log(todayDay)  // e.g. 14

  const daysLeft = paydayDay - todayDay;
  console.log(daysLeft)

  if (daysLeft === 0) {
    countdownBanner.textContent = '🎉 WOOW FUN TIME!! SHEREHEEE';
    countdownBanner.style.backgroundColor = '#dcfce7';
  } else if (daysLeft < 0) {
    countdownBanner.textContent = '✅ Payday has passed this month. Spend wisely!';
    countdownBanner.style.backgroundColor = '#e0f2fe';
  } else if (daysLeft <= 5) {
    countdownBanner.textContent = '🚨 ' + daysLeft + ' days to payday. Hang in there!';
    countdownBanner.style.backgroundColor = '#fee2e2';
  } else {
    countdownBanner.textContent = '🗓️ ' + daysLeft + ' days until payday.';
    countdownBanner.style.backgroundColor = '#f3f4f6';
  }
}

// 5. UPDATE THE SCREEN: erase the list, then redraw it from the array
function render() {
  list.textContent = '';   // erase the whiteboard

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    const li = document.createElement('li');

    // checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = expense.paid;
    checkbox.addEventListener('change', function () {
      expense.paid = checkbox.checked;
      render();
    });

    // text (textContent is safe for anything the user types)
    const text = document.createElement('span');
    text.textContent = ' ' + expense.name + ' - KES ' + expense.cost + ' ';

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', function () {
      expenses.splice(i, 1);   // remove 1 item at position i
      render();
    });

    li.append(checkbox, text, deleteButton);
    list.append(li);
  }

  // show the total
  totalStatus.textContent = 'Total needed: KES ' + calculateTotal();
}

// 6. LISTEN: when the form is submitted, add an expense
form.addEventListener('submit', function (event) {
  event.preventDefault();   // don't refresh the page

  const name = nameInput.value.trim();
  const cost = Number(costInput.value);

  if (name === '' || cost <= 0) {
    return;   // bad input, stop here
  }

  expenses.push({ name: name, cost: cost, paid: false });
   console.log("expenses", expenses)
render();
  form.reset();
});

// 7. START THE APP
showCountdown();
render();

