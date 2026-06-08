document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. SEÇÕES EXPANSÍVEIS (ACCORDION)
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isCurrentlyActive = item.classList.contains('active');
            
            // Fecha todos os itens primeiro (opcional, cria efeito sanfona limpo)
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });
            
            // Se não estava ativo, abre o atual
            if (!isCurrentlyActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* Adicionar dinamicamente títulos de acessibilidade das imagens com base no alt */
    const imagensDivs = document.querySelectorAll('.imagem');
    imagensDivs.forEach(div => {
        const img = div.querySelector('img');
        if (img && img.getAttribute('alt')) {
            div.setAttribute('data-title', img.getAttribute('alt'));
        }
    });

    /* ==========================================================================
       2. FORMULÁRIO DE INSCRIÇÃO (SIMULAÇÃO)
       ========================================================================== */
    const form = document.getElementById('agrotech-form');
    const successMsg = document.getElementById('form-success-msg');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de processamento síncrono limpo
        successMsg.style.display = 'block';
        form.reset();
        
        // Oculta a mensagem de sucesso após 5 segundos
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    });

    /* ==========================================================================
       3. INTERAÇÃO DE COMENTÁRIOS
       ========================================================================== */
    const btnSubmitComment = document.getElementById('btn-submit-comment');
    const txtComment = document.getElementById('txt-comment');
    const commentsList = document.getElementById('comments-list');
    
    btnSubmitComment.addEventListener('click', () => {
        const text = txtComment.value.trim();
        if (text === '') {
            alert('Por favor, digite um comentário antes de enviar! ✨');
            return;
        }
        
        // Criação dinâmica do card do comentário
        const commentCard = document.createElement('div');
        commentCard.className = 'comment-card';
        
        const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        commentCard.innerHTML = `
            <p style="font-size: 0.8rem; font-weight: bold; color: #d4af37; margin-bottom: 4px;">Leitor Anônimo • Hoje às ${timestamp}</p>
            <p style="margin: 0;">${escapeHTML(text)}</p>
        `;
        
        // Insere no início da lista de comentários
        commentsList.insertBefore(commentCard, commentsList.firstChild);
        
        // Limpa a caixa de texto
        txtComment.value = '';
    });
    
    // Utilitário para evitar injeção de HTML nos comentários
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    /* ==========================================================================
       4. CAIXA DE ACESSIBILIDADE FLUTUANTE
       ========================================================================== */
    let currentFontSizePercentage = 100;
    const bodyElement = document.body;
    
    // Aumentar Fonte
    document.getElementById('btn-increase-font').addEventListener('click', () => {
        if (currentFontSizePercentage < 130) {
            currentFontSizePercentage += 7;
            document.documentElement.style.fontSize = `${currentFontSizePercentage}%`;
        }
    });
    
    // Diminuir Fonte
    document.getElementById('btn-decrease-font').addEventListener('click', () => {
        if (currentFontSizePercentage > 85) {
            currentFontSizePercentage -= 7;
            document.documentElement.style.fontSize = `${currentFontSizePercentage}%`;
        }
    });
    
    // Alternar Modo Claro / Escuro
    document.getElementById('btn-toggle-theme').addEventListener('click', () => {
        bodyElement.classList.toggle('dark-mode');
    });
    
    // Speech Synthesis (Leitura por Voz Nativa)
    let speechUtterance = null;
    
    document.getElementById('btn-speech-start').addEventListener('click', () => {
        // Cancela qualquer leitura em andamento
        window.speechSynthesis.cancel();
        
        // Captura apenas o texto do conteúdo principal da página
        const mainContentText = document.getElementById('printable-content').innerText;
        
        speechUtterance = new SpeechSynthesisUtterance(mainContentText);
        speechUtterance.lang = 'pt-BR';
        speechUtterance.rate = 1.0; // Velocidade normal
        
        window.speechSynthesis.speak(speechUtterance);
    });
    
    document.getElementById('btn-speech-stop').addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });
});
