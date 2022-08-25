import GenerateRandomTransactions from "./CreateTransactions";

const Customers = [
    {
        id: 0,
        name: "Bob",
    },
    {
        id: 1,
        name: "Jack",
    },
    {
        id: 2,
        name: "Samantha",
    },
    {
        id: 3,
        name: "Wade",
    },
    {
        id: 4,
        name: "Brianna",
    },
]
const Transactions = GenerateRandomTransactions(Customers, 200, new Date(2022, 2, 1), new Date(2022, 7, 1), 1, 200);

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function sleep(time) {
    await timeout(time);
    return;
}

async function GetAllCustomers_APILogic() {
    await sleep(1000 + Math.floor(Math.random()*500));
    return {Customers: Customers}
}
export async function GetAllCustomers() {
    return GetAllCustomers_APILogic()
    .then((res) => {
        return res;
    })
}

async function GetAllTransactions_APILogic() {
    await sleep(1000 + Math.floor(Math.random()*500));
    return {Transactions: Transactions}
}
export async function GetAllTransactions() {
    return GetAllTransactions_APILogic()
    .then((res) => {
        return res;
    })
}



function CalculatePointsFromTransaction(amount) {
    let total = 0;
    total += Math.max(0, amount - 100);
    total += Math.max(0, amount - 50);
    return total;
}
/**
 * This function calculates the reward points earned for a specified customer in a specified date range. (API)
 * @param {number} id - Customer id to calculate
 * @param {Date | -1} day_start - Inclusive day to start calculations. Use -1 for earliest 
 * @param {Date | -1} day_end - Inclusive day to end calculations. Use -1 for latest
 * @returns {Promise}
 */
async function CalculateRewardPointsForCustomer_APILogic(id, day_start, day_end) {
    await sleep(200);
    let total_points = 0;
    let name = Customers.find(ele => ele.id === id);
    name = name === undefined ? "" : name.name;

    for (let i = 0; i < Transactions.length; i++) {
        let is_late_enough = day_start !== -1 ?
        Transactions[i].transactionDate >= day_start ? true : false
        :
        true;

        let is_early_enough = day_end !== -1 ?
        Transactions[i].transactionDate <= day_end ? true : false
        :
        true;

        if (Transactions[i].customerId === id && is_early_enough && is_late_enough) {
            total_points += CalculatePointsFromTransaction(Transactions[i].transactionAmount);
        }
    }

    return {totalPoints: total_points, name: name, id: id}
}

/**
 * This function calculates the reward points earned for a specified customer in a specified date range. (API)
 * @param {number} id - Customer id to calculate
 * @param {Date | -1} day_start - Inclusive day to start calculations. Use -1 for earliest 
 * @param {Date | -1} day_end - Inclusive day to end calculations. Use -1 for latest
 * @returns {Promise}
 */
export async function CalculateRewardPointsForCustomer(id, day_start, day_end) {
    return CalculateRewardPointsForCustomer_APILogic(id, day_start, day_end)
    .then((res) => {
        return res
    })
}