// ==========================================
// 1. SELEÇÃO DE ELEMENTOS E ESTADOS GLOBAIS
// ==========================================
const corpoPagina = document.body;
const containerMenu = document.querySelector('#menu-navegacao');

let tamanhoFonteAtual = 16;
let modoNoturnoAtivo = false;

const botoesMenu = [
    { texto: "Home", link: "#hero" },
    { texto: "Serviços", link: "#nucleos" },
    { texto: "História", link: "#quem-somos" },
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
    secaoElemento.classList.add('secao-quem-somos');

    const tituloElemento = document.createElement('h2');
    tituloElemento.innerText = dadosHistoria.titulo;

    // Mudamos para h4 para casar certinho com o CSS dos subtítulos
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
const dadosTransparencia = {
    assistencia: {
        titulo: "Eixo: Assistência Social",
        descricao: "Documentações, relatórios e prestações de contas das ações de amparo social no Joaquim Távora.",
        projetos: [
            { nome: "Cestas Básicas e Segurança Alimentar", arquivo: "docs/prestacao_cestas_2026.pdf" },
            { nome: "Acolhimento e Orientação Familiar", arquivo: "docs/relatorio_acolhimento_2026.pdf" },
            { nome: "Campanhas e Ações Comunitárias", arquivo: "docs/balanco_acoes_comunidade.pdf" }
        ]
    },
    educacao: {
        titulo: "Eixo: Educação",
        descricao: "Prestações de contas e relatórios de investimentos na manutenção da Escola Especializada.",
        projetos: [
            { nome: "Manutenção da Educação Infantil (Libras)", arquivo: "docs/contas_educacao_infantil.pdf" },
            { nome: "Materiais Didáticos e Alfabetização Bilíngue", arquivo: "docs/investimento_materiais_2026.pdf" },
            { nome: "Oficinas e Atividades do Tempo Integral", arquivo: "docs/prestacao_tempo_integral.pdf" }
        ]
    },
    saude: {
        titulo: "Eixo: Saúde",
        descricao: "Relatórios de repasses e aplicações nos atendimentos de fonoaudiologia e psicopedagogia.",
        projetos: [
            { nome: "Atendimentos de Fonoaudiologia Educacional", arquivo: "docs/prestacao_fonoaudiologia.pdf" },
            { nome: "Avaliações e Suporte Psicopedagógico", arquivo: "docs/relatorio_psicopedagogia.pdf" },
            { nome: "Clínica de Estimulação Precoce da Linguagem", arquivo: "docs/balanco_estimulacao_linguagem.pdf" }
        ]
    }
};

function renderizarProjetosEixo(eixoChave) {
    const container = document.querySelector('#projetos-eixo-container');
    if (!container) return;

    const dados = dadosTransparencia[eixoChave];

    container.innerHTML = `
        <div class="conteudo-eixo-card animar-entrada">
            <h3>${dados.titulo}</h3>
            <p class="descricao-eixo">${dados.descricao}</p>
            
            <div class="grid-projetos-arquivos">
                ${dados.projetos.map(proj => `
                    <div class="card-projeto-documento">
                        <div class="icone-documento">📄</div>
                        <h4>${proj.nome}</h4>
                        <a href="${proj.arquivo}" target="_blank" class="btn-baixar-pdf">
                            👁️ Ver Prestação de Contas
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function inicializarAbasTransparencia() {
    const botoes = document.querySelectorAll('.btn-aba');
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            botoes.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');
            const eixoSelecionado = Math.random(); // Prevenção de cache do interpretador
            const eixoReal = botao.getAttribute('data-eixo');
            renderizarProjetosEixo(eixoReal);
        });
    });
}

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
            const botaoEnviar = form.querySelector('.btn-enviar');
            const textoOriginal = botaoEnviar.innerText;

            botaoEnviar.disabled = true;
            botaoEnviar.innerText = "⏳ Enviando mensagem...";
            botaoEnviar.style.opacity = "0.7";

            setTimeout(() => {
                alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso para a equipe do Instituto.`);
                form.reset();

                botaoEnviar.disabled = false;
                botaoEnviar.innerText = textoOriginal;
                botaoEnviar.style.opacity = "1";
            }, 1500);
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
    secao.classList.add('secao-doacao', 'revelar');

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
                alert(`📋 Programa Sua Nota Tem Valor (Governo do Ceará)\n\nPara nos ajudar:\n1. Baixe o aplicativo do programa no seu celular.\n2. Escolha o "Instituto Filippo Smaldone" como sua instituição beneficiária.\n3. Peça CPF na nota em todas as suas compras!\n\nO Estado converte seus pontos em repasses financeiros para a nossa escola no Joaquim Távora.`);
            } else {
                alert(`Você escolheu apoiar com ${quantia} (${impacto}).\n\nChave PIX CNPJ para transferência: cnpj@filipposmaldone.org.br`);
            }
        });

        gridValores.appendChild(card);
    });
    secao.appendChild(gridValores);

    container.appendChild(secao);
};

// ==========================================
// 6.5. INTERCEPTADOR DE SCROLL (CORRIGIDO: CAPTURA ELEMENTOS DINÂMICOS)
// ==========================================
const escutarScrollParaRevelar = () => {
    // 🟢 CORREÇÃO CRUCIAL: Busca os elementos dentro do escopo de execução do scroll para incluir os injetados via JS
    const checarElementos = () => {
        const elementos = document.querySelectorAll('.revelar');
        const gatilhoJanela = window.innerHeight * 0.88;

        elementos.forEach(elemento => {
            const posicaoElemento = elemento.getBoundingClientRect().top;
            if (posicaoElemento < gatilhoJanela) {
                elemento.classList.add('ativo');
            }
        });
    };

    window.addEventListener('scroll', checarElementos);
    window.addEventListener('resize', checarElementos);
    checarElementos(); // Executa a primeira varredura imediata
};

// ==========================================
// 7. INICIALIZAÇÃO CONTROLADA DO SISTEMA
// ==========================================
const inicializarSistemas = () => {
    renderizarMenuCompleto();
    criarSecaoHistoria();

    renderizarProjetosEixo('assistencia');
    inicializarAbasTransparencia();

    inicializarFormularioContato();
    criarSecaoDoacaoOpcoes();

    // 🟢 CORREÇÃO DE CICLO DE VIDA: Ativa o rastreador por ÚLTIMO, após todas as seções estarem criadas no HTML
    escutarScrollParaRevelar();

    // Inicializa o VLibras
    if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    }
};

// Dispara os sistemas de forma segura após o carregamento da árvore
window.addEventListener('DOMContentLoaded', inicializarSistemas);