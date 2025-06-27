import React, { useState } from "react";

export default function TransferMoney({ accounts, onTransfer }) {
    const [fromAccount, setFromAccount] = useState("");
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");

    const handleTransfer = (e) => {
        e.preventDefault();
        if (fromAccount && toAccount && amount) {
            onTransfer(fromAccount, toAccount, amount, note);
            setFromAccount("");
            setToAccount("");
            setAmount("");
            setNote("");
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="transfer-money">
            <h2>Transfer Money</h2>
            <form onSubmit={(e) => { handleTransfer(e); }}>
                <div>
                    <label>From Account:</label>
                    <select value={fromAccount} onChange={(e) => setFromAccount(e.target.value)}>
                        <option value="">Select Account</option>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>{account.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>To Account:</label>
                    <select value={toAccount} onChange={(e) => setToAccount(e.target.value)}>
                        <option value="">Select Account</option>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>{account.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Amount:</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div>
                    <label>Note:</label>
                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
                <button type="submit">Transfer</button>
            </form>
        </div>
    );
}