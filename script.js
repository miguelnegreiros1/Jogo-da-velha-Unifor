/**
 * GERENCIADOR DE EFEITOS SONOROS CLEAN (Web Audio API)
 * Utiliza frequências puras e suaves (ondas senoidais e triangulares).
 */
class SoundEffects {
    constructor() {
        this.audioCtx = null;
    }

    init() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // 1. Som BEM SUAVE ao pintar/marcar o quadro
    playCellPaint() {
        this.init();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine'; // Onda senoidal pura
        osc.frequency.setValueAtTime(450, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, this.audioCtx.currentTime + 0.035);

        // Volume baixinho (0.05) para ser muito suave
        gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.035);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.035);
    }

    // 2. Som AGUDO E ANIMADO para a Vez do Jogador
    playTurn() {
        this.init();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        // Frequências agudas brilhantes (Notas E6 e A6)
        const notes = [1318.51, 1760.00];

        notes.forEach((freq, index) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + index * 0.04);

            gain.gain.setValueAtTime(0.07, this.audioCtx.currentTime + index * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + index * 0.04 + 0.07);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start(this.audioCtx.currentTime + index * 0.04);
            osc.stop(this.audioCtx.currentTime + index * 0.04 + 0.07);
        });
    }

    // 3. Som de VITÓRIA (Acorde alegre e limpo)
    playWin() {
        this.init();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const notes = [523.25, 659.25, 783.99, 1046.50]; // Dó, Mí, Sol, Dó
        notes.forEach((freq, index) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.type = 'triangle'; // Som aveludado
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + index * 0.07);

            gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime + index * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + index * 0.07 + 0.3);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start(this.audioCtx.currentTime + index * 0.07);
            osc.stop(this.audioCtx.currentTime + index * 0.07 + 0.3);
        });
    }

    // 4. Som de DERROTA (Notas suaves e descendentes)
    playLoss() {
        this.init();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const notes = [440.00, 392.00, 349.23, 329.63]; // Lá, Sol, Fá, Mí
        notes.forEach((freq, index) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + index * 0.1);

            gain.gain.setValueAtTime(0.09, this.audioCtx.currentTime + index * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + index * 0.1 + 0.22);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start(this.audioCtx.currentTime + index * 0.1);
            osc.stop(this.audioCtx.currentTime + index * 0.1 + 0.22);
        });
    }

    // 5. Som de EMPATE (Neutro e calmo)
    playDraw() {
        this.init();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const notes = [440.00, 440.00];
        notes.forEach((freq, index) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + index * 0.12);

            gain.gain.setValueAtTime(0.07, this.audioCtx.currentTime + index * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + index * 0.12 + 0.2);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start(this.audioCtx.currentTime + index * 0.12);
            osc.stop(this.audioCtx.currentTime + index * 0.12 + 0.2);
        });
    }

    playMatchWin() {
        if (!this.audioCtx) return;
        
        // Sequência de notas alegres (Dó, Mi, Sol, Dó agudo)
        const notes = [261.63, 329.63, 392.00, 523.25]; 
        
        // Toca as notinhas subindo
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, "sine", 0.15), i * 150);
        });
        
        // Toca o acorde final glorioso (todas juntas) no final da subida
        setTimeout(() => {
            this.playTone(261.63, "triangle", 0.4);
            this.playTone(329.63, "triangle", 0.4);
            this.playTone(392.00, "triangle", 0.4);
            this.playTone(523.25, "triangle", 0.4);
        }, notes.length * 150);
    }

    // Método auxiliar que estava faltando!
    playTone(frequency, type, duration) {
        this.init();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

        // Define o volume inicial e faz um fade out suave baseado na duração
        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
    }
}

/**
 * LÓGICA DO JOGO (MODEL)
 */
class TicTacToeGame {
    constructor(size = 3) {
        this.size = size;
        this.mode = null;
        this.difficulty = null;
        this.bestOf = 1;
        
        this.scoreX = 0;
        this.scoreO = 0;
        this.draws = 0;

        this.resetGame();
    }

    configure(mode, difficulty, bestOf) {
        this.mode = mode;
        this.difficulty = difficulty;
        this.bestOf = parseInt(bestOf, 10);
        this.resetScores();
    }

