function exibirTextoNaTela(texto) {
    let campo = document.querySelector('#resultado label');
    campo.innerHTML = texto;
}

function sortear() {
    // Obtém os valores de entrada do usuário
    const quantidadeSorteada = parseInt(document.getElementById('quantidade').value); // Quantidade de números a serem sorteados
    const doNumero = parseInt(document.getElementById('de').value); // Número inicial do intervalo
    const ateNumero = parseInt(document.getElementById('ate').value); // Número final do intervalo

    // Cria uma lista vazia onde serão armazenados os números sorteados
    const numerosSorteados = [];

    // Validações para garantir que as entradas sejam lógicas e consistentes
    if (isNaN(doNumero) || isNaN(ateNumero) || isNaN(quantidadeSorteada)) {
        console.error('Um ou mais valores inseridos não são números válidos');
        exibirTextoNaTela('Por favor, insira apenas números nos campos!');
        return;
    }
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
}
