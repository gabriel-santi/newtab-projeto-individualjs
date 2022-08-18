function nenhumDado() {
    document.querySelector('.transacoes').innerHTML = '<h3 class="alerta-transacao">Nenhuma transação cadastrada</h3>';
    document.querySelector('.valor-total').innerHTML = 'R$0,00';
    document.querySelector('.situacao').innerHTML = '';
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
}

function mostrarOverlay() {
    document.querySelector('.overlay').style.display = 'block';
}

function fecharOverlay() {
    document.querySelector('.overlay').style.display = 'none';
}

function abrirNavbar() {
    document.querySelector('.navBar').style.display = 'flex';
}

function fecharNavbar() {
    if (window.innerWidth < 1024) {
        document.querySelector('.navBar').style.display = 'none';
    }
}

const btnLimparDados = document.querySelector("#limparDados");
btnLimparDados.addEventListener('click', () => {
    mostrarOverlay();
    fecharNavbar();
})


const btnCadastrar = document.querySelector("#cadastrar");
btnCadastrar.addEventListener('click', () => {
    document.querySelector('#nome').focus();
    fecharNavbar();
})
