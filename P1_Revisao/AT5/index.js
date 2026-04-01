import fs from 'fs/promises';

async function gerarRelatorio() {
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const header = `Relatório Gerado para FATEC - ${dataAtual}\n\n`;

    try{
        //Leitura do arquivo original 
        const conteudoOriginal = await fs.readFile('./estudantes.csv', 'utf-8');

        //União do cabeçalho com o conteúdo
        const relatorioFinal = header + conteudoOriginal;

        //Escrita do novo arquivo 
        await fs.writeFile('./export_relatorio.txt', relatorioFinal);

        console.log("Relatório exportado com sucesso para export_relatorio.txt!")
    } catch (erro) {
        console.error("Erro na automação de dados:", erro.message);
    }
}

gerarRelatorio();