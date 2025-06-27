import React from "react";

export default function Logs({ logs }) {
    // log data is id, from_account, to_account, amount, timestamp, note

    return (
        <div className="logs">
            <h2>Transaction Logs</h2>
            {logs.map((log) => (
                <div key={log.id} className="log-entry">
                    <p><strong>From:</strong>  {log.from_account}</p>
                    <p><strong>To:</strong> {log.to_account}</p>
                    <p><strong>Amount:</strong> {log.from_currency_type} {log.amount}</p>
                    <p><strong>Date:</strong> {new Date(log.timestamp).toLocaleString()}</p>
                    {log.note && <p><strong>Note:</strong> {log.note}</p>}
                </div>
            ))}
        </div>
    )
}