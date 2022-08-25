function randomDate(start, end) {
    var date = new Date(+start + Math.random() * (end - start));
    return date;
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export default function GenerateRandomTransactions(Customers, amount, date_begin, date_end, trans_start, trans_end) {
    const rv= [];
    for (let i = 0; i < amount; i++) {
        let new_obj = {
            id: i,
            customerId: randomIntFromInterval(0, Customers.length - 1),
            transactionAmount: randomIntFromInterval(trans_start, trans_end),
            transactionDate: randomDate(date_begin, date_end)
        }
        rv.push(new_obj);
    }
    return rv;
}