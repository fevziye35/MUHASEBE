export const exportToExcel = (data, headers, fileName = 'report', sheetName = 'Sheet1') => {
  try {
    // Excel XML Sheet (SpreadsheetML) format - En garantili yöntem
    let excelContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${sheetName}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>
      <body><table>
        <thead><tr style="background:#ddd"><th>${headers.join('</th><th>')}</th></tr></thead>
        <tbody>
          ${data.map(row => `<tr><td>${row.join('</td><td>')}</td></tr>`).join('')}
        </tbody>
      </table></body></html>`;

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    // Dosya adı temizliği
    let cleanFileName = (fileName || 'report').toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/gi, '_');
    
    if (!cleanFileName.endsWith('.xls')) {
        cleanFileName += '.xls';
    }

    link.href = url;
    link.download = cleanFileName;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    
    // Tarayıcı engelini aşmak için gecikmeli tetikleme
    setTimeout(() => {
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    }, 50);
  } catch (error) {
    console.error('Export error:', error);
  }
};
