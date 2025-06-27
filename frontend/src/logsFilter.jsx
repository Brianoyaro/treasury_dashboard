import React, { useState } from "react";

// needs accounts and logs
const [currencyType, setCurrencyType] = useState("");
const [fromAccount, setFromAccount] = useState("");
const [toAccount, setToAccount] = useState("");


const filterLogs = (e) => {
    e.preventDefault();
    const filteredLogs = logs.filter((log) => {
        return (
        log.to_account.toLowerCase().includes(toAccount.toLowerCase()) ||
        log.from_account.toLowerCase().includes(fromAccount.toLowerCase()) ||
        log.to_currency_type.toLowerCase().includes(currencyType.toLowerCase())
    );
    });
    setLogs(filteredLogs);
    setCurrencyType("");
    setFromAccount("");
    setToAccount("");
};

        <form className="mb-4" onSubmit={(e) => filterLogs(e)}>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                    className="w-full p-2 border rounded"
                    value={fromAccount}
                    onChange={(e) => setFromAccount(e.target.value)}
                >
                    <option value="">From Account</option>
                    {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                    ))}
                </select>
                <select
                    className="w-full p-2 border rounded"
                    value={toAccount}
                    onChange={(e) => setToAccount(e.target.value)}
                >
                    <option value="">To Account</option>
                    {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                    ))}
                </select>
                <select
                    className="w-full p-2 border rounded"
                    value={currencyType}
                    onChange={(e) => setCurrencyType(e.target.value)}
                >
                    <option value="">Currency Type</option>
                    <option key="USD" value="USD">USD</option>
                    <option key="KES" value="KES">EUR</option>
                    <option key="NGN" value="NGN">GBP</option>
                </select> 
                <button
                    type="button"
                    className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    // onClick={() => {
                    //     setFilter(fromAccount || toAccount || currencyType);
                    //     setFromAccount("");
                    //     setToAccount("");
                    //     setCurrencyType("");
                    // }}
                >
                    Filter
                </button> 
            </div>
        </form>
