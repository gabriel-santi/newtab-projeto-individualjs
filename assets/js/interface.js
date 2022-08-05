function nenhumDado() {
    document.querySelector('.transacoes').innerHTML = '<h3 class="alerta-transacao">Nenhuma transação cadastrada</h3>'
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
}

function mostrarOverlay() {
    const elementoOverlay = document.querySelector('.overlay');
    elementoOverlay.style.display = 'block';
}

function fecharOverlay() {
    document.querySelector('.overlay').style.display = 'none';
}

function abrirNavbar() {
    document.querySelector('nav').style.display = 'flex';
}

function fecharNavbar() {
    document.querySelector('nav').style.display = 'none';
}

const btnsCadastrar = document.querySelectorAll("[data-js='cadastrar']");
btnsCadastrar.forEach(botao => {
    botao.addEventListener('click', () => {
        fecharNavbar();
        document.querySelector('#nome').focus();
    })
})

const btnsLimparDados = document.querySelectorAll("[data-js='limparDados']");
btnsLimparDados.forEach(botao => {
    botao.addEventListener('click', () => {
        mostrarOverlay();
        fecharNavbar();
    });
})

const btnFecharOverlay = document.querySelector('#cancelar');
btnFecharOverlay.addEventListener('click', fecharOverlay);

const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', fecharOverlay);

const btnAbrirNav = document.querySelector('#abrirNav');
btnAbrirNav.addEventListener('click', abrirNavbar);

const btnFecharNav = document.querySelector('#fecharNav');
btnFecharNav.addEventListener('click', fecharNavbar);

const x = document.querySelector("[data-js = 'linha']");
console.log(x);