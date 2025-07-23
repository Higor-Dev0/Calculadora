const display = document.querySelector('.resultado');
let expressao = '';

const botoes = [
    { id: 'btn0', value: '0', tipo: 'numero' },
    { id: 'btn1', value: '1', tipo: 'numero' },
    { id: 'btn2', value: '2', tipo: 'numero' },
    { id: 'btn3', value: '3', tipo: 'numero' },
    { id: 'btn4', value: '4', tipo: 'numero' },
    { id: 'btn5', value: '5', tipo: 'numero' },
    { id: 'btn6', value: '6', tipo: 'numero' },
    { id: 'btn7', value: '7', tipo: 'numero' },
    { id: 'btn8', value: '8', tipo: 'numero' },
    { id: 'btn9', value: '9', tipo: 'numero' },
    { id: 'btnSoma', value: '+', tipo: 'operador' },
    { id: 'btnSubtracao', value: '-', tipo: 'operador' },
    { id: 'btnMultiplicacao', value: '*', tipo: 'operador' },
    { id: 'btnDivisao', value: '/', tipo: 'operador' },
    { id: 'btnLimpar', value: 'C', tipo: 'limpar' },
    { id: 'btnIgual', value: '=', tipo: 'calcular' }
];

function atualizarDisplay() {
    display.textContent = expressao || '0';
}

function adicionarNumero(digito) {
    expressao += digito;
    atualizarDisplay();
}

function adicionarOperador(operador) {
    if (expressao === '' || /[+\-*/]$/.test(expressao)) return;
    expressao += operador;
    atualizarDisplay();
}

function limpar() {
    expressao = '';
    atualizarDisplay();
}

function calcular() {
    try {
        let resultado = eval(expressao);
        expressao = resultado.toString();
        atualizarDisplay();
    } catch {
        display.textContent = 'Erro';
        expressao = '';
    }
}

botoes.forEach(botao => {
    const btn = document.getElementById(botao.id);
    btn.addEventListener('click', () => {
        if (botao.tipo === 'numero') adicionarNumero(botao.value);
        else if (botao.tipo === 'operador') adicionarOperador(botao.value);
        else if (botao.tipo === 'limpar') limpar();
        else if (botao.tipo === 'calcular') calcular();
    });
});

const toggleBtn = document.getElementById('toggleMode');

function aplicarTema(tema) {
    if (tema === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        toggleBtn.textContent = '☀️ Modo Claro';
        toggleBtn.setAttribute('aria-pressed', 'true');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        toggleBtn.textContent = '🌙 Modo Escuro';
        toggleBtn.setAttribute('aria-pressed', 'false');
    }
    localStorage.setItem('temaCalculadora', tema);
}

const temaSalvo = localStorage.getItem('temaCalculadora') || 'light';
aplicarTema(temaSalvo);

toggleBtn.addEventListener('click', () => {
    const modoAtual = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    aplicarTema(modoAtual === 'dark' ? 'light' : 'dark');
});

document.addEventListener('keydown', e => {
    if (e.target.tagName === 'BUTTON') return;

    if ('0123456789'.includes(e.key)) {
        adicionarNumero(e.key);
    } else if ('+-*/'.includes(e.key)) {
        adicionarOperador(e.key);
    } else if (e.key === 'Enter') {
        calcular();
    } else if (e.key === 'Backspace') {
        expressao = expressao.slice(0, -1);
        atualizarDisplay();
    } else if (e.key.toLowerCase() === 'c') {
        limpar();
    }
});