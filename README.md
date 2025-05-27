# Jogo Educacional para Disciplina de Sinais e Sistemas Lineares 
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


## Estrutura do Projeto

A tabela a seguir apresenta os principais arquivos e diretórios que compõem o projeto, bem como uma breve descrição de suas funções:

| Arquivo / Pasta    | Descrição                                                                 |
|--------------------|---------------------------------------------------------------------------|
| `index.html`       | Página principal do projeto. Contém a estrutura básica do jogo em HTML.   |
| `style.css`        | Folha de estilos responsável pelo layout e visual do jogo.                |
| `js/`              | Diretório que contém todos os scripts JavaScript utilizados no projeto.   |
| `js/audio.js`      | Gerencia os efeitos sonoros e sons do jogo.                              |
| `js/drawing.js`    | Responsável pelas funções de desenho na tela (canvas, elementos gráficos).|
| `js/main.js`       | Script principal. Controla o fluxo geral do jogo e a inicialização.       |
| `js/questions.js`  | Contém as perguntas e lógicas relacionadas aos desafios propostos.        |
| `js/ui.js`         | Gerencia a interface do usuário, como botões e telas interativas.         |

