// 1. Seleção dos elementos do HTML de forma segura
const corpoPagina = document.body;
const containerMenu = document.querySelector('#menu-navegacao');

// Estados iniciais do sistema
let tamanhoFonteAtual = 16;
let modoNoturnoAtivo = false;

// Array de Objetos com os botões de texto normais
const botoesMenu = [
    { texto: "Home", link: "#hero" },
    { texto: "Nossa História", link: "#quem-somos" },
    { texto: "Transparência", link: "#transparencia" },
    { texto: "Contato", link: "#contato" }
];

const renderizarMenuCompleto = () => {
    // Se o JS não achar o container no HTML, ele para aqui para não quebrar o site
    if (!containerMenu) return;

    containerMenu.innerHTML = '';

    // 1. Renderiza os botões de navegação em texto
    botoesMenu.forEach(({ texto, link }) => {
        const novoBotao = document.createElement('a');
        novoBotao.href = link;
        novoBotao.innerText = texto;
        novoBotao.classList.add('botao-menu');
        containerMenu.appendChild(novoBotao);
    });

    // 2. Criação do Botão de Doação em Destaque
    const btnDoacao = document.createElement('button');
    btnDoacao.innerText = '❤️ Quero Ajudar';
    btnDoacao.addEventListener('click', () => {
        document.querySelector('#doacoes').scrollIntoView({ behavior: 'smooth' });
    });
    containerMenu.appendChild(btnDoacao);

    // 3. Botão Diminuir Fonte
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

    // 4. Botão Aumentar Fonte
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

    // 5. Botão Modo Noturno
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

// Executa a inicialização do cabeçalho
renderizarMenuCompleto();


// ==========================================
// 3. CRIAÇÃO DINÂMICA DA SEÇÃO "NOSSA HISTÓRIA"
// ==========================================

// 1. Dados da seção (Abstração de dados que você estuda em ADS)
const dadosHistoria = {
    titulo: "Nossa História",
    subtitulo: "Mais de 40 anos de amor e inclusão em Fortaleza",
    conteúdo: "O Instituto Filippo Smaldone nasceu com a missão de educar, acolher e incluir a comunidade surda. Através de um ensino bilíngue (Libras e Português) e de atendimentos de saúde especializados, transformamos o futuro de centenas de crianças e suas famílias todos os anos."
};

// 2. Função de fábrica para criar e injetar a seção na tela
const criarSecaoHistoria = () => {
    // Captura o contêiner que criamos no HTML
    const container = document.querySelector('#secao-historia-container');
    if (!container) return; // Trava de segurança

    // A) Criamos os elementos na memória do JS (Estado gasoso)
    const secaoElemento = document.createElement('section');
    const tituloElemento = document.createElement('h2');
    const subtituloElemento = document.createElement('h4');
    const paragrafoElemento = document.createElement('p');

    // B) Injetamos os textos vindos do nosso objeto de dados
    tituloElemento.innerText = dadosHistoria.titulo;
    subtituloElemento.innerText = dadosHistoria.subtitulo;
    paragrafoElemento.innerText = dadosHistoria.conteúdo;

    // C) Vinculamos o ID de âncora para o botão do menu funcionar
    secaoElemento.id = 'quem-somos';

    // D) Aplicamos as classes do CSS (Organizado e profissional!)
    secaoElemento.classList.add('secao-quem-somos');
    tituloElemento.classList.add('titulo-quem-somos');
    subtituloElemento.classList.add('subtitulo-quem-somos');
    paragrafoElemento.classList.add('texto-quem-somos');

    // E) Montamos a árvore (colocamos os textos dentro da section)
    secaoElemento.appendChild(tituloElemento);
    secaoElemento.appendChild(subtituloElemento);
    secaoElemento.appendChild(paragrafoElemento);

    // F) Materializamos tudo na tela (colocamos a section dentro do contêiner do HTML)
    container.appendChild(secaoElemento);
};

// Executa a função para fabricar a seção na tela
criarSecaoHistoria();


// ==========================================
// 4. SEÇÃO DE TRANSPARÊNCIA INTERATIVA (ESTADOS)
// ==========================================

const criarSecaoTransparencia = () => {
    const container = document.querySelector('#secao-transparencia-container');
    if (!container) return;

    // Criando a estrutura base
    const secao = document.createElement('section');
    secao.id = 'transparencia';
    secao.classList.add('secao-transparencia');

    const titulo = document.createElement('h2');
    titulo.innerText = "Transparência Financeira";
    secao.appendChild(titulo);

    const sub = document.createElement('p');
    sub.innerText = "Clique nas abas abaixo para ver como os recursos são aplicados no Instituto em Fortaleza.";
    secao.appendChild(sub);

    // Criando o container das abas (botões)
    const containerAbas = document.createElement('div');
    containerAbas.classList.add('Abas-transparencia');

    const btnEscola = document.createElement('button');
    btnEscola.innerText = "📊 Investimento Escola";
    btnEscola.classList.add('btn-aba', 'ativo'); // Começa ativo

    const btnClinica = document.createElement('button');
    btnClinica.innerText = "📊 Investimento Clínica";
    btnClinica.classList.add('btn-aba');

    containerAbas.appendChild(btnEscola);
    containerAbas.appendChild(btnClinica);
    secao.appendChild(containerAbas);

    // Criando as caixas de relatório (Os conteúdos)
    const relatorioEscola = document.createElement('div');
    relatorioEscola.classList.add('caixa-relatorio');
    relatorioEscola.innerHTML = "<strong>Setor Pedagógico:</strong> 70% em alimentação especializada e materiais adaptados de Libras, 30% em manutenção das salas de aula.";

    const relatorioClinica = document.createElement('div');
    relatorioClinica.classList.add('caixa-relatorio', 'escondido'); // Começa escondido!
    relatorioClinica.innerHTML = "<strong>Setor de Saúde:</strong> 60% em equipamentos de fonoaudiologia de última geração, 40% em exames e diagnósticos gratuitos para a comunidade.";

    secao.appendChild(relatorioEscola);
    secao.appendChild(relatorioClinica);
    container.appendChild(secao);

    // --- LÓGICA DE ALTERNÂNCIA DE ESTADOS (O CORAÇÃO DO DOM) ---
    btnEscola.addEventListener('click', () => {
        btnEscola.classList.add('ativo');
        btnClinica.classList.remove('ativo');
        
        relatorioEscola.classList.remove('escondido'); // Mostra Escola
        relatorioClinica.classList.add('escondido');    // Esconde Clínica
    });

    btnClinica.addEventListener('click', () => {
        btnClinica.classList.add('ativo');
        btnEscola.classList.remove('ativo');
        
        relatorioClinica.classList.remove('escondido'); // Mostra Clínica
        relatorioEscola.classList.add('escondido');    // Esconde Escola
    });
};

// Inicializa a seção
criarSecaoTransparencia();


// ==========================================
// 5. SEÇÃO DE CONTATO COM REDES SOCIAIS E VALIDAÇÃO
// ==========================================

const criarSecaoContato = () => {
    const container = document.querySelector('#secao-contato-container');
    if (!container) return;

    const secao = document.createElement('section');
    secao.id = 'contato';
    secao.classList.add('secao-contato');

    const tituloPrincipal = document.createElement('h2');
    tituloPrincipal.innerText = "Fale Conosco";
    secao.appendChild(tituloPrincipal);

    const grid = document.createElement('div');
    grid.classList.add('grid-contato');

    // --- COLUNA 1: INFORMAÇÕES + REDES SOCIAIS ---
    const colunaInfo = document.createElement('div');
    colunaInfo.classList.add('info-contato');
    colunaInfo.innerHTML = `
        <h3>📍 Unidade Fortaleza</h3>
        <p><strong>Endereço:</strong> Rua Desembargador Praxedes, 1420 - Montese</p>
        <p><strong>Telefone:</strong> (85) 3292-1420</p>
        <p><strong>E-mail:</strong> contato@filipposmaldone.org.br</p>
        <p style="margin-top: 15px; color: #666; font-size: 14px;">
            ⏰ Horário de atendimento: Segunda a Sexta, das 07:30 às 17:00.
        </p>
        
        <div class="redes-sociais">
            <a href="https://www.instagram.com/filipposmaldonefortaleza/" target="_blank" class="link-rede instagram">
                📸 Instagram
            </a>
            <a href="https://www.facebook.com/filipposmaldonefortaleza" target="_blank" class="link-rede facebook">
                👥 Facebook
            </a>
        </div>
    `;
    grid.appendChild(colunaInfo);

    // --- COLUNA 2: FORMULÁRIO DINÂMICO ---
    const colunaForm = document.createElement('div');
    const form = document.createElement('form');
    form.classList.add('formulario-contato');

    const inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.placeholder = 'Seu Nome Completo';
    form.appendChild(inputNome);

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'Seu Melhor E-mail';
    form.appendChild(inputEmail);

    const campoMensagem = document.createElement('textarea');
    campoMensagem.placeholder = 'Como você deseja ajudar ou qual sua dúvida?';
    campoMensagem.rows = 4;
    form.appendChild(campoMensagem);

    const btnEnviar = document.createElement('button');
    btnEnviar.type = 'submit';
    btnEnviar.innerText = '✉️ Enviar Mensagem';
    btnEnviar.classList.add('btn-enviar');
    form.appendChild(btnEnviar);

    colunaForm.appendChild(form);
    grid.appendChild(colunaForm);
    secao.appendChild(grid);
    container.appendChild(secao);

    // Lógica de validação
    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        const mensagem = campoMensagem.value.trim();

        if (nome === '' || email === '' || mensagem === '') {
            alert('⚠️ Por favor, preencha todos os campos do formulário antes de enviar.');
        } else {
            alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso para a equipe do Instituto.`);
            form.reset();
        }
    });
};

// Inicializa a seção de contato
criarSecaoContato();


// ==========================================
// 6. SEÇÃO DE DOAÇÃO INTERATIVA COM PARCERIA SEFAZ-CE
// ==========================================

const criarSecaoDoacaoOpcoes = () => {
    const container = document.querySelector('#secao-doacao-container');
    if (!container) return;

    const secao = document.createElement('section');
    secao.id = 'doacoes';
    secao.classList.add('secao-doacao');

    const titulo = document.createElement('h2');
    titulo.innerText = "Transforme Vidas Conosco";
    secao.appendChild(titulo);

    const sub = document.createElement('p');
    sub.innerText = "Escolha um valor de doação ou nos apoie através de programas parceiros sem custo nenhum.";
    secao.appendChild(sub);

    // Grid de valores e parcerias
    const gridValores = document.createElement('div');
    gridValores.classList.add('grid-valores');

    // MÃO NA MASSA ADS: Adicionamos o "Sua Nota Tem Valor" na estrutura de dados
    const opcoesAjuda = [
        { quantia: "R$ 30", impacto: "1 dia de lanche", tipo: "normal" },
        { quantia: "R$ 60", impacto: "Material didático", tipo: "normal" },
        { quantia: "R$ 100", impacto: "Sessão de Fono", tipo: "normal" },
        { quantia: "📜 Nota Fiscal", impacto: "Sua Nota Tem Valor", tipo: "parceria" } // Nova opção!
    ];

    opcoesAjuda.forEach(({ quantia, impacto, tipo }) => {
        const card = document.createElement('div');
        card.classList.add('card-valor');
        
        // Se for do tipo parceria, aplica o estilo tracejado verde do Ceará
        if (tipo === 'parceria') {
            card.classList.add('card-nota-valor');
        }
        
        card.innerHTML = `<strong>${quantia}</strong><p>${impacto}</p>`;
        
        card.addEventListener('click', () => {
            document.querySelectorAll('.card-valor').forEach(c => c.classList.remove('selecionado'));
            card.classList.add('selecionado');
            
            // Mensagem personalizada dependendo do botão clicado
            if (tipo === 'parceria') {
                alert(`📋 Programa Sua Nota Tem Valor (Governo do Ceará)\n\nPara nos ajudar:\n1. Baixe o aplicativo do programa no seu celular.\n2. Escolha o "Instituto Filippo Smaldone" como sua instituição beneficiária.\n3. Peça CPF na nota em todas as suas compras em Fortaleza!\n\nO Estado converte seus pontos em repasses financeiros para a nossa escola.`);
            } else {
                alert(`Você escolheu apoiar com ${quantia} (${impacto}).\n\nChave PIX CNPJ para transferência: cnpj@filipposmaldone.org.br`);
            }
        });

        gridValores.appendChild(card);
    });
    secao.appendChild(gridValores);

    // Bloco descritivo de outras formas de doação
    const outrasFormas = document.createElement('div');
    outrasFormas.style.marginTop = '30px';
    outrasFormas.style.fontSize = '15px';
    outrasFormas.innerHTML = `
        <p><strong>💳 Outras Formas de Doar:</strong></p>
        <p><strong>Cartão de Crédito (Mensal):</strong> Solicite nosso link recorrente via formulário de contato.</p>
        <p><strong>Doação de Materiais:</strong> Recebemos roupas para bazar, alimentos e brinquedos direto na nossa sede no Montese.</p>
    `;
    secao.appendChild(outrasFormas);

    container.appendChild(secao);
};

// Inicializa a seção de doação
criarSecaoDoacaoOpcoes();