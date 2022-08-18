let transacoes = [];
let transacoesSalvas = localStorage.getItem('transacoes');
if (transacoesSalvas != null) {
    transacoes = JSON.parse(transacoesSalvas);
    exibirDados();
} else {
    nenhumDado();
}

function salvar() {
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
    exibirDados();
}

function limparDados() {
    transacoes = [];
    salvar();
}

function renderizarTransacoes() {
    const elementoTransacoes = document.querySelector('.transacoes');
    elementoTransacoes.innerHTML = '';
    let valorTotal = 0;

    if (transacoes.length == 0) {
        nenhumDado();
        return false;
    }

    //Percorrendo as transacoes 
    transacoes.forEach(({ tipo, nome, valor }) => {
        if (tipo == 'compra') {
            valorTotal += parseFloat(valor);
        } else {
            valorTotal -= parseFloat(valor);
        }

        //Criando um elemento html para cada transacao
        elementoTransacoes.innerHTML += `
        <div class="transacao">
            <p class="transacao-tipo">
                ${(tipo == 'compra' ? '+' : '-')}
            </p>
            <p class="transacao-nome">
                ${nome}
            </p>
            <p class="transacao-valor">
                R$${valor.toLocaleString("pt-br", { minimumFractionDigits: 2 })}
            </p>
        </div>
        `
    });

    valorTotal = valorTotal.toFixed(2);
    renderizarTotal(parseFloat(valorTotal));
}

function renderizarTotal(valor) {
    const elementoTotal = document.querySelector('.valor-total');
    elementoTotal.innerHTML = `R$ ${valor.toLocaleString("pt-br", { minimumFractionDigits: 2 })}`;

    const elementoSituacao = document.querySelector('.situacao');
    if (valor > 0) {
        elementoSituacao.innerHTML = '[LUCRO]';
        elementoSituacao.style.color = 'green';
    } else if (valor < 0) {
        elementoSituacao.innerHTML = '[PREJUÍZO]';
        elementoSituacao.style.color = 'red';
    }
    else {
        elementoSituacao.innerHTML = '';
    }
}

function exibirDados() {
    renderizarTransacoes();
}

function validarInputs(e) {
    e.preventDefault();

    let nome = document.getElementById('nome').value;
    let valor = document.getElementById('valor').value;
    let tipo;

    if (document.getElementById('tipo-transacao').selectedIndex == 0) {
        tipo = 'compra';
    } else {
        tipo = 'venda'
    }

    if (nome.length == 0) {
        alert('Digite um nome válido!');
        return false;
    }
    else if (isNaN(valor) || valor.length == 0) {
        alert('Digite um valor numérico no campo valor!');
        return false;
    }
    else {
        transacoes.push({ tipo, nome, valor: parseFloat(valor) });
        salvar();
        exibirDados();
        limparCampos();
    }
}

function mascaraValor(e) {
    e.preventDefault();

    const elementoInput = e.target;
    const valorPattern = /[0-9]/g

    if (valorPattern.test(e.key)) {
        if (elementoInput.value.length == 2) {
            elementoInput.value = '.' + elementoInput.value;
        }

        elementoInput.value = e.key + elementoInput.value;
    }
}

const btnSalvar = document.querySelector('#adicionar');
btnSalvar.addEventListener('click', e => { validarInputs(e) });

const btnConfirmarLimparDados = document.querySelector('#confirmar');
btnConfirmarLimparDados.addEventListener('click', () => {
    limparDados();
    fecharOverlay();
});