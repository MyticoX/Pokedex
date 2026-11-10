# 🎮 Pokédex React + Vite

Pokédex interativa desenvolvida com **React + Vite** para a Atividade 03 (Desenvolvimento e Integração de Aplicações Web – PUC Minas).

**Integrantes (Pair Programming):** _preencher nomes da dupla_

## ✨ Funcionalidades

**Requisitos da atividade**
- 🐾 Lista com os 151 Pokémon do `pokedex-data.json` (+ **Rayquaza**, extra, veja abaixo) (ID, nome, tipos, HP, Ataque, Defesa, Atq. Especial, Def. Especial e Velocidade em cada card)
- 🔎 Pesquisa por **nome ou ID**, atualizada a cada tecla digitada (ex.: `Bulba`, `25`, `#025`)
- 🧬 Filtro por **tipo**, usando os tipos presentes nos dados
- 📄 **Detalhes** do Pokémon em modal, com barras de atributos animadas, total e treinadores que o possuem
- 🧑‍🚀 Área de **Treinadores** (nome, insígnias e Pokémon de cada um; clique no Pokémon para abrir os detalhes)
- ⚠️ Tratamento de “nenhum Pokémon encontrado”
- 📱 Layout responsivo (desktop, tablet e smartphone)
- 🎨 Identidade visual própria: gradientes por tipo, animações, hover e tema escuro

**Desafios opcionais implementados**
- ⭐ Favoritos (salvos no `localStorage`)
- ⚔️ Comparação de 2 Pokémon lado a lado
- 📊 Ordenação por HP, Attack, Defense, Special Attack, Special Defense, Speed, Nome e ID (crescente/decrescente)
- 🎲 Pokémon aleatório
- 🌙 Dark Mode (salvo no `localStorage`, respeita a preferência do sistema na primeira visita)
- 🌐 Imagens da PokéAPI (veja abaixo)

**Extras visuais (3D)**
- 🃏 **Carta animada** no painel principal dos detalhes: carta oficial (Pokémon TCG API) com brilho holográfico e balanço automáticos; ao passar o mouse ela passa a seguir o ponteiro. Sem conexão, mostra a carta gerada pela Pokédex
- 🎞️ **Modo Animado**: GIF animado do Pokémon (sprites do PokéAPI), ampliado em escala inteira para os pixels ficarem nítidos; sem rede, cai para a imagem estática
- 🌋 **Cenário de elementos por tipo** no fundo: chamas para Fire, bolhas para Water, folhas para Grass, raios para Electric, neve para Ice, engrenagens para Steel, órbitas de dragões e cristais para Dragon/Psychic etc. (nos detalhes, na aba da carta e em miniatura nos cards)
- 👑 **Lendários** (Articuno, Zapdos, Moltres, Mewtwo, Mew e Rayquaza) com selo e moldura dourada animada
- 🃏 Aba **Carta** nos detalhes: mostra as **cartas físicas oficiais** do Pokémon (Pokémon TCG), com navegação entre as versões, inclinação 3D que segue o mouse e efeito holográfico
- 🎴 Se a API de cartas estiver indisponível (ou sem internet), a Pokédex exibe uma **carta colecionável gerada a partir dos dados** do JSON
- 🧊 Cards da lista com inclinação 3D, brilho que segue o mouse e Pokémon "saltando" para fora do card
- 🔄 Modal com abertura em 3D e efeito de "virar" ao trocar de aba ou de Pokémon
- 🪙 Pokébola girando em 3D no cabeçalho, pokébolas flutuando no fundo e barras de atributos com reflexo
- ♿ Respeita `prefers-reduced-motion` (animações desativadas para quem prefere)

