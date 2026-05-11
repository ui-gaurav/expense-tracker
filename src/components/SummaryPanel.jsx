const CATEGORY_COLORS = {
  Food: { bar: "bg-orange-400", text: "text-orange-600", bg: "bg-orange-50", icon: "🍽️" },
  Travel: { bar: "bg-blue-400", text: "text-blue-600", bg: "bg-blue-50", icon: "✈️" },
  Marketing: { bar: "bg-purple-400", text: "text-purple-600", bg: "bg-purple-50", icon: "📈" },
  Utilities: { bar: "bg-emerald-400", text: "text-emerald-600", bg: "bg-emerald-50", icon: "⚡" },
  Other: { bar: "bg-slate-400", text: "text-slate-500", bg: "bg-slate-50", icon: "📦" },
};

function SummaryPanel({ expenses, total }) {
  const categoryBreakdown = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryBreakdown).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <section id="summary-panel-section" className="bg-white rounded-2xl card-shadow border border-gray-100/80 p-5 sm:p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center ring-1 ring-primary-200/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Summary</h2>
      </div>

      {/* Total Card */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-500 to-primary-700 rounded-2xl p-5 sm:p-6 mb-6 shadow-xl shadow-primary-500/15 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.06] rounded-full -translate-y-14 translate-x-14" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/[0.06] rounded-full translate-y-10 -translate-x-10" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/[0.04] rounded-full" />
        <p className="text-primary-200/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 relative">Total Spending</p>
        <p className="text-4xl sm:text-[42px] font-extrabold text-white tabular-nums tracking-tight leading-none relative">${total.toFixed(2)}</p>
        <div className="flex items-center gap-1.5 mt-3 relative">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-200 animate-pulse" />
          <p className="text-primary-200 text-xs font-medium">{expenses.length} expense{expenses.length !== 1 ? "s" : ""} tracked</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">By Category</h3>
      {sortedCategories.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-xs text-slate-400">No data to show</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedCategories.map(([category, amount]) => {
            const pct = total > 0 ? (amount / total) * 100 : 0;
            const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{colors.icon}</span>
                    <span className={`text-xs font-bold ${colors.text}`}>{category}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 tabular-nums">
                    ${amount.toFixed(2)}
                    <span className="text-slate-400 font-semibold ml-1.5">({pct.toFixed(1)}%)</span>
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${colors.bar} animate-progress`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default SummaryPanel;
