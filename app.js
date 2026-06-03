// ==========================================
// 1. SELEÇÃO DE ELEMENTOS E ESTADOS GLOBAIS
// ==========================================
const corpoPagina = document.body;
const containerMenu = document.querySelector('#menu-navegacao');

let tamanhoFonteAtual = 16;
let modoNoturnoAtivo = false;

const botoesMenu = [
    { texto: "Home", link: "#hero" },
    { texto: "Nossa História", link: "#quem-somos" },
    { texto: "Transparência", link: "#transparencia" },
    { texto: "Contato", link: "#contato" }
];

// ==========================================
// 2. CONSTRUÇÃO E GERENCIAMENTO DO MENU (HEADER)
// ==========================================
const renderizarMenuCompleto = () => {
    if (!containerMenu) return;

    containerMenu.innerHTML = '';

    botoesMenu.forEach(({ texto, link }) => {
        const novoBotao = document.createElement('a');
        novoBotao.href = link;
        novoBotao.innerText = texto;
        novoBotao.classList.add('botao-menu');
        containerMenu.appendChild(novoBotao);
    });

    const btnDoacao = document.createElement('button');
    btnDoacao.innerText = '❤️ Quero Ajudar';
    btnDoacao.classList.add('btn-menu-doacao');
    btnDoacao.addEventListener('click', () => {
        const secaoDoacoes = document.querySelector('#doacoes');
        if (secaoDoacoes) secaoDoacoes.scrollIntoView({ behavior: 'smooth' });
    });
    containerMenu.appendChild(btnDoacao);

    const btnDiminuir = document.createElement('button');
    btnDiminuir.innerText = '➖A';
    btnDiminuir.title = 'Diminuir Texto';
    btnDiminuir.classList.add('btn-icone');
    btnDiminuir.addEventListener('click', () => {
        if (tamanhoFonteAtual > 14) {
            tamanhoFonteAtual -= 2;
            corpoPagina.style.fontSize = `${tamanhoFonteAtual}px`;
        }
    });
    containerMenu.appendChild(btnDiminuir);

    const btnAumentar = document.createElement('button');
    btnAumentar.innerText = '➕A';
    btnAumentar.title = 'Aumentar Texto';
    btnAumentar.classList.add('btn-icone');
    btnAumentar.addEventListener('click', () => {
        if (tamanhoFonteAtual < 24) {
            tamanhoFonteAtual += 2;
            corpoPagina.style.fontSize = `${tamanhoFonteAtual}px`;
        }
    });
    containerMenu.appendChild(btnAumentar);

    const btnModoNoturno = document.createElement('button');
    btnModoNoturno.innerText = '🌙';
    btnModoNoturno.title = 'Alternar Modo Noturno';
    btnModoNoturno.classList.add('btn-icone');
    btnModoNoturno.addEventListener('click', () => {
        corpoPagina.classList.toggle('dark-mode');
        modoNoturnoAtivo = corpoPagina.classList.contains('dark-mode');
        btnModoNoturno.innerText = modoNoturnoAtivo ? '☀️' : '🌙';
    });
    containerMenu.appendChild(btnModoNoturno);
};

// ==========================================
// 3. SEÇÃO DINÂMICA "NOSSA HISTÓRIA"
// ==========================================
const dadosHistoria = {
    titulo: "Nossa História",
    subtitulo: "Mais de 40 anos de amor e inclusão em Fortaleza",
    conteudo: "O Instituto Filippo Smaldone nasceu com a missão de educar, acolher e incluir a comunidade surda. Através de um ensino bilíngue (Libras e Português) e de atendimentos de saúde especializados, transformamos o futuro de centenas de crianças e suas famílias todos os anos."
};

