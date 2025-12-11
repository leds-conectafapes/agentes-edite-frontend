# 🏗️ Arquitetura Modular - Guia Técnico Detalhado

## Visão Geral

Este documento detalha as decisões arquiteturais, padrões de design e princípios técnicos que fundamentam a arquitetura modular implementada neste projeto.

## 🎯 Princípios Arquiteturais

### 1. **Separação por Domínio (Domain-Driven Design)**

Cada módulo representa um **contexto delimitado** (bounded context) do domínio de negócio:

```
📦 autenticacao/     → Contexto de autenticação e autorização
📦 dashboards/       → Contexto de visualização de dados
📦 portalCoordenador/ → Contexto específico do coordenador
```

**Benefícios:**
- Reduz acoplamento entre diferentes áreas de negócio
- Facilita o entendimento do código por domínio
- Permite evolução independente de cada contexto

### 2. **Inversão de Dependências**

A arquitetura implementa inversão de dependências através de:

```typescript
// Interface abstrata
interface HttpClientInterface {
  get<T>(url: string): Promise<T>
  post<T>(url: string, data: any): Promise<T>
}

// Implementação concreta
class AxiosHttpClient implements HttpClientInterface {
  // implementação específica
}

// Serviço depende da abstração, não da implementação
class ProjetoService {
  constructor(private httpClient: HttpClientInterface) {}
}
```

### 3. **Composição sobre Herança**

Utilizamos composição através de:
- **Composables**: Lógica reutilizável via Composition API
- **Providers**: Composição de serviços
- **Mixins funcionais**: Ao invés de herança de classes

## 🔧 Padrões de Design Implementados

### 1. **Repository Pattern**

```typescript
// Abstração da camada de dados
export class ProjetoService {
  constructor(private httpClient: HttpClientInterface) {}
  
  async listarProjetos(): Promise<Projeto[]> {
    // Lógica de negócio + comunicação com API
    return this.httpClient.get('/projetos')
  }
}
```

**Vantagens:**
- Abstrai detalhes de implementação da API
- Facilita testes com mocks
- Centraliza lógica de acesso a dados

### 2. **Factory Pattern**

```typescript
// Factory para criação de serviços
export class ServiceFactory {
  static createProjetoService(): ProjetoService {
    const httpClient = ApiProvider.getInstance().getHttpClient()
    return new ProjetoService(httpClient)
  }
}
```

### 3. **Provider Pattern**

```typescript
// Configuração centralizada de dependências
export class ApiProvider {
  private static instance: ApiProvider
  
  public static getInstance(): ApiProvider {
    if (!ApiProvider.instance) {
      ApiProvider.instance = new ApiProvider(
        new AxiosHttpClient(API_CONFIG.BASE_URL)
      )
    }
    return ApiProvider.instance
  }
}
```

### 4. **Adapter Pattern**

```typescript
// Adaptador para diferentes clientes HTTP
export class AxiosHttpClient implements HttpClientInterface {
  private axios: AxiosInstance
  
  async get<T>(url: string): Promise<T> {
    const response = await this.axios.get(url)
    return response.data
  }
}

export class MockAxiosHttpClient implements HttpClientInterface {
  async get<T>(url: string): Promise<T> {
    // Implementação mock
    return mockData as T
  }
}
```

## 🏛️ Camadas da Arquitetura

### Camada de Apresentação (UI)
```
📁 views/          → Páginas/telas da aplicação
📁 components/     → Componentes Vue reutilizáveis
📁 layouts/        → Estruturas de layout
```

### Camada de Aplicação (Application)
```
📁 composables/    → Lógica de aplicação e estado
📁 router/         → Configuração de rotas
📁 store/          → Gerenciamento de estado global
```

### Camada de Domínio (Domain)
```
📁 entities/       → Modelos de domínio e regras de negócio
📁 types/          → Definições de tipos TypeScript
```

### Camada de Infraestrutura (Infrastructure)
```
📁 api/           → Comunicação com APIs externas
📁 services/      → Serviços de infraestrutura
📁 adapters/      → Adaptadores para sistemas externos
```

## 🔄 Fluxo de Dados

### 1. **Fluxo de Requisição**

