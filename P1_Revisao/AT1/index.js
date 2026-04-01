import fs from 'fs/promises'; 

async function carregarConfig() {
    try {
        const dados = await fs.readFile('./config.json', 'utf-8'); //assinc
        const config = JSON.parse(dados); // Converte JSON para Obj de JS
        console.log(`Configuração carregada para o curso ${config.curso} no campus ${config.campus}`);
    } catch (erro) {
        console.error("Erro ao ler o arquivo:", erro.mensage); // Tratamento
    }
}
carregarConfig()