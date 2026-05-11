import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prev) => [
      ...prev,
      { ...expense, id: Date.now().toString() },
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25 ring-1 ring-primary-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight tracking-tight">
                Expense Tracker
              </h1>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                by Marketing Mojito
              </p>
            </div>
          </div>
          {/* Live total pill in header */}
          <div className="hidden sm:flex items-center gap-2 bg-primary-50 border border-primary-100 rounded-full px-4 py-1.5">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-xs font-semibold text-primary-700 tabular-nums">
              ${total.toFixed(2)} USD
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
            <ExpenseForm onAddExpense={addExpense} />
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 lg:sticky lg:top-20 lg:self-start">
            <SummaryPanel expenses={expenses} total={total} />
            <CurrencyConverter total={total} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
