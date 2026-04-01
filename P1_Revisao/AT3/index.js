import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
    //Rota raiz (/) - HTML
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end('<h1>Portal APIs acadêmicas</h1>');
    }
    //Rotas /institucao - JSON
    else if (req.url === '/instituicao') {
        const info = {
            nome: "Fatec",
            cidade: "SP",
            status: "online"
        };
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(info));
    }
    //Rota não mapeada - Retorna 404
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8'});
        res.end('Recurso não encontrado');
    }
});

server.listen(PORT, () => {
    console.log(`Servidor de pé em http://localhost:${PORT}`);
    console.log("Para testar, acesse / ou /instiruicao no seu navegador.");
});