const criarSecaoHistoria = () => {
    const container = document.querySelector('#secao-historia-container');
    if (!container) return;

    const secaoElemento = document.createElement('section');
    secaoElemento.id = 'quem-somos';
    secaoElemento.classList.add('secao-quem-somos', 'revelar'); // Adicionado o revelar!

    const tituloElemento = document.createElement('h2');
    tituloElemento.innerText = dadosHistoria.titulo;
    tituloElemento.classList.add('titulo-quem-somos');

    const subtituloElemento = document.createElement('h4');
    subtituloElemento.innerText = dadosHistoria.subtitulo;
    subtituloElemento.classList.add('subtitulo-quem-somos');

    const paragrafoElemento = document.createElement('p');
    paragrafoElemento.innerText = dadosHistoria.conteudo;
    paragrafoElemento.classList.add('texto-quem-somos');

    secaoElemento.appendChild(tituloElemento);
    secaoElemento.appendChild(subtituloElemento);
    secaoElemento.appendChild(paragrafoElemento);
    container.appendChild(secaoElemento);
};

// ==========================================
// 4. SEÇÃO DE TRANSPARÊNCIA INTERATIVA (ESTADOS)
// ==========================================
const criarSecaoTransparencia = () => {
    const container = document.querySelector('#secao-transparencia-container');
    if (!container) return;

    const secao = document.createElement('section');
    secao.id = 'transparencia';
    secao.classList.add('secao-transparencia', 'revelar'); // Adicionado o revelar!

    const titulo = document.createElement('h2');
    titulo.innerText = "Transparência Financeira";
    secao.appendChild(titulo);

    const sub = document.createElement('p');
    sub.innerText = "Clique nas abas abaixo para ver como os recursos são aplicados no Instituto em Fortaleza.";
    secao.appendChild(sub);

    const containerAbas = document.createElement('div');
    containerAbas.classList.add('abas-transparencia');

    const btnEscola = document.createElement('button');
    btnEscola.innerText = "📊 Investimento Escola";
    btnEscola.classList.add('btn-aba', 'ativo');

    const btnClinica = document.createElement('button');
    btnClinica.innerText = "📊 Investimento Clínica";
    btnClinica.classList.add('btn-aba');

    containerAbas.appendChild(btnEscola);
    containerAbas.appendChild(btnClinica);
    secao.appendChild(containerAbas);

    const relatorioEscola = document.createElement('div');
    relatorioEscola.classList.add('caixa-relatorio');
    relatorioEscola.innerHTML = "<strong>Setor Pedagógico:</strong> 70% em alimentação especializada e materiais adaptados de Libras, 30% em manutenção das salas de aula.";

    const relatorioClinica = document.createElement('div');
    relatorioClinica.classList.add('caixa-relatorio', 'escondido');
    relatorioClinica.innerHTML = "<strong>Setor de Saúde:</strong> 60% em equipamentos de fonoaudiologia de última geração, 40% em exames e diagnósticos gratuitos para a comunidade.";

    secao.appendChild(relatorioEscola);
    secao.appendChild(relatorioClinica);
    container.appendChild(secao);

    btnEscola.addEventListener('click', () => {
        btnEscola.classList.add('ativo');
        btnClinica.classList.remove('ativo');
        relatorioEscola.classList.remove('escondido');
        relatorioClinica.classList.add('escondido');
    });

    btnClinica.addEventListener('click', () => {
        btnClinica.classList.add('ativo');
        btnEscola.classList.remove('ativo');
        relatorioClinica.classList.remove('escondido');
        relatorioEscola.classList.add('escondido');
    });
};

