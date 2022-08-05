/* {tipo: "compra", nome: "ww", valor: 20.2}
1: {tipo: "compra", nome: "1aaa", valor: 32.43}
2: {tipo: "compra", nome: "a", valor: 0.43}
3: {tipo: "venda", nome: "b", valor: 0.06}
4: {tipo: "compra", nome: "e", valor: 221.1}
5: {tipo: "compra", nome: "as", valor: 2.32}
6: {tipo: "compra", nome: "s", valor: 2.21}
7: {tipo: "compra", nome: "ddd", valor: 1.11}
8: {tipo: "compra", nome: "ds", valor: 1.11}
9: {tipo: "compra", nome: "2323", valor: 32.32}
10: {tipo: "compra", nome: "teste", valor: 2.22}
11: {tipo: "compra", nome: "teste", valor: 2.22}
12: {tipo: "compra", nome: "teste", valor: 22.22}
13: {tipo: "compra", nome: "teste", valor: 3.12}
14: {tipo: "compra", nome: "teste", valor: 12.12}
15: {tipo: "compra", nome: "teste", valor: 1.11} */
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

    //Preenchendo os extratos
    transacoes.forEach(({ tipo, nome, valor }) => {
        elementoTransacoes.innerHTML += `
        <div class="transacao">
            <p class="transacao-tipo">
                ${(tipo == 'compra' ? '+' : '-')}
            </p>
            <p class="transacao-nome">
                ${nome}
            </p>
            <p class="transacao-valor">
                R$${valor.toString().replace('.', ',')}
            </p>
        </div>
        `
    })
}

function renderizarTotal() {
    let valorTotal = 0;
    transacoes.forEach(({ tipo, valor }) => {
        if (tipo == 'compra') {
            valorTotal += parseFloat(valor);
        } else {
            valorTotal -= parseFloat(valor);
        }
    })
    valorTotal = valorTotal.toFixed(2);

    const elementoTotal = document.querySelector('.valor-total');
    elementoTotal.innerHTML = `R$${valorTotal.toString().replace('.', ',')}`;

    const elementoSituacao = document.querySelector('.situacao');
    if (valorTotal > 0) {
        elementoSituacao.innerHTML = 'LUCRO';
        elementoSituacao.style.color = 'green';
    } else if (valorTotal < 0) {
        elementoSituacao.innerHTML = 'PREJUÍZO';
        elementoSituacao.style.color = 'red';
    }
    else {
        elementoSituacao.innerHTML = 'NEUTRO';
        elementoSituacao.style.color = 'grey';
    }
}

function exibirDados() {
    renderizarTransacoes();
    renderizarTotal();
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
    else if (valor.length < 4) {
        alert('O valor deve conter pelo menos três números!');
        return false;
    }
    else {
        transacoes.push({ tipo, nome, valor: parseFloat(valor.replace(',', '.')) });
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
        elementoInput.value = e.key + elementoInput.value;

        if (elementoInput.value.length == 2) {
            elementoInput.value = ',' + elementoInput.value;
        }
    }
}

const btnSalvar = document.querySelector('#adicionar');
btnSalvar.addEventListener('click', e => { validarInputs(e) });

const btnConfirmarLimparDados = document.querySelector('#confirmar');
btnConfirmarLimparDados.addEventListener('click', () => {
    limparDados();
    fecharOverlay();
});