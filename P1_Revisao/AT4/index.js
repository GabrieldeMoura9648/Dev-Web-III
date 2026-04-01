import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
    //Definimos o cabeçalho padrão para texto simples com acentuação correta
    const headers = { 'Content-Type': 'text/plain; charset=utf-8' };

    if (req.url === '/fatec') {
        res.writeHead(200, headers); //Sucesso
        res.end('Bem vindo a FATEC');
    } else {
        //Qualquer outra rota enviamos erro 404
        res.writeHead(404, headers); //404: Not Found
        res.end('404: Recurso não encontrado no Servidor');
    }
});

server.listen(PORT, () => {
    console.log(`Roteador institucional ativo em http://localhost:${PORT}`);
    console.log('Teste as rotas: /fatec, /fecap ou qualquer outra para ver o 404');
});