    resetScores() {
        this.scoreX = 0;
        this.scoreO = 0;
        this.draws = 0;
        this.resetRound();
    }

    resetRound() {
        this.board = Array(this.size * this.size).fill("");
        this.currentPlayer = "X";
        this.gameActive = true;
        this.winner = null;
        this.winningLine = null;
        this.lastMoveIndex = null;
    }

    resetGame() {
        this.resetScores();
    }

    makeMove(index) {
        if (!this.gameActive || this.board[index] !== "") {
            return false;
        }

        // 1. Aplica a jogada real
        this.board[index] = this.currentPlayer;
        this.lastMoveIndex = index;
        
        // 2. Testa se essa jogada REAL gerou uma vitória
        const winLine = this.checkWinFor(this.currentPlayer);

        if (winLine) {
            this.winningLine = winLine; // SÓ SALVA A LINHA AQUI!
            this.gameActive = false;
            this.winner = this.currentPlayer;
            if (this.currentPlayer === "X") this.scoreX++;
            else this.scoreO++;
        } else if (this.checkDraw()) {
            this.gameActive = false;
            this.winner = "DRAW";
            this.draws++;
        } else {
            this.switchPlayer();
        }

        return true;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }

    isMatchOver() {
        const winsNeeded = Math.ceil(this.bestOf / 2);
        return this.scoreX >= winsNeeded || this.scoreO >= winsNeeded;
    }

    getMatchWinner() {
        const winsNeeded = Math.ceil(this.bestOf / 2);
        if (this.scoreX >= winsNeeded) return "X";
        if (this.scoreO >= winsNeeded) return "O";
        return null;
    }

    getAIMove() {
        const emptyIndices = this.board
            .map((val, idx) => (val === "" ? idx : null))
            .filter(val => val !== null);

        if (emptyIndices.length === 0) return null;

        if (this.difficulty === "easy") {
            return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        } 
        
        if (this.difficulty === "medium") {
            if (Math.random() > 0.5) {
                return this.getBestMove();
            }
            return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        } 

        if (this.difficulty === "hard") {
            return this.getBestMove();
        }
    }

    getBestMove() {
        let bestScore = -Infinity;
        let move = null;
        
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === "") {
                this.board[i] = "O";
                let score = this.minimax(this.board, 0, false);
                this.board[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    minimax(board, depth, isMaximizing) {
        if (this.checkWinFor("O")) return 10 - depth;
        if (this.checkWinFor("X")) return depth - 10;
        if (!board.includes("")) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "O";
                    let score = this.minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "X";
                    let score = this.minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    checkWin() {
        return this.checkWinFor(this.currentPlayer);
    }

    checkWinFor(player) {
        const conditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        // Apenas RETORNA a combinação vencedora, mas NÃO salva nada.
        // Assim, as simulações da IA não quebram o visual do jogo!
        for (let cond of conditions) {
            if (cond.every(idx => this.board[idx] === player)) {
                return cond; 
            }
        }
        return null;
    }

    checkDraw() {
        return !this.board.includes("");
    }
}

/**
 * INTERFACE DO JOGO (VIEW / CONTROLLER)
 */
class TicTacToeUI {
    constructor(game) {
        this.game = game;
        this.sounds = new SoundEffects();
        
        this.menuScreen = document.getElementById("menuScreen");
        this.gameScreen = document.getElementById("gameScreen");
        
        this.difficultyGroup = document.getElementById("difficultyGroup");
        this.bestOfGroup = document.getElementById("bestOfGroup");
        this.bestOfLabel = document.getElementById("bestOfLabel");
        this.startGameBtn = document.getElementById("startGameBtn");
        
        this.boardElement = document.getElementById("board");
        this.statusElement = document.getElementById("status");
        this.scoreXElem = document.getElementById("scoreX");
        this.scoreOElem = document.getElementById("scoreO");
        this.scoreDrawsElem = document.getElementById("scoreDraws");
        this.playerOName = document.getElementById("playerOName");
        
        this.restartRoundBtn = document.getElementById("restartRoundBtn");
        this.backToMenuBtn = document.getElementById("backToMenuBtn");

        this.init();
    }

    init() {
        this.bindMenuEvents();
        this.bindGameEvents();
    }

    bindMenuEvents() {
        // Sem sons nos botões do menu conforme solicitado
        document.querySelectorAll(".btn-option").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const type = e.target.dataset.type;
                const parent = e.target.parentElement;
                
                parent.querySelectorAll(".btn-option").forEach(b => b.classList.remove("active"));
                e.target.classList.add("active");

                this.updateMenuFlow(type, e.target.dataset.value);
            });
        });