```
Vue Component → Composable → Service → HTTP Client → API
     ↓              ↓           ↓           ↓         ↓
  Template    → useQuery  → Repository → Adapter → Backend
```

### 2. **Fluxo de Estado**

```
API Response → Service → Composable → Reactive State → Component
     ↓           ↓         ↓             ↓              ↓
   Data    → Transform → useQuery   → ref/reactive → Template
```

## 🧩 Estratégias de Modularização

### 1. **Organização do Código Compartilhado**

Todos os arquivos globalmente utilizados estão organizados na pasta `common/`:

```typescript
// ✅ BOM: Código compartilhado na pasta common
common/
├── api/              # Configuração global de API
├── components/       # Componentes reutilizáveis
├── store/           # Estado global
├── utils/           # Utilitários compartilhados
├── types/           # Tipos globais
├── plugins/         # Configuração de plugins
└── assets/          # Recursos estáticos

// ❌ RUIM: Código compartilhado espalhado
src/
├── components/      # Misturado com código específico
├── utils/           # Sem organização clara
└── api/             # Fora do contexto comum
```

### 2. **Módulos por Funcionalidade**

Cada módulo agrupa funcionalidades relacionadas:

```typescript
// ✅ BOM: Módulo coeso
modules/
├── autenticacao/
│   ├── login/
│   ├── registro/
│   └── recuperacao-senha/

// ❌ RUIM: Módulo muito genérico
modules/
├── usuarios/
│   ├── login/
│   ├── produtos/
│   └── vendas/
```

## 🔒 Princípios de Segurança

### 1. **Isolamento de Módulos**
- Cada módulo gerencia suas próprias permissões
- Estado sensível isolado por módulo
- Validação de acesso em cada camada

### 2. **Sanitização de Dados**
```typescript
// Validação com Zod
const ProjetoSchema = z.object({
  nome: z.string().min(1).max(100),
  descricao: z.string().optional(),
})

export function validateProjeto(data: unknown): Projeto {
  return ProjetoSchema.parse(data)
}
```

## 📊 Métricas e Monitoramento

### 1. **Métricas por Módulo**
- Bundle size por módulo
- Performance de carregamento
- Taxa de erro por funcionalidade

## 🧪 Estratégias de Teste

### 1. **Testes Unitários por Camada**

```typescript
// Teste de composable
describe('useGetProjetos', () => {
  it('should fetch projects', async () => {
    const mockService = vi.fn().mockResolvedValue(mockProjetos)
    const { projects } = useGetProjetos(mockService)
    
    expect(projects.value).toEqual(mockProjetos)
  })
})

// Teste de service
describe('ProjetoService', () => {
  it('should call correct endpoint', async () => {
    const mockClient = createMockHttpClient()
    const service = new ProjetoService(mockClient)
    
    await service.listarProjetos()
    
    expect(mockClient.get).toHaveBeenCalledWith('/projetos')
  })
})
```

### 2. **Testes de Integração por Módulo**

```typescript
// Teste de fluxo completo do módulo
describe('Dashboard Module Integration', () => {
  it('should load dashboard data', async () => {
    // Setup do módulo completo
    const wrapper = mount(DashboardView, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
    
    // Verificar carregamento de dados
    await waitFor(() => {
      expect(wrapper.find('[data-testid="project-list"]')).toBeTruthy()
    })
  })
})
```

## 🚀 Performance e Otimização

### 1. **Lazy Loading de Módulos**

```typescript
// Carregamento sob demanda
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/modules/dashboards/views/DashboardView.vue')
  }
]
```

### 2. **Code Splitting por Módulo**

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'auth': ['./src/modules/autenticacao'],
          'dashboard': ['./src/modules/dashboards'],
          'portal': ['./src/modules/portalCoordenador']
        }
      }
    }
  }
})
```

## 📚 Referências Técnicas

- [Clean Architecture - Robert Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Modular Monoliths - Kamil Grzybek](https://www.kamilgrzybek.com/design/modular-monolith-primer/)
- [Vue.js Composition API RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md)
- [Domain-Driven Design - Eric Evans](https://domainlanguage.com/ddd/)

---

**Esta documentação técnica serve como guia para desenvolvedores que desejam entender profundamente os padrões e decisões arquiteturais implementadas no projeto.**
