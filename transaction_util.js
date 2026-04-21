
/* --- SHARED TRANSACTION UTILITY --- */
function addStockTransaction(transactionData) {
    /* 
      Expected transactionData:
      {
         stockId: number|string, (Optional if we want to filter by stock, but currently stok_detay just reads all. We should add stockId in future but for now follow existing pattern)
         date: string (YYYY-MM-DD),
         type: string,
         desc: string,
         warehouse: string,
         amount: string|number
      }
    */
    const transactions = JSON.parse(localStorage.getItem('stockTransactions')) || [];

    // Auto-increment ID
    const maxId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) : 0;
    const newId = maxId + 1;

    const newTransaction = {
        id: newId,
        date: transactionData.date || new Date().toISOString().split('T')[0],
        type: transactionData.type || 'ISLEM',
        desc: transactionData.desc || '',
        warehouse: transactionData.warehouse || '-',
        amount: transactionData.amount || '0',
        stockId: transactionData.stockId || null // Good practice to store this
    };

    transactions.push(newTransaction);
    localStorage.setItem('stockTransactions', JSON.stringify(transactions));
    console.log('Transaction added:', newTransaction);
}
