# 💸 Expense Tracker — Marketing Mojito Internship Assignment

A personal Expense Tracker built with React and Vite that lets users log, categorise, and manage their daily expenses — with a live currency conversion feature powered by a public API.

**Live Demo:** [expensez-trackr.netlify.app](https://expensez-trackr.netlify.app)

---

## What I Built

A React-based mini application that allows users to:

- Add expenses with a name, amount (in USD), and category
- View all expenses in a clean card-based layout with category badges
- Delete any expense entry instantly
- See a live running total that updates automatically
- View a category-wise spending breakdown with visual progress bars
- Convert the total into any of 8 currencies using live exchange rates

---

## Tech Stack

- **React** (Vite)
- **Tailwind CSS v4**
- **React Hooks** — useState, useEffect (no third-party state management)
- **Frankfurter.app API** — free, no API key required

---

## Features

| Feature | Details |
|---|---|
| Add Expense | Name, amount, category (Food, Travel, Marketing, Utilities, Other) |
| Expense List | Card layout with emoji, category badge, amount, delete button |
| Summary Panel | Running total + category breakdown with progress bars |
| Currency Converter | Live rates via Frankfurter API — INR, EUR, GBP, JPY, AUD, CAD, SGD, AED |
| Error Handling | Loading spinner, API error message, form validation |
| Responsive | Works at 1600×900 (desktop) and 414×749 (mobile) |

---

## Component Structure

```
src/
  components/
    ExpenseForm.jsx       — Input form for adding expenses
    ExpenseList.jsx       — Displays all expense cards
    SummaryPanel.jsx      — Total + category breakdown
    CurrencyConverter.jsx — Live currency conversion
  App.jsx                 — Root component, holds all state
  index.css               — Tailwind CSS import
  main.jsx                — Entry point
```

---

## API Used

**Frankfurter.app** — `https://api.frankfurter.app/latest?from=USD&to={currency}`

Free, open-source, no API key needed. Provides live exchange rates from the European Central Bank.

---

## Running Locally

```bash
git clone https://github.com/ui-gaurav/expense-tracker.git
cd expense-tracker
npm install
npm run dev
```

---

## What I Would Improve With More Time

- Local storage persistence so expenses survive page refresh
- Expense editing functionality
- Date picker and date-based filtering
- Monthly budget limit with overspend alerts
- Chart visualisation for spending trends (e.g. pie chart by category)

---

*Assignment submission for Web Developer Internship at Marketing Mojito*
