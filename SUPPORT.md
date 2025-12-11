# 📁 Explicação da Estrutura  

Atualmente, nossa arquitetura se concentra em ser **Modular**, ou seja, trabalha com módulos. É necessário termos uma parte global, onde abrange tudo que será comum entre os módulos, e a parte mais específica do nosso código (dentro dos módulos).  

---

## 🌍 Parte Global  

A camada global se concentra nas regras de negócio reutilizáveis e componentes compartilhados entre módulos.  

### **Principais elementos da parte global:**  

#### **1. Api - Entity e Factory:**  
- Responsáveis pela criação e manipulação de entidades.  
- Utilizam o `ApiError` para gerenciar erros comuns, como **404** (não encontrado) e **500** (erro interno), permitindo um controle mais refinado das falhas.  

#### **2. Api - apiProvider:**  
- Gerencia o **token de autenticação** do usuário e injeta a API nos módulos necessários.  
- Centraliza a comunicação com o backend e facilita a integração entre diferentes partes do sistema.  

#### **3. Componentes globais:**  
- Inclui elementos reutilizáveis que aparecem em várias partes da aplicação, como **Snackbar**, **dialogs** e **navmenu**.  

---

## 🛠️ Módulos  

Cada funcionalidade do sistema é organizada em um módulo separado, seguindo a estrutura abaixo:  

### **1. View**  
- A **View** representa a página em si — a parte visual renderizada para o usuário.  
- Deve ser **leve e enxuta**, contendo o mínimo possível de regras de negócio.  

✅ **Boas práticas:**  
- Focar apenas em **estrutura e chamada de componentes**.  
- A lógica deve ser delegada para **composables** e **services**.  
- A parte de **UI** deve ser configurada nos **components**.  

---

### **2. Components**  
Os **components** são responsáveis pela **interface visual (UI)**. Eles contêm principalmente o **HTML** e **CSS** da aplicação, garantindo a reutilização de elementos visuais entre diferentes views.  

🔹 **Exemplos:**  
- Card de usuário  
- Botão customizado  
- Tabela de dados  

👉 **Regra de ouro:**  
- Components **não devem conter regras de negócio ou chamadas de API** — só UI.  

---

### **3. Router**  
Gerencia as **rotas específicas** do módulo. Define os caminhos, parâmetros e redirecionamentos necessários para navegar dentro do módulo.  

**Exemplo de estrutura de rota:**  
```
{
  path: '/projetos',
  component: () => import('@/modules/projetos/ProjectsView.vue')
}
```
### 4. Composables

Os composables armazenam a lógica e as regras de negócio da view. Eles seguem a filosofia de **"separação de responsabilidades"**, permitindo que a view permaneça limpa e focada na exibição.

### O que vai aqui:

- **Métodos de manipulação de dados**
- **Regras de exibição condicional**
- **Controle de estados locais**
- **Validações personalizadas**

👉 **Dica:** Usar a extensão `.ts` para garantir tipagem e melhorar a manutenção.

---


### 5. Services

Os services concentram as chamadas para a API relacionadas ao módulo. Isso garante que a comunicação com o backend fique centralizada e organizada.

### Exemplo:

```
import { apiProvider } from '@/global/apiProvider'

export const getUserData = () => {
  return apiProvider.get('/users')
}
```

✅ **Bônus:** Facilita a manutenção e testes, pois se a API mudar, basta ajustar o service — sem mexer na view ou composable.

---

## 🔧 Ferramentas Utilizadas

A arquitetura do projeto foi projetada seguindo os princípios **SOLID**, visando um código mais **manutenível**, **escalável** e **desacoplado**.

### 🎯 Princípios SOLID:

- **S** – *Single Responsibility Principle* (Princípio da Responsabilidade Única): Cada classe ou módulo deve ter apenas uma razão para mudar, ou seja, uma única responsabilidade.

- **O** – *Open/Closed Principle* (Princípio Aberto/Fechado): Os módulos devem estar abertos para extensão, mas fechados para modificação.

- **L** – *Liskov Substitution Principle* (Princípio da Substituição de Liskov): Subtipos devem ser substituíveis por seus tipos base sem alterar o comportamento do programa.

- **I** – *Interface Segregation Principle* (Princípio da Segregação de Interface): Interfaces devem ser específicas para o uso que elas terão, evitando interfaces inchadas.

- **D** – *Dependency Inversion Principle* (Princípio da Inversão de Dependência): Os módulos de alto nível não devem depender de módulos de baixo nível, mas sim de abstrações.

Essa abordagem ajuda a manter a aplicação flexível e menos propensa a quebras conforme cresce.

---

## 1. Componentes de Forms

Os formulários são uma parte crítica e complexa do sistema, exigindo camadas de validação e gerenciamento de estado bem estruturadas.

### 📚 Bibliotecas utilizadas:

#### 🔹 vee-validate

- Biblioteca principal para gerenciar o estado dos formulários. Controla o rastreamento de valores, UX (como mostrar erros) e validações assíncronas.
- Suporte direto ao **Vuetify**, integrando bem com seus componentes como `v-text-field` e `v-select`.

🔗 **Documentação:** [Form component — Vuetify](https://vuetifyjs.com/en/components/forms/)

#### 🔹 Zod

- Usado para criar os esquemas de validação.
- Define regras complexas de validação de maneira clara e tipada, integrando diretamente ao **vee-validate**.

🔗 **Documentação:** [Zod | Documentation](https://zod.dev/)

#### 🔹 VueQuery

- Gerencia o estado dos formulários de maneira otimizada, lidando com caching, sincronização de dados e reatividade.
- Excelente para operações **CRUD** e integração com **APIs**.

🔗 **Documentação:** [Overview](https://tanstack.com/query/v4/docs/overview)

#### 🔹 Pinia

- Usado para gerenciamento global de estado, compartilhando dados entre diferentes componentes e módulos.
- Substitui o **Vuex** e é mais simples e performático.

🔗 **Documentação:** [Pinia | The intuitive store for Vue.js](https://pinia.vuejs.org/)

---

## 2. Modularização

A arquitetura do projeto é **modularizada**, onde cada funcionalidade fica encapsulada em seu próprio módulo.

👉 **Objetivo da modularização:**

- **Separação clara de responsabilidades**
- **Reutilização de código**
- **Facilidade de manutenção e expansão**

---

## Injeção da API nos módulos

Para integrar a API global com os módulos, utilizamos o padrão **Dependency Injection** com `provide` e `inject` do Vue.

### 🛠️ Provide

A API global é fornecida na raiz da aplicação (normalmente no `App.vue` ou no layout principal).

```vue
<script setup>
import { provide } from 'vue'
import { apiProvider } from '@/global/apiProvider'

provide('api', apiProvider)
</script>
```

### 🛠️ Inject

Cada módulo recebe a API através da injeção, permitindo que os services de cada módulo sejam desacoplados da implementação da API em si.

```vue
<script setup>
import { inject } from 'vue'

const api = inject('api')

const fetchData = async () => {
  const response = await api.get('/projetos')
  console.info(response.data)
}
</script>
```

---

### 🔹 Vantagens da abordagem:

- **Facilidade de teste:** Módulos podem ser testados com mocks de API.
- **Reuso:** A mesma API global pode ser compartilhada entre diversos módulos sem reescrever código.
- **Desacoplamento:** Se a API mudar, basta modificar o provider — sem alterar todos os módulos.


