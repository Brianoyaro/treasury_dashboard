import React, { useState } from "react";
import Logs from "./logs";
import TransferMoney from "./transferMoney";
import AccountCard from "./accountCard";

const accounts = [
    { id: 1, name: "Savings Account", currency: "USD", amount: 1500 },
    { id: 2, name: "Checking Account", currency: "KES", amount: 800 },
    { id: 3, name: "Investment Account", currency: "NGN", amount: 2500 }
];
const logs = [
    { id: 1, from_account: "Savings Account", to_account: "Checking Account", amount: 200, timestamp: "2023-10-01T12:00:00Z", note: "Monthly transfer" },
    { id: 2, from_account: "Checking Account", to_account: "Investment Account", amount: 500, timestamp: "2023-10-02T14:30:00Z", note: "" }
];

const FX = {
    KSH_USD: 1/150,
    KSH_NGN: 1/2.5,
    USD_KSH: 150,
    USD_NGN: 2.5,
    NGN_KSH: 1/20,
    NGN_USD: 1/180
};

export default function Dashboard() {
    const [accounts, setAccounts] = useState(accounts);
    const [logs, setLogs] = useState(logs);
    const onTransfer = (fromAccount, toAccount, amount, note) => {
        // Ensure both accounts are selected
        if (!fromAccount || !toAccount || !amount) {
            alert("Please fill in all fields.");
            return;
        }
        
        // Find the accounts
        const from = accounts.find(acc => acc.id === fromAccount);
        const to = accounts.find(acc => acc.id === toAccount);
        
        // Convert amount to the correct currency if necessary
        let convertedAmount = parseFloat(amount);
        if (from.currency !== to.currency) {
            const conversionKey = `${from.currency}_${to.currency}`;
            if (FX[conversionKey]) {
                convertedAmount = amount * FX[conversionKey];
            } else {
                alert("Currency conversion not supported.");
                return;
            }
        }
        // Validate the amount
        if (isNaN(convertedAmount) || convertedAmount <= 0) {
            alert("Invalid amount.");
            return;
        }
        // cannot transfer to the same account
        if (from === to) {
            alert("Cannot transfer to the same account.");
            return;
        }
        // Check if the from account has enough balance
        if (from.amount < convertedAmount) {
            alert("Insufficient balance in the from account.");
            return;
        }
        if (!from || !to) {
            alert("Invalid accounts selected.");
            return;
        }

        if (from && to && from.amount >= amount) {
            // Update account balances
            from.amount -= amount;
            to.amount += convertedAmount;

            // Create a new log entry
            const newLog = {
                id: logs.length + 1,
                from_account: from.name,
                to_account: to.name,
                amount: convertedAmount,
                timestamp: new Date().toISOString(),
                note
            };

            // Update state
            setAccounts([...accounts]);
            setLogs([...logs, newLog]);
        } else {
            alert("Transfer failed. Check account balances.");
        }
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="account-cards">
                {accounts.map((account) => (
                    <AccountCard key={account.id} account={account} />
                ))}
            </div>
            <TransferMoney accounts={accounts} onTransfer={onTransfer} />
            <Logs logs={logs} />
        </div>
    );
}