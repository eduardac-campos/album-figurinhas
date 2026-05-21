# Álbum de Figurinhas Virtual

Uma aplicação interativa para explorar e coletar figurinhas de seleções de futebol do mundo, desenvolvida com **React 19**, **Tailwind CSS 4** e integrada com a **API-Football**.

## 📋 Visão Geral

Este projeto implementa um álbum digital de figurinhas das seleções de futebol, permitindo aos usuários selecionar um país e visualizar o elenco completo de jogadores com suas fotos, números e posições.

## 🚀 Como Usar

### Passo 1: Obter Chave de API

1. Acesse [api-football.com](https://api-football.com)
2. Crie uma conta de desenvolvedor
3. Ative sua conta através do link de confirmação no email
4. Copie sua chave de API no Dashboard (menu Account ou Developer)

### Passo 2: Configurar a Aplicação

1. Abra o arquivo `client/src/hooks/useFootballAPI.ts`
2. Localize a linha com `'x-apisports-key': 'demo'`
3. Substitua `'demo'` pela sua chave de API pessoal:
   ```javascript
   'x-apisports-key': 'sua_chave_api_aqui'
   ```

### Passo 3: Usar a Aplicação

1. Selecione uma seleção de futebol no dropdown do painel esquerdo
2. A aplicação carregará automaticamente o elenco de jogadores
3. Explore as figurinhas com informações de cada jogador (nome, número, posição)

## 🏗️ Arquitetura Técnica

### Fluxo de Dados Encadeado

A aplicação implementa três etapas lógicas encadeadas conforme especificado:

**1. Carregar Países**
- Endpoint: `GET /teams/countries`
- Implementado em: `CountrySelector.tsx`
- Carrega lista de seleções disponíveis

**2. Descobrir ID do País**
- Endpoint: `GET /teams?name={pais_selecionado}`
- Implementado em: `useFootballAPI.ts`
- Obtém o ID numérico da seleção

**3. Obter Figurinhas**
- Endpoint: `GET /players/squads?team={id_do_time}`
- Implementado em: `useFootballAPI.ts`
- Retorna elenco completo com fotos e dados

### Estrutura de Componentes

```
client/src/
├── pages/
│   └── Home.tsx                 # Página principal com layout
├── components/
│   ├── CountrySelector.tsx      # Dropdown de seleções
│   ├── PlayerCard.tsx           # Card individual de jogador
│   └── ui/                      # Componentes shadcn/ui
├── hooks/
│   └── useFootballAPI.ts        # Hook para integração com API
└── index.css                    # Estilos globais e tema
```

## 🎨 Design

### Paleta de Cores (Design Desportivo Moderno)

- **Primária**: Azul profundo (#1e40af)
- **Secundária**: Laranja vibrante (#ea580c)
- **Fundo**: Branco puro
- **Texto**: Azul muito escuro

### Tipografia

- **Títulos**: Poppins Bold (800)
- **Corpo**: Inter Regular (400)
- **Destaque**: Poppins SemiBold (600)

### Animações

- Entrada em cascata dos cards (stagger 40ms)
- Efeito hover com elevação e zoom
- Transições suaves (200-300ms)

## ⚠️ Limitações da API

O plano básico gratuito da API-Football possui uma cota de **50 requisições por dia**. Recomenda-se:

1. Guardar respostas em arquivos JSON locais durante desenvolvimento
2. Usar a chave 'demo' para testes iniciais
3. Implementar cache local para reduzir chamadas à API

## 🔧 Desenvolvimento

### Instalar Dependências
```bash
pnpm install
```

### Executar em Desenvolvimento
```bash
pnpm dev
```

### Build para Produção
```bash
pnpm build
```

## 📱 Responsividade

A aplicação é totalmente responsiva:

- **Mobile**: Grid de 2 colunas
- **Tablet**: Grid de 3 colunas
- **Desktop**: Grid de 4 colunas

## ✅ Requisitos Técnicos Implementados

- ✅ Dropdown dinâmico carregado via API
- ✅ Encadeamento lógico das requisições
- ✅ Apresentação gráfica responsiva com CSS Grid
- ✅ Cards com nome, posição e imagem oficial
- ✅ Animações e transições suaves
- ✅ Design profissional e moderno

## 📚 Referências

- [API-Football Documentação](https://api-football.com)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)

## 📝 Notas

- A aplicação utiliza dados em cache local como fallback quando a API não está disponível
- As imagens dos jogadores são carregadas diretamente da API-Football
- O design segue princípios de Design Desportivo Moderno com foco em clareza e dinamismo

---

**Data de Entrega**: 05/06/2026
**Desenvolvido com**: React 19 + Tailwind CSS 4 + API-Football
