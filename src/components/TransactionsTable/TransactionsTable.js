import { useState, useEffect } from "react";
import "./TransactionsTable.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { GetAllTransactions, GetAllCustomers, sleep } from "../../APIs/APIs";
import { renderMatches } from "react-router-dom";

export default function TransactionsTable(props) {
    const [transactions, setTransactions] = useState([]);
    const [transactionsToShow, setTransactionsToShow] = useState([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const [customerId, setCustomerId] = useState("");
    const [transactionAmountMin, setTransactionAmountMin] = useState("");
    const [transactionAmountMax, setTransactionAmountMax] = useState("");
    const [dateMin, setDateMin] = useState("");
    const [dateMax, setDateMax] = useState("");

    useEffect(()=>{
        GetAllTransactions()
        .then((res) => {
            setTransactions(res.Transactions);
        })
        .then(()=> {
            setLoading(false)
        })
    }, []);

    useEffect(()=>{
        let new_trans_to_show = transactions.map((transaction) => {
            return {
                id: transaction.id,
                customerId: transaction.customerId,
                transactionAmount: transaction.transactionAmount,
                transactionDate: transaction.transactionDate
            }
        });

        setTransactionsToShow(new_trans_to_show);
    }, [transactions])

    useEffect(()=> {
        let new_trans_to_show = transactions.filter((transaction) => {
            let meets_custId = customerId === "" ? true : customerId == transaction.customerId;
            let meets_transMin = transactionAmountMin === "" ? true : transaction.transactionAmount >= transactionAmountMin;
            let meets_transMax = transactionAmountMax === "" ? true : transaction.transactionAmount <= transactionAmountMax;
            let meets_dateMin = dateMin === "" ? true : transaction.transactionDate >= new Date(dateMin.replace("-", "/"));
            let meets_dateMax = dateMax === "" ? true : transaction.transactionDate <= new Date(dateMax.replace("-", "/"));

            return (meets_custId && meets_transMin && meets_transMax && meets_dateMin && meets_dateMax)
        });

        setTransactionsToShow(new_trans_to_show)
        setPage(1);
    }, [customerId, transactionAmountMax, transactionAmountMin, dateMin, dateMax])

    return (
        <div className="TransactionTableContainer">
            <h1>
                Transactions
            </h1>
            {loading ?
                <LoadingAnimation />
                :
                <>
                    <div className="TransactionTableFilterSortContainer">
                        <div>
                            <label>Customer ID:</label>
                            <input value={customerId} onChange={(e) => {setCustomerId(e.target.value)}} type="number"></input>
                        </div>
                        <div>
                            <label>Transaction Amount Min:</label>
                            <input value={transactionAmountMin} onChange={(e) => {setTransactionAmountMin(e.target.value)}} type="number"></input>
                        </div>
                        <div>
                            <label>Transaction Amount Max:</label>
                            <input value={transactionAmountMax} onChange={(e) => {setTransactionAmountMax(e.target.value)}} type="number"></input>
                        </div>
                        <div>
                            <label>Date Min:</label>
                            <input value={dateMin} onChange={(e) => {setDateMin(e.target.value)}} type="date"></input>
                        </div>
                        <div>
                            <label>Date Max:</label>
                            <input value={dateMax} onChange={(e) => {setDateMax(e.target.value)}} type="date"></input>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Customer ID</th>
                                <th>Transaction Amount</th>
                                <th>Transaction Date</th>
                            </tr>
                            {
                                
                                transactionsToShow.slice(7*(page-1), 7*(page)).map((transaction) => {
                                    return <tr key={`${ transaction.id }_${ new Date().getTime() }`}>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.customerId}</td>
                                        <td>{transaction.transactionAmount}</td>
                                        <td>{transaction.transactionDate.toString()}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <div className="TransactionTablePaginationContainer">
                        <label>{page} / {Math.max(Math.ceil(transactionsToShow.length / 7), 1)}</label>
                        <button onClick={()=>{
                            if (page > 1) {
                                setPage(page-1);
                            }
                        }}>&lt;</button>
                        <button onClick={()=>{
                            if (page < Math.max(Math.ceil(transactionsToShow.length / 7),1)) {
                                setPage(page+1);
                            }
                        }}>&gt;</button>
                    </div>
                </>
            }

        </div>
    )
}