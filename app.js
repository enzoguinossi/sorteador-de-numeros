// Função para exibir texto na tela
function exibirTextoNaTela(texto) {
    let campo = document.querySelector('#resultado label');
    campo.innerHTML = texto;
}

// Função para validar os campos
function validarCampos() {
    const doNumero = document.getElementById('de').value;
    const ateNumero = document.getElementById('ate').value;
    const quantidadeSorteada = document.getElementById('quantidade').value;

    // Verifica se algum campo está vazio ou se contém valores não numéricos
    if (doNumero === "" || ateNumero === "" || quantidadeSorteada === "" || isNaN(doNumero) || isNaN(ateNumero) || isNaN(quantidadeSorteada)) {
        console.error('Um ou mais campos estão vazios ou não contêm números válidos.');
        exibirTextoNaTela('Por favor, preencha todos os campos com números válidos!');
        return false; // Retorna falso para interromper o processo
    }
    return true; // Retorna verdadeiro se tudo estiver correto
}

const botaoLimpar = document.getElementById('btn-limpar');
// Função para ativar ou desativar o botão de limpar
function verificarBotaoLimpar() {
    const doNumero = document.getElementById('de').value;
    const ateNumero = document.getElementById('ate').value;
    const quantidadeSorteada = document.getElementById('quantidade').value;

    // Se qualquer campo estiver preenchido, ativa o botão de limpar
    if (doNumero !== "" || ateNumero !== "" || quantidadeSorteada !== "") {
        document.getElementById('btn-limpar').removeAttribute('disabled');
        botaoLimpar.style.cursor = 'pointer';
    } else {
        // Caso contrário, desabilita o botão de limpar
        document.getElementById('btn-limpar').setAttribute('disabled', true);
        botaoLimpar.style.cursor = 'not-allowed';
    }
}

// Função de limpar
function limpar() {
    console.log('Limpando os campos!')
    // Limpa os valores dos campos
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';

    // Limpa o texto exibido
    exibirTextoNaTela("");

    // Desabilita o botão de limpar
    document.getElementById('btn-limpar').setAttribute('disabled', true);
    botaoLimpar.style.cursor = 'not-allowed';
}

// Função de sorteio
function sortear() {
    // Chama a função de validação
    if (!validarCampos()) {
        return; // Se a validação falhar, interrompe a execução do sorteio
    }

    // Obtém os valores dos campos
    const quantidadeSorteada = parseInt(document.getElementById('quantidade').value); 
    const doNumero = parseInt(document.getElementById('de').value); 
    const ateNumero = parseInt(document.getElementById('ate').value); 

    // Cria uma lista vazia onde serão armazenados os números sorteados
    const numerosSorteados = [];

    // Validações para garantir que as entradas sejam lógicas e consistentes
    if (doNumero > ateNumero) {
        console.error('O número mínimo não pode ser maior que o número máximo.');
        exibirTextoNaTela('O número mínimo não pode ser maior que o número máximo!');
        return;
    }

    if (doNumero === ateNumero) {
        console.error('O número mínimo não pode ser igual ao número máximo.');
        exibirTextoNaTela('O número mínimo não pode ser igual ao número máximo!');
        return;
    }

    if ((ateNumero - doNumero + 1) < quantidadeSorteada) {
        console.error('A quantidade de números a serem sorteados é maior do que o intervalo disponível.');
        exibirTextoNaTela('A quantidade de números a serem sorteados deve ser menor ou igual ao intervalo entre o número mínimo e o máximo!');
        return;
    }

    // Gera os números aleatórios dentro do intervalo definido até atingir a quantidade solicitada
    while (numerosSorteados.length < quantidadeSorteada) {
        numerosSorteados.push(
            parseInt(Math.random() * (ateNumero - doNumero + 1) + doNumero) // Sorteia um número entre o intervalo [doNumero, ateNumero]
        );
    }

    // Define o texto singular ou plural para o resultado
    let sorteadoPlural = numerosSorteados.length === 1 
        ? 'O número sorteado foi:' 
        : 'Os números sorteados foram:';

    // Monta a mensagem final com os números sorteados
    let mensagemDeResultado = `${sorteadoPlural} ${numerosSorteados.join(', ')}`;

    // Exibe a mensagem final na tela
    exibirTextoNaTela(mensagemDeResultado);
    console.log('Sorteando os números!');
}

// Adiciona eventos para verificar sempre que os campos mudarem
document.getElementById('quantidade').addEventListener('input', verificarBotaoLimpar);
document.getElementById('de').addEventListener('input', verificarBotaoLimpar);
document.getElementById('ate').addEventListener('input', verificarBotaoLimpar);
