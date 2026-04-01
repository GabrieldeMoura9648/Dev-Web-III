import fs from 'fs/promises';

async function gerenciarlog() {
    const dataHora = new Date().toLocaleString('pt-BR');
    const entrada = `Novo acesso registrado em: ${dataHora}\n`;

    try {
        // appendFile verifica se existe o arquivo
        // Caso sim add ao final, caso não cria o arquivo
        await fs.appendFile('./log.txt', entrada);
        console.log("Registro de log concluído com sucesso!");
    } catch (erro) {
        console.error("Erro ao processar o log:", erro.message);
    }
}

gerenciarlog();