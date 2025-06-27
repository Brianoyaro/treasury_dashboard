import React, { useState, useEffect } from "react";

export default function Logs({ param_logs, param_accounts }) {
  const [currencyType, setCurrencyType] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [logs, setLogs] = useState(param_logs);

  useEffect(() => {
    if (!fromAccount && !toAccount && !currencyType) {
      setLogs(param_logs);
      return;
    }

    const filteredLogs = param_logs.filter((log) => {
      const matchesFrom = fromAccount && log.from_account.toLowerCase().includes(fromAccount.toLowerCase());
      const matchesTo = toAccount && log.to_account.toLowerCase().includes(toAccount.toLowerCase());
      const matchesCurrency = currencyType && log.to_currency_type.toLowerCase().includes(currencyType.toLowerCase());
      return matchesFrom || matchesTo || matchesCurrency;
    });

    setLogs(filteredLogs);
  }, [fromAccount, toAccount, currencyType, param_logs]);

  const resetFilters = () => {
    setFromAccount("");
    setToAccount("");
    setCurrencyType("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow h-full max-h-[28rem] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Transaction Logs</h2>

      <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <select
            className="w-full p-2 border rounded text-sm lg:text-xs"
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
          >
            <option value="">From Account</option>
            {param_accounts.map((acc) => (
              <option key={acc.id} value={acc.name}>{acc.name}</option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded text-sm lg:text-xs"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
          >
            <option value="">To Account</option>
            {param_accounts.map((acc) => (
              <option key={acc.id} value={acc.name}>{acc.name}</option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded text-sm lg:text-xs"
            value={currencyType}
            onChange={(e) => setCurrencyType(e.target.value)}
          >
            <option value="">Currency Type</option>
            <option value="USD">USD</option>
            <option value="KES">KES</option>
            <option value="NGN">NGN</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="w-full p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm lg:text-xs"
          >
            Reset
          </button>
        </div>
      </form>

      {logs.length === 0 ? (
        <p className="text-gray-400 text-sm">No transactions match the filter.</p>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="border-b pb-3">
              <p className="text-sm"><strong>From:</strong> {log.from_account}</p>
              <p className="text-sm"><strong>To:</strong> {log.to_account}</p>
              <p className="text-sm"><strong>Amount:</strong> {log.amount.toFixed(2)} {log.to_currency_type}</p>
              <p className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
              {log.note && <p className="text-sm italic">Note: {log.note}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
