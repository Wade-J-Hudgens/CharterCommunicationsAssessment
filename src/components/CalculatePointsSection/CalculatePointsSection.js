import { useEffect, useState } from "react";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { CalculateRewardPointsForCustomer, sleep } from "../../APIs/APIs";
import "./CalculatePointsSection.css"

export default function CalculatePointsSection(props) {
    const [customerId, setCustomerId] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    const [points, setPoints] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");



    useEffect(()=> {
        CalculateRewardPointsForCustomer(
            parseInt(customerId), 
            minDate === "" ? -1 : new Date(minDate.replace("-", "/")),
            maxDate === "" ? -1 : new Date(maxDate.replace("-", "/"))
            )
        .then((res) => {
            setPoints(res.totalPoints);
            setName(res.name);
            setId(res.id);
        })
    }, [customerId, minDate, maxDate])
    return (
        <div className="CalculatePointsSection">
            <h1>Calculate Points For A Customer</h1>
            <label>Customer ID: The customer's ID to search</label>
            <label>Min Date: The minimum date to search</label>
            <label>Max Date: The maximum date to search</label>
            <div className="CalculatePointsSectionInputContainer">
                <div>
                    <label>Customer ID:</label>
                    <input value={customerId} onChange={async (e)=>{setCustomerId(e.target.value)}} type="number"></input>
                </div>
                <div>
                    <label>Min Date:</label>
                    <input value={minDate} onChange={(e)=>{setMinDate(e.target.value)}} type="date"></input>
                </div>
                <div>
                    <label>Max Date:</label>
                    <input value={maxDate} onChange={(e)=>{setMaxDate(e.target.value)}} type="date"></input>
                </div>
            </div>
            <h2 className="CalculatePointsSectionLabel">
                {
                    (customerId === "" || name === "") ?
                    "Invalid ID"
                    :
                    `${name} (ID=${id}) has earned ${points} in this time period.`
                }
            </h2>
        </div>
    )
}