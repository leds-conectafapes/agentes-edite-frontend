# LEDS Modular Frontend

**Uma nova proposta de arquitetura modular para aplicações Vue.js**

Este repositório apresenta uma arquitetura modular inovadora para o desenvolvimento de aplicações frontend, tendo por base algumas telas e componentes presentes no projeto Portal do Coordenador do sistema FAPES. A arquitetura permite escalabilidade, manutenibilidade e organização clara do código através de módulos independentes e bem estruturados.

## 🏗️ Arquitetura Modular

Esta aplicação implementa uma **arquitetura baseada em módulos** que promove:

- **Separação de responsabilidades** por domínio de negócio
- **Reutilização de código** através de componentes globais organizados na pasta `common`
- **Escalabilidade** facilitada pela estrutura modular
- **Manutenibilidade** através de organização clara
- **Testabilidade** com módulos isolados
## Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes requisitos instalados:

- [Node.js](https://nodejs.org/) na versão 23.9.0 ou similar
- npm na versão 11.3.0 ou similar

## Instalação

Siga estas etapas para configurar o projeto localmente:

1. Clone o repositório

```shell
git clone git@github.com:leds-conectafapes/leds-conectafapes-frontend-portal-coordenador.git
cd leds-conectafapes-frontend-portal-coordenador
```

2. Instale os pacotes npm

```shell
npm install
```

Com o projeto configurado, você pode:

1. Rodar o servidor de desenvolvimento

```shell
npm run dev
```

2. Buildar o projeto para produção ou _preview_

```shell
npm run build
```

3. Após buildar, rodar o servidor de preview

```shell
npm run preview
```

## Mock
Para rodar o server de mock:
```shell
npm run mock
```

## 📁 Estrutura Modular de Diretórios

A arquitetura segue uma organização hierárquica clara que separa responsabilidades:

```
leds-modular-frontend/
├── src/
│   ├── main.ts                    # Ponto de entrada da aplicação
│   ├── App.vue                    # Componente raiz
│   ├── globalComponents.ts        # Registro de componentes globais
│   ├── style.css                  # Estilos globais da aplicação
│   │
│   ├── modules/                   # 🎯 MÓDULOS DE NEGÓCIO
│   │   ├── autenticacao/          # Módulo de autenticação
│   │   │   ├── api/               # Serviços específicos do módulo
│   │   │   │   ├── adapters/      # Adaptadores específicos
│   │   │   │   ├── factories/     # Factories do módulo
│   │   │   │   └── services/      # Serviços de negócio
│   │   │   ├── entities/          # Tipos e interfaces
│   │   │   ├── stores/            # Estados Pinia do módulo
│   │   │   └── login/             # Funcionalidade específica
│   │   │       ├── components/    # Componentes do login
│   │   │       ├── composables/   # Lógica reutilizável
│   │   │       ├── router.ts      # Rotas do módulo
│   │   │       └── view/          # Views/páginas
│   │   │
│   │   ├── dashboards/            # Módulo de dashboards
│   │   │   ├── api/               # Camada de dados
│   │   │   ├── components/        # Componentes específicos
│   │   │   │   ├── cards/         # Componentes de cartões
│   │   │   │   ├── column/        # Componentes de colunas
│   │   │   │   ├── line/          # Componentes de linhas
│   │   │   │   └── types/         # Tipos dos componentes
│   │   │   ├── composables/       # Hooks Vue personalizados
│   │   │   │   └── types/
│   │   │   ├── store/             # Estado do módulo
│   │   │   ├── types/             # Definições de tipos
│   │   │   ├── router.ts          # Configuração de rotas
│   │   │   └── views/             # Páginas do dashboard
│   │   │
│   │   └── portalCoordenador/     # Módulo principal do portal
│   │       ├── MeuPerfil/         # Recurso de portalCoordenador
│   │       │   ├── components/    # Componentes do perfil
│   │       │   ├── composables/   # Lógica do perfil
│   │       │   ├── i18n/          # Internacionalização
│   │       │   │   └── locales/
│   │       │   ├── routes.ts      # Rotas do sub-módulo
│   │       │   └── view/          # Views do perfil
│   │       ├── api/               # Serviços do portal
│   │       │   ├── factories/     # Factories específicas
│   │       │   └── services/      # Serviços do portal
│   │       ├── composables/       # Hooks compartilhados
│   │       ├── entities/          # Entidades de domínio
│   │       ├── store/             # Estado global do portal
│   │       ├── router.ts          # Rotas principais
│   │       └── view/              # Views principais
│   │
│   ├── common/                    # 🔧 RECURSOS COMUNS
│   │   ├── api/                   # Configuração global da API
│   │   │   ├── config.ts              # Configurações de endpoints
│   │   │   ├── provider.ts            # Provedores de serviços HTTP
│   │   │   ├── interface.ts           # Interfaces da camada de API
│   │   │   ├── adapters/              # Adaptadores HTTP
│   │   │   │   └── http/              # Clientes HTTP (Axios, Mock)
│   │   │   ├── factory/               # Factories para criação de serviços
│   │   │   └── interceptors/          # Interceptadores de requisições
│   │   │
│   │   ├── components/                # 🧩 COMPONENTES GLOBAIS
│   │   │   ├── buttons/               # Componentes de botões
│   │   │   ├── cards/                 # Componentes de cartões
│   │   │   │   └── types/
│   │   │   ├── feedback/              # Componentes de feedback
│   │   │   │   └── types/
│   │   │   ├── form/                  # Componentes de formulário
│   │   │   │   └── types/
│   │   │   ├── layout/                # Componentes de layout
│   │   │   └── navigation/            # Componentes de navegação
│   │   │
│   │   ├── plugins/                   # 🔌 CONFIGURAÇÃO DE PLUGINS
│   │   │   ├── index.ts               # Registro centralizado
│   │   │   ├── dayjs.ts               # Configuração de datas
│   │   │   ├── pinia.ts               # Estado global
│   │   │   └── i18n/                  # Internacionalização
│   │   │       └── locales/
│   │   │
│   │   ├── router/                    # 🛣️ SISTEMA DE ROTAS
│   │   │   └── index.ts               # Configuração central de rotas
│   │   │
│   │   ├── store/                     # 🗄️ ESTADO GLOBAL
│   │   │   ├── index.store.ts         # Store principal
│   │   │   └── snackbarStore.ts       # Estado de notificações
│   │   │
│   │   ├── types/                     # 📝 TIPOS GLOBAIS
│   │   │   ├── projects.ts            # Tipos de projetos
│   │   │   └── styleTypes.ts          # Tipos de estilos
│   │   │
│   │   ├── utils/                     # 🛠️ UTILITÁRIOS
│   │   │   ├── currencyFormatter.ts   # Formatação de moeda
│   │   │   └── tailwindMerge.ts       # Utilitários CSS
│   │   │
│   │   ├── constants/                 # 📋 CONSTANTES
│   │   │   └── selectOptionsMeuPerfil.ts
│   │   │
│   │   └── assets/                    # 🎨 RECURSOS ESTÁTICOS
│   │   │   ├── fonts/                 # Fontes
│   │   │   │   ├── inter/             # Fonte Inter
│   │   │   │   └── materialSymbols/   # Ícones Material Symbols
│   │   │   └── images/                # Imagens
│   │   │       └── svg/               # Imagens vetoriais
│
├── mock/                          # 🎭 DADOS MOCK
│   └── db.json                    # Base de dados simulada
│
├── layouts/                      # 📐 LAYOUTS DA APLICAÇÃO
│   └── LayoutBase.vue            # Layout base reutilizável
│
├── public/                        # 📁 ARQUIVOS PÚBLICOS
├── .github/                       # ⚙️ CONFIGURAÇÕES GITHUB
├── .husky/                        # 🐕 HOOKS GIT
├── package.json                   # 📦 DEPENDÊNCIAS
├── vite.config.ts                 # ⚡ CONFIGURAÇÃO VITE
├── tsconfig.json                  # 🔷 CONFIGURAÇÃO TYPESCRIPT
└── env.d.ts                       # 🌍 DEFINIÇÕES DE AMBIENTE
```

## 🎯 Conceitos Fundamentais da Arquitetura

### 1. **Módulos de Negócio** (`src/modules/`)

Cada módulo representa um **domínio de negócio específico** e é completamente **auto-contido**:

- **Estrutura Consistente**: Todos os módulos seguem a mesma organização interna
- **Isolamento**: Cada módulo gerencia seu próprio estado, rotas e componentes
- **Reutilização**: Componentes e lógica podem ser compartilhados entre módulos
- **Escalabilidade**: Novos módulos podem ser adicionados sem afetar os existentes

#### Anatomia de um Módulo:

```typescript
// Exemplo: src/modules/portalCoordenador/
├── api/                    # Camada de dados e serviços
│   ├── services/          # Lógica de negócio e comunicação com APIs
│   ├── factories/         # Criação e configuração de serviços
│   └── stores/            # Estado específico do módulo (Pinia)
├── components/            # Componentes específicos do domínio
├── composables/           # Hooks Vue reutilizáveis
├── entities/              # Modelos de dados e tipos TypeScript
├── router.ts              # Configuração de rotas do módulo
├── store/                 # Estado global do módulo
└── views/                 # Páginas/telas do módulo
```

### 2. **Sistema de Roteamento Modular**

O sistema de rotas é **federado** - cada módulo define suas próprias rotas:

```typescript
// src/routes/index.ts - Agregação central
import loginRoutes from '@/modules/autenticacao/login/router'
import dashboardRoutes from '@/modules/dashboards/router'
import portalRoutes from '@/modules/portalCoordenador/router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...loginRoutes, ...portalRoutes, ...dashboardRoutes],
})
```

### 3. **Camada de API Unificada**

A arquitetura implementa uma **camada de abstração** para comunicação com APIs:

- **Adaptadores**: Abstraem diferentes clientes HTTP (Axios, Mock)
- **Providers**: Gerenciam instâncias e configurações
- **Factories**: Criam serviços com dependências injetadas
- **Interceptors**: Manipulam requisições e respostas globalmente

```typescript
// Exemplo de uso em um módulo
export class ProjetoService {
  constructor(private httpClient: HttpClientInterface) {}
  
  async listarProjetos(): Promise<Projeto[]> {
    return this.httpClient.get('/projetos')
  }
}
```

### 4. **Componentes Globais vs. Específicos**

- **Globais** (`src/components/`): Reutilizáveis em toda aplicação
- **Específicos** (`src/modules/*/components/`): Acoplados ao domínio do módulo

### 5. **Gerenciamento de Estado Hierárquico**

- **Global** (`src/store/`): Estado compartilhado entre módulos
- **Modular** (`src/modules/*/store/`): Estado específico do domínio
- **Local**: Estado de componentes individuais

## 🚀 Benefícios da Arquitetura

### ✅ **Escalabilidade**
- Novos módulos podem ser adicionados independentemente
- Equipes podem trabalhar em módulos diferentes simultaneamente
- Crescimento horizontal da aplicação

### ✅ **Manutenibilidade**
- Código organizado por domínio de negócio
- Fácil localização de funcionalidades
- Redução de acoplamento entre diferentes áreas

### ✅ **Testabilidade**
- Módulos podem ser testados isoladamente
- Mocks específicos por módulo
- Testes de integração mais focados

### ✅ **Reutilização**
- Componentes globais disponíveis para todos os módulos
- Lógica compartilhada através de composables
- Padrões consistentes em toda aplicação

### ✅ **Separação de Responsabilidades**
- Cada módulo tem responsabilidade bem definida
- Camadas claramente separadas (API, UI, Estado)
- Facilita onboarding de novos desenvolvedores

## 🛠️ Tecnologias e Padrões

### **Stack Principal**
- **Vue 3** + **Composition API**: Framework reativo moderno
- **TypeScript**: Tipagem estática e melhor DX
- **Vite**: Build tool rápido e moderno
- **Pinia**: Gerenciamento de estado
- **Vue Router**: Roteamento SPA
- **TailwindCSS**: Estilização utilitária

### **Padrões Arquiteturais**
- **Modular Monolith**: Organização modular em monorepo
- **Dependency Injection**: Injeção de dependências via factories
- **Repository Pattern**: Abstração da camada de dados
- **Composition Pattern**: Reutilização via composables
- **Provider Pattern**: Configuração centralizada de serviços

### **Qualidade de Código**
- **ESLint**: Linting e padronização
- **Prettier**: Formatação automática
- **Husky**: Git hooks para qualidade
- **TypeScript**: Tipagem estática

## 📋 Convenções e Boas Práticas

### **Nomenclatura**
- **Módulos**: `camelCase` (ex: `portalCoordenador`)
- **Componentes**: `PascalCase` (ex: `MeuPerfilCard.vue`)
- **Composables**: `use` prefix (ex: `useGetProjetos.ts`)
- **Stores**: `Store` suffix (ex: `authStore.ts`)
- **Services**: `Service` suffix (ex: `projetoService.ts`)

### **Organização de Arquivos**
- **Um conceito por arquivo**: Cada arquivo tem responsabilidade única
- **Agrupamento por funcionalidade**: Não por tipo de arquivo
- **Índices de exportação**: Facilitar importações

### **Importações**
- **Alias `@/`**: Para importações absolutas
- **Barrel exports**: Usar `index.ts` para exportações centralizadas

## 🔄 Fluxo de Desenvolvimento

### **Adicionando um Novo Módulo**

1. **Criar estrutura do módulo**:
   ```bash
   mkdir -p src/modules/novoModulo/{api,components,composables,entities,store,views}
   ```

2. **Implementar router do módulo**:
   ```typescript
   // src/modules/novoModulo/router.ts
   export default [
     {
       path: '/novo-modulo',
       component: () => import('./views/NovoModuloView.vue')
     }
   ]
   ```

3. **Adicionar módulo ao router principal**:
   ```typescript
   // src/routes/index.ts
   import novoModuloRoutes from '@/modules/novoModulo/router'
   
   export const router = createRouter({
     history: createWebHistory(import.meta.env.BASE_URL),
     routes: [...loginRoutes, ...portalRoutes, ...dashboardRoutes, ...novoModuloRoutes],
   })
   ```

## 🚦 Começando com a Arquitetura

### **Para Novos Desenvolvedores**

1. **Entenda a estrutura modular**:
   - Explore o diretório `src/modules/` para ver exemplos reais
   - Analise como cada módulo organiza suas responsabilidades
   - Observe os padrões de nomenclatura e organização

2. **Estude um módulo completo**:
   - Comece com `src/modules/dashboards/` (mais simples)
   - Veja como as rotas são definidas e registradas
   - Analise o fluxo de dados: composables → services → API

3. **Pratique criando um módulo simples**:
   - Implemente um módulo de "configurações" ou "ajuda"
   - Siga as convenções estabelecidas
   - Use os padrões existentes como referência

### **Para Projetos Existentes**

#### **Estratégia de Migração Gradual**

1. **Fase 1 - Preparação**:
   ```bash
   # Criar estrutura base
   mkdir -p src/{modules,components,api,plugins,routes,store}
   
   # Mover componentes globais
   mv src/components/* src/components/
   ```

2. **Fase 2 - Primeiro Módulo**:
   - Escolha uma funcionalidade isolada
   - Crie o primeiro módulo seguindo a estrutura
   - Migre rotas e componentes relacionados

3. **Fase 3 - Expansão**:
   - Migre outros módulos gradualmente
   - Refatore código compartilhado
   - Ajuste importações e dependências

4. **Fase 4 - Otimização**:
   - Revise e otimize a estrutura
   - Implemente testes modulares
   - Documente padrões específicos do projeto

## 📚 Recursos e Referências

### **Documentação Técnica**
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia State Management](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vite Build Tool](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

### **Padrões Arquiteturais**
- [Modular Monolith Pattern](https://www.kamilgrzybek.com/design/modular-monolith-primer/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### **Boas Práticas Vue.js**
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [Composition API Best Practices](https://vuejs.org/guide/reusability/composables.html)

## 🤝 Contribuindo

### **Diretrizes para Contribuição**

1. **Siga os padrões estabelecidos**:
   - Use as convenções de nomenclatura
   - Mantenha a estrutura modular
   - Documente mudanças significativas

2. **Antes de adicionar um novo módulo**:
   - Verifique se não existe funcionalidade similar
   - Discuta a arquitetura com a equipe
   - Planeje a integração com módulos existentes

3. **Para componentes globais**:
   - Certifique-se de que são realmente reutilizáveis
   - Documente props e eventos
   - Inclua exemplos de uso

4. **Testes**:
   - Teste módulos isoladamente
   - Inclua testes de integração quando necessário
   - Mantenha cobertura adequada

### **Processo de Review**

- **Arquitetura**: Verificar aderência aos padrões modulares
- **Código**: Qualidade, legibilidade e performance
- **Testes**: Cobertura e qualidade dos testes
- **Documentação**: Atualização da documentação quando necessário

## 🔮 Roadmap e Evolução

### **Próximos Passos**
- [ ] **Testing Strategy**: Estratégia abrangente de testes modulares
- [ ] **Performance**: Otimizações específicas para arquitetura modular

### **Possíveis Evoluções**

1. **Tooling Específico**:
   - CLI para criação de módulos
   - Scaffolding automático
   - Validação de arquitetura

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE) - veja o arquivo LICENSE para detalhes.

## 👥 Equipe

**LEDS - Laboratório de Engenharia e Desenvolvimento de Software**
- Universidade Federal do Espírito Santo (UFES)
- Projeto FAPES - Fundação de Amparo à Pesquisa e Inovação do Espírito Santo

---

**💡 Esta arquitetura representa uma evolução natural para aplicações Vue.js que precisam escalar mantendo qualidade e organização. A modularidade não é apenas uma técnica de organização, mas uma filosofia de desenvolvimento que promove código limpo, testável e sustentável.**
```
