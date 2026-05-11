import { CATEGORY_ICONS } from "./ExpenseForm";

const CATEGORY_STYLES = {
  Food: { bg: "bg-orange-50", text: "text-orange-600", dot: "bg-orange-400", border: "border-orange-200/60", accent: "border-l-orange-400", iconBg: "bg-orange-100" },
  Travel: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-400", border: "border-blue-200/60", accent: "border-l-blue-400", iconBg: "bg-blue-100" },
  Marketing: { bg: "bg-purple-50", text: "text-purple-600", dot: "bg-purple-400", border: "border-purple-200/60", accent: "border-l-purple-400", iconBg: "bg-purple-100" },
  Utilities: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-400", border: "border-emerald-200/60", accent: "border-l-emerald-400", iconBg: "bg-emerald-100" },
  Other: { bg: "bg-slate-50", text: "text-slate-500", dot: "bg-slate-400", border: "border-slate-200/60", accent: "border-l-slate-400", iconBg: "bg-slate-100" },
};

function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <section id="expense-list-section" className="bg-white rounded-2xl card-shadow border border-gray-100/80 p-6 sm:p-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center ring-1 ring-primary-200/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Expenses</h2>
        </div>
        <div className="text-center py-10">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center border border-slate-200/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="13" x2="12" y2="17"/><line x1="10" y1="15" x2="14" y2="15"/></svg>
          </div>
          <p className="text-slate-600 font-semibold text-sm">No expenses yet</p>
          <p className="text-slate-400 text-xs mt-1.5 max-w-[200px] mx-auto leading-relaxed">
            Add your first expense using the form above to start tracking
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="expense-list-section" className="bg-white rounded-2xl card-shadow border border-gray-100/80 p-5 sm:p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center ring-1 ring-primary-200/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Expenses</h2>
        <span className="ml-auto text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-full uppercase tracking-wider">
          {expenses.length} {expenses.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="flex flex-col gap-2 max-h-[460px] overflow-y-auto pr-1">
        {expenses.map((expense, index) => {
          const style = CATEGORY_STYLES[expense.category] || CATEGORY_STYLES.Other;
          const icon = CATEGORY_ICONS[expense.category] || CATEGORY_ICONS.Other;
          return (
            <div
              key={expense.id}
              className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border border-slate-100/80 bg-white hover:bg-slate-50/50 hover:border-slate-200 transition-all duration-200 group animate-slide-up border-l-[3px] ${style.accent}`}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              {/* Category Icon */}
              <div className={`w-9 h-9 rounded-lg ${style.iconBg} flex items-center justify-center shrink-0 ${style.text}`}>
                {icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{expense.name}</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold mt-0.5 uppercase tracking-wider border ${style.bg} ${style.text} ${style.border}`}>
                  {expense.category}
                </span>
              </div>

              {/* Amount */}
              <p className="text-sm font-bold text-slate-900 tabular-nums whitespace-nowrap">
                ${expense.amount.toFixed(2)}
              </p>

              {/* Delete */}
              <button
                id={`delete-expense-${expense.id}`}
                onClick={() => onDeleteExpense(expense.id)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0 cursor-pointer"
                aria-label={`Delete ${expense.name}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ExpenseList;
