const fs = require('fs');
const path = require('path');

const prefix = `<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title><span data-i18n="word.stok_kartlari">Stok Kartları</span></title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .sidebar-logo img {
`;

let html = fs.readFileSync(path.join(__dirname, 'stok_kartlari.html'), 'utf8');
html = prefix + html;
fs.writeFileSync(path.join(__dirname, 'stok_kartlari.html'), html, 'utf8');
console.log('Restored template header + inserted no-cache');