## ▶️ Como executar

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
npm install
npm run dev
```

Abra no navegador: **http://localhost:5173**

Outros comandos:

```bash
npm run build     # gera a versão de produção em /dist
npm run preview   # serve a versão de produção localmente
```

## 📁 Dados

> **Rayquaza (#384)** foi adicionado como Pokémon extra em [`src/data/extra-pokemon.json`](src/data/extra-pokemon.json). O arquivo oficial `pokedex-data.json` permanece **intacto**; os dois são combinados em `App.jsx`.

Os dados ficam em [`src/data/pokedex-data.json`](src/data/pokedex-data.json) (Pokémon, tipos e treinadores) e são importados diretamente em `App.jsx`. A aplicação **não depende** de nenhuma API para funcionar.

## 🌐 API externa (imagens)

As imagens dos Pokémon usam os sprites públicos do repositório da **PokéAPI**:

```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png
```

Fonte: <https://pokeapi.co/> · <https://github.com/PokeAPI/sprites>

Se a imagem não carregar (ex.: sem internet), o componente `PokemonImage` exibe um fallback com o número do Pokémon, e o restante da Pokédex continua funcionando.

### 🃏 Cartas físicas (Pokémon TCG API)

As cartas da aba **Carta** vêm da **Pokémon TCG API** (<https://pokemontcg.io>), consultada pelo número da Pokédex:

```
https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:{id}
```

A busca é feita em `src/hooks/useTcgCards.js` (com cache em memória e timeout de 12 s). Caso a API falhe, o componente `CardViewer` mostra a carta gerada pelo `TradingCard`, de design próprio. Pokémon e suas cartas são marcas e direitos de Nintendo, Creatures, GAME FREAK e The Pokémon Company; as imagens são apenas exibidas a partir da API, para fins educacionais.

## 🧩 Organização do projeto

```text
pokedex-react/
├── public/
│   └── pokeball.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # título, abas (Pokémon/Treinadores), tema e contador de favoritos
│   │   ├── SearchBar.jsx       # campo de pesquisa
│   │   ├── Filters.jsx         # filtro por tipo, ordenação, favoritos, aleatório
│   │   ├── TypeBadge.jsx       # selo de tipo (também usado como botão de filtro)
│   │   ├── PokemonList.jsx     # grade de cards + estado vazio
│   │   ├── PokemonCard.jsx     # card do Pokémon
│   │   ├── PokemonImage.jsx    # imagem com fallback
│   │   ├── PokemonDetails.jsx  # modal de detalhes
│   │   ├── StatBar.jsx         # barra de atributo
│   │   ├── Modal.jsx           # modal reutilizável (ESC / clique fora fecham)
│   │   ├── ComparePanel.jsx    # barra de seleção + modal de comparação
│   │   ├── CardViewer.jsx      # visualizador das cartas físicas (TCG) com navegação
│   │   ├── TradingCard.jsx     # carta colecionável gerada (fallback)
│   │   ├── TiltCard.jsx        # inclinação 3D + brilho + holográfico
│   │   ├── Backdrop.jsx        # pokébolas flutuando ao fundo
│   │   ├── HeroCard.jsx        # carta oficial animada no painel dos detalhes
│   │   ├── PokemonAnimated.jsx # GIF animado com fallback para imagem estática
│   │   ├── TypeScene.jsx       # cenário animado com os elementos do tipo
│   │   └── TrainerList.jsx     # lista de treinadores e seus Pokémon
│   ├── css/                    # um arquivo CSS por componente
│   ├── data/
│   │   ├── pokedex-data.json   # dados oficiais da atividade (intacto)
│   │   └── extra-pokemon.json  # Pokémon extras (Rayquaza)
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useTcgCards.js      # busca as cartas na Pokémon TCG API
│   │   └── useTilt.js          # efeito de inclinação 3D
│   ├── utils/
│   │   ├── pokemon.js          # cores de tipos, stats, ordenação, helpers
│   │   └── elements.js         # elementos decorativos de cada tipo
│   ├── App.jsx                 # estados globais e composição
│   ├── main.jsx
│   └── index.css               # tema, reset e estilos globais
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ⚛️ Conceitos de React utilizados

- Componentes funcionais e **props** (inclusive funções de callback)
- **`useState`** para busca, filtro, ordenação, Pokémon selecionado, favoritos e comparação
- **`useEffect`** para aplicar o tema, atualizar o título da página e controlar o modal (ESC/scroll)
- **`useMemo`** e **estado derivado** (lista filtrada e ordenada calculada a partir dos estados)
- **Hook customizado** (`useLocalStorage`)
- Renderização de listas com **`map()`** e `key`
- Eventos (`onChange`, `onClick`, teclado) e renderização condicional

## 📦 Dependências

| Pacote | Uso |
| --- | --- |
| `react`, `react-dom` | Biblioteca de interface |
| `vite`, `@vitejs/plugin-react` | Bundler / servidor de desenvolvimento |
