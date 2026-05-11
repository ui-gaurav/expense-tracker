import { useState, useEffect } from "react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
];

const CHEVRON_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`;

function CurrencyConverter({ total }) {
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currency === "USD") {
      setRate(1);
      setError("");
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetch(
      `https://api.frankfurter.app/latest?from=USD&to=${currency}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setRate(data.rates[currency]);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Failed to fetch exchange rate. Please try again.");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [currency]);

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency);
  const converted = total * rate;

  return (
    <section id="currency-converter-section" className="bg-white rounded-2xl card-shadow border border-gray-100/80 p-5 sm:p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center ring-1 ring-primary-200/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Currency Converter</h2>
      </div>

      <label htmlFor="currency-select" className="block text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">
        Convert total to
      </label>
      <select
        id="currency-select"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 appearance-none bg-no-repeat cursor-pointer mb-4"
        style={{
          backgroundImage: CHEVRON_SVG,
          backgroundPosition: "right 12px center",
          backgroundSize: "16px 16px",
        }}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>{c.flag}  {c.code} — {c.name}</option>
        ))}
      </select>

      {/* Result */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-4 sm:p-5 border border-slate-100">
        {loading ? (
          <div className="flex items-center justify-center gap-2.5 py-4">
            <div className="w-5 h-5 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
            <span className="text-sm text-slate-500 font-medium">Fetching live rate…</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2.5 py-4">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </div>
            <span className="text-sm text-red-500 font-medium">{error}</span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{selectedCurrency.flag}</span>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                Converted Total ({selectedCurrency.code})
              </p>
            </div>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums tracking-tight">
              {selectedCurrency.symbol}{converted.toFixed(2)}
            </p>
            {currency !== "USD" && (
              <div className="flex items-center gap-1.5 mt-2.5 bg-white rounded-lg px-3 py-1.5 border border-slate-100 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                <p className="text-[11px] text-slate-500 font-semibold tabular-nums">
                  1 USD = {rate.toFixed(4)} {currency}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default CurrencyConverter;