        this.startGameBtn.addEventListener("click", () => {
            const modeBtn = document.querySelector('[data-type="mode"].active');
            const diffBtn = document.querySelector('[data-type="difficulty"].active');
            const bestOfBtn = document.querySelector('[data-type="bestOf"].active');

            const mode = modeBtn ? modeBtn.dataset.value : "pvp";
            const difficulty = diffBtn ? diffBtn.dataset.value : "easy";
            const bestOf = bestOfBtn ? bestOfBtn.dataset.value : "1";

            this.game.configure(mode, difficulty, bestOf);
            
            this.playerOName.textContent = mode === "pve" ? "Bot (IA)" : "Jogador O";

            this.menuScreen.classList.add("hidden");
            this.gameScreen.classList.remove("hidden");

            this.startRound();
        });
    }

    updateMenuFlow(type, value) {
        const selectedMode = document.querySelector('[data-type="mode"].active');

        if (type === "mode") {
            document.querySelectorAll('[data-type="difficulty"], [data-type="bestOf"]').forEach(b => b.classList.remove("active"));

            if (value === "pve") {
                this.difficultyGroup.classList.remove("hidden");
                this.bestOfGroup.classList.add("hidden");
                this.bestOfLabel.textContent = "3. Formato da Partida:";
            } else {
                this.difficultyGroup.classList.add("hidden");
                this.bestOfGroup.classList.remove("hidden");
                this.bestOfLabel.textContent = "2. Formato da Partida:";
            }
        } else if (type === "difficulty") {
            this.bestOfGroup.classList.remove("hidden");
        }

        const isPvpReady = selectedMode && selectedMode.dataset.value === "pvp" && document.querySelector('[data-type="bestOf"].active');
        const isPveReady = selectedMode && selectedMode.dataset.value === "pve" && document.querySelector('[data-type="difficulty"].active') && document.querySelector('[data-type="bestOf"].active');

        if (isPvpReady || isPveReady) {
            this.startGameBtn.removeAttribute("disabled");
        } else {
            this.startGameBtn.setAttribute("disabled", "true");
        }
    }

    resetMenuState() {
        document.querySelectorAll(".btn-option").forEach(b => b.classList.remove("active"));
        this.difficultyGroup.classList.add("hidden");
        this.bestOfGroup.classList.add("hidden");
        this.startGameBtn.setAttribute("disabled", "true");
    }

    bindGameEvents() {
        this.boardElement.addEventListener("click", (e) => {
            if (!e.target.classList.contains("cell") || !this.game.gameActive) return;

            const index = parseInt(e.target.dataset.index, 10);
            
            if (this.game.mode === "pve" && this.game.currentPlayer === "O") return;

            this.executeTurn(index);
        });

        this.restartRoundBtn.addEventListener("click", () => {
            this.startRound();
        });

        this.backToMenuBtn.addEventListener("click", () => {
            if (this.roundTimer) clearInterval(this.roundTimer);
            this.gameScreen.classList.add("hidden");
            this.menuScreen.classList.remove("hidden");
            this.resetMenuState();
        });
    }

    executeTurn(index) {
        if (this.game.makeMove(index)) {
            // SOM SUAVE AO PINTAR O QUADRO
            this.sounds.playCellPaint();
            
            this.renderBoard();
            this.updateStatus();

            if (this.game.gameActive && this.game.mode === "pve" && this.game.currentPlayer === "O") {
                setTimeout(() => {
                    const aiMove = this.game.getAIMove();
                    if (aiMove !== null) {
                        this.game.makeMove(aiMove);
                        // SOM SUAVE QUANDO A IA PINTA O QUADRO
                        this.sounds.playCellPaint();
                        this.renderBoard();
                        this.updateStatus();
                    }
                }, 1000);
            }
        }
    }

    startRound() {        
        if (this.roundTimer) clearInterval(this.roundTimer);
        this.game.resetRound();
        this.renderBoard();
        this.updateStatus();
    }

    renderBoard() {
        this.boardElement.innerHTML = "";
        
        for (let i = 0; i < this.game.board.length; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            
            if (this.game.board[i] !== "") {
                const mark = document.createElement("span");
                
                // Aplica a classe da animação APENAS no último quadrado pintado!
                if (i === this.game.lastMoveIndex) {
                    mark.classList.add("mark");
                }
                
                // 👇 AQUI ESTÁ A MÁGICA DA COR 👇
                // Se for a letra "O", adiciona a classe que vai pintá-la de laranja
                if (this.game.board[i] === "O") {
                    mark.classList.add("color-orange"); 
                } else if (this.game.board[i] === "X") {
                    mark.classList.add("color-blue"); // Opcional para o X
                }
                // 👆 FIM DA MÁGICA 👆
                
                mark.textContent = this.game.board[i];
                cell.appendChild(mark);
            }
            this.boardElement.appendChild(cell);
        }

        // Desenha a linha cortando o tabuleiro se houver vitória
        // Desenha a linha cortando o tabuleiro se houver vitória
        if (this.game.winningLine) {
            const line = document.createElement("div");
            line.classList.add("strike-line");

            // 👇 AQUI: Define a cor da linha com base no vencedor 👇
            if (this.game.winner === "X") {
                line.classList.add("bg-blue");
            } else if (this.game.winner === "O") {
                line.classList.add("bg-orange");
            }
            
            const winStr = this.game.winningLine.join(",");
            
            if (winStr === "0,1,2") { line.classList.add("strike-row"); line.style.top = "15%"; }
            else if (winStr === "3,4,5") { line.classList.add("strike-row"); line.style.top = "48%"; }
            else if (winStr === "6,7,8") { line.classList.add("strike-row"); line.style.bottom = "15%"; }
            else if (winStr === "0,3,6") { line.classList.add("strike-col"); line.style.left = "15%"; }
            else if (winStr === "1,4,7") { line.classList.add("strike-col"); line.style.left = "48%"; }
            else if (winStr === "2,5,8") { line.classList.add("strike-col"); line.style.right = "15%"; }
            else if (winStr === "0,4,8") { line.classList.add("strike-diag-1"); }
            else if (winStr === "2,4,6") { line.classList.add("strike-diag-2"); }
            
            this.boardElement.appendChild(line);
        }

        this.scoreXElem.textContent = this.game.scoreX;
        this.scoreOElem.textContent = this.game.scoreO;
        this.scoreDrawsElem.textContent = this.game.draws;
    }

    updateStatus() {
        // Limpa as cores anteriores sempre que o status atualiza
        this.statusElement.classList.remove("text-blue", "text-orange");

        if (!this.game.gameActive) {
            
            // Sons normais de fim de rodada
            if (this.game.winner === "DRAW") {
                this.sounds.playDraw();
            } else if (this.game.mode === "pve" && this.game.winner === "O") {
                this.sounds.playLoss();
                this.triggerLossEffects(); 
            } else {
                this.sounds.playWin();
                this.triggerConfetti(); 
            }

            // CHECAGEM DE FIM DE PARTIDA (MD3 / MD5)
            if (this.game.isMatchOver()) {
                const matchWinner = this.game.getMatchWinner();
                const winnerName = matchWinner === "X" ? "Jogador X" : (this.game.mode === "pve" ? "Bot (IA)" : "Jogador O");
                
                this.statusElement.textContent = `🏆 Partida Encerrada!`;
                
                // 👇 Cor do vencedor final da partida
                if (matchWinner === "X") this.statusElement.classList.add("text-blue");
                if (matchWinner === "O") this.statusElement.classList.add("text-orange");

                if (matchWinner !== "O" || this.game.mode === "pvp") {
                    this.sounds.playMatchWin();
                }

                this.showMatchOverPanel(winnerName);

            } else {
                // SE A PARTIDA NÃO ACABOU (PRÓXIMA RODADA)
                let endText = "";
                if (this.game.winner === "DRAW") {
                    endText = "Rodada empatada!";
                } else {
                    const winnerName = this.game.winner === "X" ? "Jogador X" : (this.game.mode === "pve" ? "Bot (IA)" : "Jogador O");
                    endText = `${winnerName} venceu a rodada!`;
                    
                    // 👇 Cor do vencedor da rodada
                    if (this.game.winner === "X") this.statusElement.classList.add("text-blue");
                    if (this.game.winner === "O") this.statusElement.classList.add("text-orange");
                }
                
                this.statusElement.textContent = endText;

                let timeLeft = 5;
                
                this.roundTimer = setInterval(() => {
                    timeLeft--; 
                    
                    if (timeLeft <= 3 && timeLeft > 0) {
                        this.statusElement.textContent = `${endText} (Próxima em ${timeLeft}...)`;
                        if (this.sounds && typeof this.sounds.playTone === 'function') {
                            this.sounds.playTone(600, "sine", 0.1);
                        }
                    } else if (timeLeft <= 0) {
                        clearInterval(this.roundTimer);
                        this.startRound();
                    }
                }, 1000);
            }
        } else {
            this.sounds.playTurn();
            const playerStr = this.game.currentPlayer === "X" ? "Jogador X" : (this.game.mode === "pve" ? "Bot (IA)" : "Jogador O");
            this.statusElement.textContent = `Vez do jogador: ${playerStr}`;
            
            // 👇 Cor de quem é a vez de jogar
            if (this.game.currentPlayer === "X") this.statusElement.classList.add("text-blue");
            if (this.game.currentPlayer === "O") this.statusElement.classList.add("text-orange");
        }
    }

    // ADICIONADO: Função que cria o painel dinamicamente via JavaScript
    showMatchOverPanel(winnerName) {
        // Evita criar dois painéis sem querer
        if (document.getElementById("match-over-panel")) return;

        const panel = document.createElement("div");
        panel.id = "match-over-panel";
        
        const title = document.createElement("h2");
        title.textContent = `🏆 ${winnerName} Campeão!`;
        title.style.color = "#007bff";
        
        const score = document.createElement("p");
        score.textContent = `Placar Final: X (${this.game.scoreX}) - O (${this.game.scoreO})`;
        score.style.color = "#ffffff";
        
        const btnMenu = document.createElement("button");
        btnMenu.textContent = "Voltar ao Menu";
        btnMenu.onclick = () => {
            // A forma mais à prova de balas de voltar ao menu é recarregando o jogo limpo:
            window.location.reload(); 
        };
        
        panel.appendChild(title);
        panel.appendChild(score);
        panel.appendChild(btnMenu);
        
        // Usamos um setTimeout para esperar 1.5 segundos. 
        // Assim, o jogador consegue ver a linha de vitória sendo desenhada 
        // antes do painel cobrir tudo!
        setTimeout(() => {
            this.boardElement.appendChild(panel);
            // Dá um milissegundo de respiro para a transição do CSS acontecer suavemente
            setTimeout(() => panel.style.opacity = "1", 10);
        }, 1500);

    }

    triggerConfetti() {
        // Usa tons de azul variados (baseado nas cores originais do seu projeto)
        const colors = ['#0056b3', '#e0f0ff', '#004494', '#3388ff', '#80bfff'];
        
        for (let i = 0; i < 70; i++) {
            const conf = document.createElement("div");
            conf.classList.add("confetti");
            
            // Posição e cor aleatórias
            conf.style.left = Math.random() * 100 + "vw";
            conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Durações e atrasos aleatórios para um efeito mais natural
            const duration = Math.random() * 2 + 2; 
            const delay = Math.random() * 0.5;
            
            conf.style.animation = `fall ${duration}s linear ${delay}s forwards`;
            document.body.appendChild(conf);
            
            // Remove o elemento do HTML após cair para não pesar a memória do navegador
            setTimeout(() => conf.remove(), (duration + delay) * 1000);
        }
    }

    // ADICIONADO: Função para disparar a tremidinha e o flash vermelho
    triggerLossEffects() {
        const body = document.body;
        
        // Adiciona as classes CSS que ativam a animação
        body.classList.add("shake-effect", "flash-effect");

        // Remove as classes após 600ms (tempo da animação) para que 
        // o efeito possa acontecer de novo na próxima derrota
        setTimeout(() => {
            body.classList.remove("shake-effect", "flash-effect");
        }, 700);
    }


}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    const game = new TicTacToeGame(3);
    new TicTacToeUI(game);
});