import React from "react";

export default function AccountCard({ account }) {
    // card data is id, name, currencyType, amount
    return (
        <div className="account-card" onClick={toggleExpand}>
            <h3>{account.name}</h3>
            <p>Currency: {account.currencyType}</p>
            <p>Amount: {account.amount}</p>
        </div>
    );
}