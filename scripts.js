/* =========================================================
   Part 1 — Variables & Conditionals
   ========================================================= */
// Simple app "state"
const user = {
  name: "Ada",
  age: 21,
  isMember: true,
};

// Derived status message using conditionals & template strings
function getUserStatus(u) {
  if (u.age >= 18 && u.isMember) {
    return `Welcome back, ${u.name}! Your membership is active.`;
  } else if (u.age >= 18 && !u.isMember) {
    return `Hi ${u.name}, consider joining to unlock perks.`;
  } else {
    return `Hi ${u.name}, you must be 18+ to access member features.`;
  }
}

/* =========================================================
   Part 2 — Custom Functions (at least 2)
   ========================================================= */
// 1) Format a number to currency
function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

// 2) Compute average (guards against divide-by-zero)
function average(nums) {
  if (!nums.length) return 0;
  let sum = 0;
  for (const n of nums) sum += n; // (also demonstrates a loop)
  return sum / nums.length;
}

/* =========================================================
   Part 3 — Loops (at least 2)
   ========================================================= */
// We’ll demo two loops in the console in addition to rendering:
//  A) Classic for loop (countdown)
//  B) for...of loop (iterate values)
function demoLoopsInConsole() {
  console.log("Loop A: classic for countdown 5 → 1");
  for (let i = 5; i >= 1; i--) {
    console.log(`Tick ${i}`);
  }

  console.log("Loop B: for...of over sample numbers");
  const values = [4, 7, 12];
  for (const v of values) {
    console.log(`Value: ${v}`);
  }
}

/* =========================================================
   Part 4 — DOM Interactions (at least 3)
   - query & update text content
   - create elements & append to list
   - toggle class on body (+ ARIA attribute)
   - handle events (form submit, buttons)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // 1) Query & update text
  const statusEl = document.getElementById("status");
  statusEl.textContent = getUserStatus(user);

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Pretend initial items (name + price)
  const initialItems = [
    { name: "Notebook", price: 3.5 },
    { name: "Headphones", price: 29.99 },
    { name: "USB-C Cable", price: 8.25 },
  ];

  const itemsUl = document.getElementById("items");
  const countEl = document.getElementById("count");
  const totalEl = document.getElementById("total");
  const averageEl = document.getElementById("average");

  // Render helper (DOM creation + append)
  function renderItems(items) {
    itemsUl.innerHTML = ""; // clear
    for (const item of items) { // loop example used for DOM building
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.name}</span>
        <span class="tag">${formatCurrency(item.price)}</span>
      `;
      itemsUl.appendChild(li);
    }
    // Update summary panel
    countEl.textContent = String(items.length);
    const prices = items.map(i => i.price);
    const total = prices.reduce((a, b) => a + b, 0);
    totalEl.textContent = formatCurrency(total);
    averageEl.textContent = formatCurrency(average(prices));
  }

  // State kept in-memory
  const items = [...initialItems];
  renderItems(items);

  // 2) Handle form submit (create & append + update counts)
  const form = document.getElementById("addItemForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("itemName").value.trim();
    const price = Number(document.getElementById("itemPrice").value);
    if (!name || isNaN(price) || price < 0) {
      statusEl.textContent = "Please enter a valid item name and non-negative price.";
      return;
    }
    items.push({ name, price });
    renderItems(items);
    form.reset();
    statusEl.textContent = `Added "${name}" successfully.`;
  });

  // 3) Toggle theme (classList toggle + aria-pressed)
  const toggleBtn = document.getElementById("toggleThemeBtn");
  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    toggleBtn.setAttribute("aria-pressed", String(isLight));
    statusEl.textContent = isLight ? "Light theme enabled." : "Dark theme enabled.";
  });

  // 4) Clear list (remove children, update counts)
  const clearBtn = document.getElementById("clearListBtn");
  clearBtn.addEventListener("click", () => {
    items.length = 0; // clear array
    renderItems(items);
    statusEl.textContent = "List cleared.";
  });

  // Show loop demos in the console
  demoLoopsInConsole();
});
/* =========================================================
   Part 5 — Comments & Readability
   - Code is organized into sections with clear comments
   - Meaningful variable/function names
   - Consistent formatting & indentation
   ========================================================= */