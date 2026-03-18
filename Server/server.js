const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Caminho base da pasta Server
const basePath = __dirname;

const server = http.createServer((req, res) => {

    // 🔒 Garante que só responde GET
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        return res.end('Método não permitido');
    }

    // 📄 PDF
    if (req.url === '/pdf') {
        const filePath = path.join(basePath, 'exemplo.pdf');

        fs.exists(filePath, (exists) => {
            if (!exists) {
                res.writeHead(404);
                return res.end('Arquivo PDF não encontrado');
            }

            res.writeHead(200, { 'Content-Type': 'application/pdf' });
            fs.createReadStream(filePath).pipe(res);
        });
    }

    // 🖼️ JPEG
    else if (req.url === '/jpeg') {
        const filePath = path.join(basePath, 'exemplo.jpeg');

        fs.exists(filePath, (exists) => {
            if (!exists) {
                res.writeHead(404);
                return res.end('Imagem não encontrada');
            }

            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            fs.createReadStream(filePath).pipe(res);
        });
    }

    // 📦 JSON (AGORA LENDO DO ARQUIVO)
    else if (req.url === '/json') {
        const filePath = path.join(basePath, 'exemplo.json');

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Erro ao ler JSON');
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    }

    // 🌐 HTML
    else if (req.url === '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.end(`
            <html>
                <head>
                    <title>Servidor Node</title>
                </head>
                <body>
                    <h1>Servidor funcionando</h1>
                    <p>Rota HTML ativa.</p>
                </body>
            </html>
        `);
    }

    // ❌ 404
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('ERROR 404: Rota não encontrada');
    }

});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});