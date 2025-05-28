# Jogo Educacional para Disciplina de Sinais e Sistemas Lineares 

![Static Badge](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![Static Badge](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Static Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Static Badge](https://img.shields.io/badge/Ubuntu-orange?style=flat&logo=ubuntu)


## Introdução

Este projeto, desenvolvido sob orientação da professora Thabatta, docente da disciplina de **Sinais e Sistemas Lineares** no Centro Federal de Educação Tecnológica de Minas Gerais (CEFET-MG), tem como objetivo a criação de um **jogo educacional** voltado para o apoio ao ensino e à aprendizagem dos principais conceitos da disciplina.

Por meio da **gamificação**, busca-se promover um maior engajamento dos estudantes e facilitar a assimilação de conteúdos fundamentais, tais como **resposta ao impulso**, **convolução**, **estabilidade** e **análise de sistemas lineares invariantes no tempo (LTI)**. A proposta visa aliar a interatividade dos jogos ao rigor conceitual, proporcionando uma ferramenta didática complementar e inovadora no contexto do aprendizado em engenharia.

---

## Documentação de Execução e Estrutura do Projeto

### Como Executar o Projeto

Para executar o jogo educacional desenvolvido na disciplina de **Sinais e Sistemas Lineares**, siga os passos abaixo:

#### 1. Clonando o Repositório

Certifique-se de ter o Git instalado. Em seguida, abra o terminal e execute:

```bash
git clone https://github.com/Jottynha/TRABALHO-SSL.git
````

#### 2. Acessando o Diretório

Entre na pasta do projeto:

```bash
cd TRABALHO-SSL
```

#### 3. Executando o Jogo

Como se trata de um projeto Web estático (HTML, CSS e JavaScript), você pode executá-lo de duas formas:

##### **Opção 1: Abrir diretamente no navegador**

* Localize o arquivo `index.html` na pasta raiz.
* Dê um duplo clique ou abra-o com o navegador de sua preferência.

##### **Opção 2: Usar um servidor local (recomendado)**

Para garantir que todos os recursos funcionem corretamente (especialmente os sons), utilize um servidor local:

###### Usando Python 3:

```bash
# Dentro da pasta do projeto
python -m http.server 8000
```

Depois, abra o navegador e acesse:

```
http://localhost:8000
```

---

### Requisitos

* Navegador moderno (Chrome, Firefox, Edge, etc.)
* (Opcional) Python 3, caso queira executar via servidor local

---

### Observações

* O jogo foi projetado para ser uma ferramenta complementar no ensino de conceitos como **resposta ao impulso**, **convolução**, **estabilidade** e **análise de sistemas LTI**.
* A interface é intuitiva e interativa, projetada para promover o aprendizado por meio da gamificação.

---

Caso tenha dúvidas ou queira contribuir com o projeto, acesse o repositório oficial no GitHub:
🔗 [https://github.com/Jottynha/TRABALHO-SSL](https://github.com/Jottynha/TRABALHO-SSL)


### Estrutura do Projeto

A tabela a seguir apresenta os principais arquivos e diretórios que compõem o projeto, bem como uma breve descrição de suas funções:

| Arquivo / Pasta    | Descrição                                                                 |
|--------------------|---------------------------------------------------------------------------|
| [`index.html`](#index-html) | Página principal do projeto. Contém a estrutura básica do jogo em HTML.   |
| [`style.css`](#style-css)        | Folha de estilos responsável pelo layout e visual do jogo.                |
| `js/`              | Diretório que contém todos os scripts JavaScript utilizados no projeto.   |
| [`js/audio.js`](#audio-js)      | Gerencia os efeitos sonoros e sons do jogo.                              |
| [`js/drawing.js`](#drawing-js)   | Responsável pelas funções de desenho na tela (canvas, elementos gráficos).|
| `js/main.js`       | Script principal. Controla o fluxo geral do jogo e a inicialização.       |
| `js/questions.js`  | Contém as perguntas e lógicas relacionadas aos desafios propostos.        |
| `js/ui.js`         | Gerencia a interface do usuário, como botões e telas interativas.         |

---

<h3 id="index-html">📄 Estrutura do Arquivo HTML (`index.html`)</h3>

O arquivo `index.html` é a base da interface gráfica do projeto **Ritmo dos Sinais**. Ele define a estrutura e os elementos visuais apresentados ao usuário, desde a tela de autenticação até o ambiente interativo das lições. A seguir, descrevemos sua composição e funcionalidade:

#### 1. **Cabeçalho (`<head>`)**

No início do documento, temos:

* `<!DOCTYPE html>`: Define o tipo do documento como HTML5.
* `<html lang="pt">`: Indica que o conteúdo da página está em português.
* `<meta charset="UTF-8" />`: Define a codificação dos caracteres como UTF-8.
* `<meta name="viewport" content="width=device-width, initial-scale=1" />`: Torna a interface responsiva em dispositivos móveis.
* `<title>Ritmo dos Sinais</title>`: Define o título exibido na aba do navegador.
* Inclusão de fontes e estilos:

  * `Poppins` via Google Fonts.
  * `style.css`: arquivo CSS externo responsável pela estilização geral.
  * `SweetAlert2`: biblioteca para exibição de alertas e mensagens amigáveis.

#### 2. **Tela de Autenticação**

```html
<div id="auth-screen" class="card">
```

Essa `div` representa a tela inicial, onde o usuário pode:

* Inserir nome de usuário e senha.
* Alternar entre **Login** e **Criar Conta**.
* Visualizar mensagens de erro, caso ocorra falha na autenticação.

#### 3. **Tela de Boas-Vindas**

```html
<div id="welcome-screen">
```

Após o login, o usuário é recepcionado com uma breve explicação sobre o jogo e duas opções:

* **Modo Lição**: aprendizado progressivo.
* **Modo Infinito**: desafios contínuos.

#### 4. **Interface Principal**

```html
<div class="flex-container">
```

Esse bloco contém os principais elementos do jogo:

* **Menu de Lições** (`#menu-screen`): botões para selecionar lições. Apenas a Lição 1 e a Lição 9 estão habilitadas inicialmente.
* **Tela de Jogo** (`#game-screen`): exibe a lição atual, pergunta, botão para ouvir o som, canvas com a onda sonora e as opções de resposta.
* **Painel Lateral**:

  * `#info-card`: mostra detalhes adicionais sobre o conteúdo após acertos.
  * `#highscore-card`: exibe a maior pontuação.
  * `#completed-lessons-card`: lista as lições finalizadas.
  * `#tips`: dicas educacionais.
  * `#btn-info`: botão que abre o modal com **Informações do Projeto**.
  * `#btn-settings`: botão de **Configurações** para redefinir pontuações.

#### 5. **Modais**

Dois modais principais são implementados:

* **Informações do Projeto**: lista os membros da equipe, e-mail de contato e link para o repositório.
* **Configurações**: oferece a opção de apagar os scores salvos.

#### 6. **Outros Elementos**

* `#score-container`: mostra a pontuação atual e vidas restantes.
* `#toggle-dark`: botão para alternar o modo claro/escuro (ícone de lua).
* `#progress-bar`: barra de progresso visual.
* `#tooltip`: dica flutuante exibida em determinadas interações.
* `#overlay`: camada para bloquear interações durante transições/modais.

#### 7. **Importação de Scripts**

```html
<script type="module" src="js/main.js"></script>
```

Carrega o script principal JavaScript (`main.js`), que contém toda a lógica de funcionamento da aplicação, como:

* Login e criação de contas.
* Navegação entre as telas.
* Geração das perguntas e ondas.
* Lógica dos modos de jogo.

---

<h3 id="style-css">📄 Estrutura do Arquivo CSS (`style.css`)</h3>

O arquivo `style.css` é responsável por toda a estilização visual do projeto, definindo cores, espaçamentos, fontes, organização de layout e aparência dinâmica. A seguir, destacamos as principais áreas de estilização e suas funções:

#### 1. **Estilos básicos globais**

```css
html, body {
  height: 200%;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  overflow-x: scroll;
}
```

Define altura total da página, remove margens e ativa rolagem nos eixos horizontal e vertical.

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

Aplica o modelo `box-sizing: border-box` universalmente e remove margens/padding padrão dos navegadores.

#### 2. **Cores e variáveis**

```css
:root {
  --primary-green: #2AA64F;
  --dark-green: #1F8A3D;
  --light-bg: #F7F9FA;
  --dark-bg: #2E2E2E;
  --text-dark: #333;
  --text-light: #000000;
  --white: #FFF;
  --card-bg: #FFF;
  --card-dark: #3A3A3A;
  --shadow: rgba(0, 0, 0, 0.1);
}
```

Declara variáveis CSS reutilizáveis que centralizam o controle de cores e estilos, facilitando a manutenção e o modo escuro.

#### 3. **Modo Claro e Escuro**

```css
body {
  background: var(--light-bg);
  color: var(--text-dark);
}
body.dark-mode {
  background: var(--dark-bg);
  color: var(--text-light);
}
```

Altera as cores do fundo e texto dinamicamente dependendo se o modo escuro está ativado (`dark-mode` é uma classe adicionada ao `body`).

#### 4. **Elementos da interface do jogo**

* `#auth-screen`, `#welcome-screen`, `.flex-container`, `#score-container`: controlam a exibição das telas iniciais e do jogo.
* `.btn`, `.btn-primary`, `.btn-option`: estilos para botões com efeitos de hover e clique.
* `#score-container`, `.score-number`: mostra e anima a pontuação do jogador.

#### 5. **Cards informativos**

```css
.card, #highscore-card, #completed-lessons-card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow);
}
```

Define a aparência dos cards que mostram pontuações, progresso e lições concluídas, com cantos arredondados e sombras.

#### 6. **Modal e overlays**

* `.modal`: janelas modais flutuantes para mostrar mensagens ou interações extras.
* `.overlay.success`, `.overlay.error`: coberturas transparentes para indicar visualmente o sucesso ou erro de uma ação.


#### 7. **Barra de progresso**

```css
.progress-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  ...
}
```

Define uma barra fixa no rodapé que exibe o progresso do usuário durante as atividades.


#### 8. **Outros detalhes**

* `.lesson-difficulty`: indica o nível de dificuldade das lições com estilo itálico e cor discreta.
* `.toggle`: botão de alternância para mudar o tema claro/escuro.
* `.close`: botão de fechar janelas modais.

---

<h3 id="audio-js"> Estrutura do Arquivo JS (`audio.js`)</h3>

O arquivo `audio.js` é responsável por toda a manipulação de sons do projeto. Ele implementa a criação de contexto de áudio, emissão de diferentes tipos de sons para cada lição, e efeitos sonoros de feedback (como sucesso ou erro). Utiliza a API Web Audio para gerar sons programaticamente.

#### 1. **Inicialização do Contexto de Áudio**

```js
let audioContext = null;

export function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}
```

Cria um `AudioContext` (caso ainda não exista), necessário para todas as operações de áudio. Compatível com diferentes navegadores.

#### 2. **Som da Lição Atual (`playSoundForLesson`)**

```js
export function playSoundForLesson(currentLesson, currentAnswer, audioTypes) {
  const ctx = initAudio();
  const dur = 1.0;
  ...
}
```

Função principal que gera sons diferentes dependendo da lição atual:

* **Lição 1**: Som simples com oscilador e tipo de onda baseado na resposta:

  ```js
  osc.type = audioTypes[currentAnswer];
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  ```

* **Lição 2**: Adiciona um filtro ao som, modificando a frequência e tipo do filtro de acordo com a resposta:

  ```js
  filter.type = audioTypes[currentAnswer];
  filter.frequency.setValueAtTime(1000, ctx.currentTime);
  ```

* **Lição 3**: Aplica modulação (AM ou FM):

  * **AM**:

    ```js
    mod.connect(mg);
    mg.connect(output.gain);
    ```

  * **FM**:

    ```js
    mod.connect(mg).connect(carrier.frequency);
    ```

Cada lição possui uma estrutura de áudio diferente, simulando conceitos musicais ou de eletrônica.

#### 3. **Som de Feedback (`playFeedbackSound`)**

```js
export function playFeedbackSound(type) {
  const ctx = initAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  ...
}
```

Gera sons curtos de feedback:

* **Successo (`type === 'success'`)**:

  * Onda do tipo `triangle`
  * Frequência de 880 Hz
  * Volume mais suave

* **Erro (qualquer outro tipo)**:

  * Onda do tipo `sawtooth`
  * Frequência de 220 Hz
  * Volume mais forte

Finaliza o som após 200 milissegundos com `setTimeout`.

---

<h3 id="drawing-js"> Estrutura do Arquivo JS (`drawing.js`)</h3>

O arquivo `drawing.js` é responsável por desenhar graficamente no canvas os diversos tipos de ondas, transformações e filtros associados às lições. Ele utiliza a API Canvas 2D do HTML5 para gerar representações visuais de sinais periódicos, modulações e respostas de filtros.

#### 1. **Função Principal de Desenho (`desenharOnda`)**

```js
export function desenharOnda(tipo) {
  const canvas = document.getElementById("wave-canvas");
  const ctx = canvas.getContext("2d");
  ...
}
```

Escolhe o tipo de onda ou transformação e chama a função correspondente:

* `'sine'`, `'square'`, `'sawtooth'`: Desenha ondas básicas.
* `'lowpass'`, `'highpass'`, `'bandpass'`: Desenha respostas de filtros.
* `'am'`, `'fm'`: Representações visuais das modulações AM e FM.

---

#### 2. **Degrau Unitário (`drawUnitStep`)**

```js
function drawUnitStep(ctx, displacement) {
  ctx.beginPath();
  ctx.moveTo(0, 150);
  ...
}
```

Desenha um **degrau unitário suavizado**, deslocado horizontalmente:

* Usa tangente hiperbólica `Math.tanh(...)` para suavização.
* Cor da linha: azul escuro.
* Útil para representar funções de entrada em sistemas lineares.

---

#### 3. **Sinal Escalado Horizontalmente (`drawScaledSignal`)**

```js
function drawScaledSignal(ctx, scaleFactor) {
  ctx.beginPath();
  ...
}
```

Desenha duas ondas senoides:

* **Onda original** (preta).
* **Versão escalada** horizontalmente pelo fator de escala `scaleFactor` (vermelha).
* Inclui legenda embutida no canvas.

Representa transformações temporais do tipo $x(at)$.

---

#### 4. **Alteração de Amplitude (`drawAmplitudeChange`)**

```js
function drawAmplitudeChange(ctx, amplitudeFactor) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  ...
}
```

Desenha uma senoide cuja **amplitude foi modificada**:

* Onda verde sobre um fundo em degradê.
* O fator `amplitudeFactor` controla a intensidade da onda.

Útil para representar transformações do tipo $A \cdot x(t)$.

---




## Integrantes:

**João Pedro Rodrigues Silva**  
[![Static Badge](https://img.shields.io/badge/%7C%20Jottynha-black?style=flat-square&logo=github)](https://github.com/Jottynha)
[![Static Badge](https://img.shields.io/badge/%7C%20jprs1308%40gmail.com%20-black?style=flat-square&logo=gmail)](mailto:jprs1308@gmail.com)


**Jader Oliveira Silva**  
[![Static Badge](https://img.shields.io/badge/%7C%200livas-black?style=flat-square&logo=github)](https://github.com/0livas)
[![Static Badge](https://img.shields.io/badge/%7C%20jaderoliveira28%40gmail.com%20%20-black?style=flat-square&logo=gmail)](mailto:jaderoliveira28@gmail.com)

**Pedro Augusto Moura**  
[![Static Badge](https://img.shields.io/badge/%7C%20PedroAugusto08-black?style=flat-square&logo=github)](https://github.com/PedroAugusto08)
[![Static Badge](https://img.shields.io/badge/%7C%20pedroaugustomoura70927%40gmail.com-black?style=flat-square&logo=gmail)](mailto:pedroaugustomoura70927@gmail.com)

**Rafael Ferreira da Rocha**  
[![Static Badge](https://img.shields.io/badge/%7C%20rafanduba-black?style=flat-square&logo=github)](https://github.com/rafanduba)
[![Static Badge](https://img.shields.io/badge/%7C%20rafaelrocha241003%40gmail.com%20-black?style=flat-square&logo=gmail)](mailto:rafaelrocha241003@gmail.com)

**Samuel Silva Gomes**  
[![Static Badge](https://img.shields.io/badge/%7C%20samuelsilvg-black?style=flat-square&logo=github)](https://github.com/samuelsilvg)
[![Static Badge](https://img.shields.io/badge/%7C%20silvagomes881%40gmail.com%20-black?style=flat-square&logo=gmail)](mailto:silvagomes881@gmail.com)

___


<!---
✉️ jprs1308@gmail.com (**João Pedro Rodrigues Silva**)

✉️ jaderoliveira28@gmail.com (**Jader Oliveira Silva**)

✉️ pedroaugustomoura70927@gmail.com (**Pedro Augusto Moura**)

✉️ rafaelrocha241003@gmail.com (**Rafael Ferreira da Rocha**)  

✉️ silvagomes881@gmail.com (**Samuel Silva Gomes**)
--->
