# Relatório de Desenvolvimento: Jogo da Velha (Web)

Documentação do processo de engenharia de prompt e refinamento do projeto **Jogo da Velha** desenvolvido para a UNIFOR.

---

## 1. Histórico de Prompts e Evolução do Projeto

### **Prompt Inicial — Estrutura Base**
* **Comando:** Criação de um jogo da velha simples em HTML, CSS e JavaScript, com visual moderno utilizando a paleta `#003366`, `#0056b3`, `#d97706` e fundo branco.
* **Resultado:** Base do jogo criada com estrutura HTML e lógica essencial em JS.

### **Prompt 2 — Menu e Modos de Jogo**
* **Comando:** Adição de menu inicial antes do jogo, com modos **Jogador vs Jogador** e **Jogador vs IA** (dificuldades: *Fácil*, *Médio* e *Impossível*).
* **Resultado:** Implementação das telas de navegação e do algoritmo Minimax para a IA.

### **Prompt 3 — Ajustes de UX e Animações de Botões**
* **Comando:** Adição do efeito de *hover* com crescimento de 5% nos botões e aumento do *delay* para as jogadas do robô.
* **Resultado:** Melhoria na responsividade visual e naturalidade nas jogadas do Bot.

### **Prompt 4 — Efeitos Sonoros Nativa (Web Audio API)**
* **Comando:** Adição de efeitos sonoros para vitória, derrota, empate, clique e trocas de turno usando a **Web Audio API** (sem arquivos externos `.mp3`).
* **Resultado:** Implementação da classe `SoundEffects` gerando frequências senoidais e triangulares puras.

### **Prompt 5 — Animações de Símbolos, Confetes e Linha Vencedora**
* **Comando:** Animação de crescimento nos símbolos ('X' e 'O'), confetes em tons de azul e linha de vitória cortando as células.
* **Iteração/Correções Necessárias:**
  * **Fix 1:** Ajuste na animação do 'X' e 'O' para aplicar a classe de animação exclusivamente na última célula jogada (evitando re-animar o tabuleiro inteiro).
  * **Fix 2:** Correção do método `checkWinFor` para não salvar o estado da linha durante as simulações do Minimax da IA.
  * **Fix 3:** Alinhamento geométrico do CSS da `strike-line` vertical utilizando posições relativas e `transform: translateX(-50%)`.

### **Prompt 6 — Feedback Visual de Derrota**
* **Comando:** Animação de *shake* suave e piscar em vermelho opaco em caso de derrota contra o Bot.
* **Iteração/Correções Necessárias:**
  * **Fix:** Suavização das curvas de animação CSS (`keyframes`) e transição do `shake`/`flash` para evitar paradas abruptas no final da execução.

### **Prompt 7 — Modos de Partida (MD3 e MD5) e Painel Final**
* **Comando:** Implementação dos formatos **Melhor de 3** e **Melhor de 5** com transição automática entre rodadas e exibição do painel modal com o campeão e botão de retorno ao menu.
* **Resultado:** Adição do fluxo contínuo de pontuação e cronômetro regressivo entre rodadas.

### **Prompt 8 — Refinamento Estético e Identidade Visual**
* **Comando:** Diferenciação visual por cores para os jogadores (Azul para X e Laranja para O), alternância dinâmica na cor do texto do indicador de turno e alinhamento da identidade visual da UNIFOR.

---

## 2. Checklist de Critérios de Aceite (CA)

- [x] **CA-01 (Fidelidade Visual):** A aplicação utiliza a paleta de cores institucional da UNIFOR (`#003366`, `#0056b3`) e possui o subtítulo "UNIVERSIDADE DE FORTALEZA".
- [x] **CA-02 (Regra de Ocupação):** Não é possível sobrescrever uma célula que já possui o símbolo 'X' ou 'O'.
- [x] **CA-03 (Bloqueio pós-Fim de Jogo):** Após uma vitória ou empate, o tabuleiro bloqueia cliques em células vazias até que a próxima rodada ou reinício aconteça.
- [x] **CA-04 (Comportamento do Modo CPU):** Quando o modo "Contra o Computador" está selecionado, o sistema executa automaticamente a jogada do robô na vez do 'O' após uma breve pausa.
- [x] **CA-05 (Regra do Melhor de 3):** No formato MD3, o jogo zera o tabuleiro entre rodadas e só encerra a partida completa se um jogador atingir 2 vitórias ou após o fim da 3ª rodada.
- [x] **CA-06 (Efeitos Visuais de Vitória):** A linha contínua é traçada corretamente exatamente sobre as 3 células vitoriosas e os confetes são disparados na tela.
- [x] **CA-07 (Autonomia de Áudio):** O sistema emite os efeitos sonoros sem depender de downloads ou arquivos `.mp3` externos.