// ==========================================
// 5. ESCUTA E VALIDAÇÃO DO FORMULÁRIO DE CONTATO (HTML FIXO)
// ==========================================
const inicializarFormularioContato = () => {
    const form = document.querySelector('#formulario-contato');
    if (!form) return;

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nome = document.querySelector('#nome-contato').value.trim();
        const email = document.querySelector('#email-contato').value.trim();
        const mensagem = document.querySelector('#mensagem-contato').value.trim();

        if (nome === '' || email === '' || mensagem === '') {
            alert('⚠️ Por favor, preencha todos os campos do formulário antes de enviar.');
        } else {
            alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso para a equipe do Instituto.`);
            form.reset();
        }
    });
};

// ==========================================
// 6. SEÇÃO DE DOAÇÃO INTERATIVA COM PARCERIA SEFAZ-CE
// ==========================================
const criarSecaoDoacaoOpcoes = () => {
    const container = document.querySelector('#secao-doacao-container');
    if (!container) return;

    const secao = document.createElement('section');
    secao.id = 'doacoes';
    secao.classList.add('secao-doacao', 'revelar'); // Adicionado o revelar!

    const titulo = document.createElement('h2');
    titulo.innerText = "Transforme Vidas Conosco";
    secao.appendChild(titulo);

    const sub = document.createElement('p');
    sub.innerText = "Escolha um valor de doação ou nos apoie através de programas parceiros sem custo nenhum.";
    secao.appendChild(sub);

    const gridValores = document.createElement('div');
    gridValores.classList.add('grid-valores');

    const opcoesAjuda = [
        { quantia: "R$ 30", impacto: "1 dia de lanche", tipo: "normal" },
        { quantia: "R$ 60", impacto: "Material didático", tipo: "normal" },
        { quantia: "R$ 100", impacto: "Sessão de Fono", tipo: "normal" },
        { quantia: "📜 Nota Fiscal", impacto: "Sua Nota Tem Valor", tipo: "parceria" }
    ];

    opcoesAjuda.forEach(({ quantia, impacto, tipo }) => {
        const card = document.createElement('div');
        card.classList.add('card-valor');

        if (tipo === 'parceria') {
            card.classList.add('card-nota-valor');
        }

        card.innerHTML = `<strong>${quantia}</strong><p>${impacto}</p>`;

        card.addEventListener('click', () => {
            document.querySelectorAll('.card-valor').forEach(c => c.classList.remove('selecionado'));
            card.classList.add('selecionado');

            if (tipo === 'parceria') {
                alert(`📋 Programa Sua Nota Tem Valor (Governo do Ceará)\n\nPara nos ajudar:\n1. Baixe o aplicativo do programa no seu celular.\n2. Escolha o "Instituto Filippo Smaldone" como sua instituição beneficiária.\n3. Peça CPF na nota em todas as suas compras em Fortaleza!\n\nO Estado converte seus pontos em repasses financeiros para a nossa escola.`);
            } else {
                alert(`Você escolheu apoiar com ${quantia} (${impacto}).\n\nChave PIX CNPJ para transferência: cnpj@filipposmaldone.org.br`);
            }
        });

        gridValores.appendChild(card);
    });
    secao.appendChild(gridValores);

    const outrasFormas = document.createElement('div');
    outrasFormas.classList.add('bloco-outras-doacoes');
    outrasFormas.innerHTML = `
        <p><strong>💳 Outras Formas de Doar:</strong></p>
        <p><strong>Cartão de Crédito (Mensal):</strong> Solicite nosso link recorrente via formulário de contato.</p>
        <p><strong>Doação de Materiais:</strong> Recebemos roupas para bazar, alimentos e brinquedos direto na nossa sede no Montese.</p>
    `;
    secao.appendChild(outrasFormas);

    container.appendChild(secao);
};

// ==========================================
// 6.5. INTERCEPTADOR DE SCROLL PARA EFEITO REVEAL (ANIMAÇÃO MODERNIZADA)
// ==========================================
const escutarScrollParaRevelar = () => {
    const elementos = document.querySelectorAll('.revelar');

    const checarElementos = () => {
        elementos.forEach(elemento => {
            const posicaoElemento = elemento.getBoundingClientRect().top;
            const alturaJanela = window.innerHeight * 0.85;

            if (posicaoElemento < alturaJanela) {
                elemento.classList.add('ativo');
            }
        });
    };

    window.addEventListener('scroll', checarElementos);
    checarElementos(); // Dispara uma vez na inicialização
};

// ==========================================
// 7. INICIALIZAÇÃO CONTROLADA DO SISTEMA
// ==========================================
const inicializarSistemas = () => {
    renderizarMenuCompleto();
    criarSecaoHistoria();
    criarSecaoTransparencia();
    inicializarFormularioContato();
    criarSecaoDoacaoOpcoes();

    // Ativa o rastreador de scroll das animações
    escutarScrollParaRevelar();

    // Inicializa o VLibras
    if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    }
};

inicializarSistemas();