import React, { useEffect, useState } from "react";
import "./CustomerTable.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { GetAllCustomers, sleep } from "../../APIs/APIs";

export default function CustomersTable(props) {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        GetAllCustomers()
        .then((res) => {
            setCustomers(res.Customers);
            setLoading(false)
        })
    }, []);

    return (
        <div className="CustomerTableContainer">
            <h1>Customers</h1>
            {loading ?
                <LoadingAnimation />
                :
                <>
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                        {
                            customers.map((customer) => {
                                return <tr key={`${ customer.id }_${ new Date().getTime() }`}>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                </>
            }

        </div>
    )
}