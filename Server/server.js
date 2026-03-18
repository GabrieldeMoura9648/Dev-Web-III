const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const basePath = __dirname;

function serveHTML(res, fileName) {
    const filePath = path.join(basePath, fileName);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Erro ao carregar página');
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {

    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        return res.end('Método não permitido');
    }

    const url = req.url.split('?')[0];

    if (url === '/style.css') {
        const filePath = path.join(basePath, 'style.css');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('CSS não encontrado');
            }

            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    }

    else if (url === '/pdf') {
        const filePath = path.join(basePath, 'exemplo.pdf');

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404);
                return res.end('Arquivo PDF não encontrado');
            }

            res.writeHead(200, { 'Content-Type': 'application/pdf' });
            fs.createReadStream(filePath).pipe(res);
        });
    }

    else if (url === '/jpeg') {
        const filePath = path.join(basePath, 'exemplo.jpeg');

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404);
                return res.end('Imagem não encontrada');
            }

            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            fs.createReadStream(filePath).pipe(res);
        });
    }

    else if (url === '/json') {
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

    else if (url === '/' || url === '/site') {
        serveHTML(res, 'index.html');
    }

    else if (url === '/quemsou') {
        serveHTML(res, 'quemsou.html');
    }

    else if (url === '/produtos') {
        serveHTML(res, 'produtos.html');
    }

    else if (url === '/perguntas') {
        serveHTML(res, 'perguntas.html');
    }

    else if (url === '/produto1') {
        serveHTML(res, 'produto1.html');
    }

    else if (url === '/produto2') {
        serveHTML(res, 'produto2.html');
    }

    else if (url === '/produto3') {
        serveHTML(res, 'produto3.html');
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('ERROR 404: Rota não encontrada');
    }

});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});