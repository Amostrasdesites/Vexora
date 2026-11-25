# VEXORA

Código completo e organizado do site em HTML, CSS e JavaScript. O site funciona sem etapa de build e sem dependências de execução. Os scripts usam módulos nativos do navegador.

## Começar

1. Extraia o ZIP em uma pasta vazia.
2. Abra a pasta inteira no VS Code.
3. Execute `python -m http.server 8000` no terminal. No Windows, também pode usar `py -m http.server 8000`.
4. Acesse `http://localhost:8000` no navegador.

Use um servidor local para testar os módulos JavaScript. Abrir o HTML com duplo clique pode impedir seu carregamento.

## Onde editar

| O que deseja mudar                          | Arquivo ou pasta                    |
| ------------------------------------------- | ----------------------------------- |
| Textos e estrutura da página principal      | `index.html`                        |
| WhatsApp e número exibido                   | `assets/js/config/site.js`          |
| Planos, preços, mensalidades e recursos     | `assets/js/data/plans.js`           |
| Projetos, cenas e textos do portfólio       | `assets/js/data/projects.js`        |
| Produtos das demos atuais                   | `assets/js/data/products.js`        |
| Catálogos das demos antigas                 | `assets/js/data/legacy-products.js` |
| Cores e fontes da VEXORA                    | `assets/css/tokens.css`             |
| Estrutura e componentes da página principal | `assets/css/base.css`               |
| Aparência do portfólio e da prévia          | `assets/css/showcase.css`           |
| Acabamentos da identidade visual            | `assets/css/theme.css`              |
| Aparência das páginas legais                | `assets/css/legal.css`              |
| Aparência das demonstrações atuais          | `assets/css/demos.css`              |
| Logo, ícones e fotografias                  | `assets/images/`                    |
| Política de privacidade                     | `privacidade.html`                  |
| Condições de contratação                    | `termos.html`                       |
| Atendimento e identificação                 | `atendimento.html`                  |

Os preços da página principal e da tabela das condições são montados a partir do mesmo arquivo de dados. Os totais anuais são calculados automaticamente.

## Organização

- `assets/css/`: folhas de estilo com regras em linhas e blocos legíveis.
- `assets/js/config/`: configuração comercial.
- `assets/js/data/`: conteúdo editável, separado dos comportamentos.
- `assets/js/components/`: planos, orçamento, contato, portfólio e animações.
- `assets/js/demos/`: comportamentos das demonstrações atuais.
- `assets/js/shared/`: formatação compartilhada.
- `assets/css/legacy/` e `assets/js/legacy/`: estilos e comportamentos antigos preservados e identificados.
- `demos/`: páginas dos sites de exemplo, nos endereços anteriores.
- `docs/`: guias de manutenção e de substituição da estrutura anterior.

Veja `docs/MANUTENCAO.md` para orientações de edição e `docs/ATUALIZACAO.md` para publicar esta reorganização.

## Formatação consistente

Os arquivos têm indentação de dois espaços e configuração para o editor. A formatação é uma ferramenta opcional de desenvolvimento.

Para usar a mesma formatação, execute `npm install` e depois `npm run format`. Para verificar, use `npm run format:check`. A hospedagem não precisa instalar esses pacotes nem executar esses comandos.

## Publicação e operação

Envie o conteúdo desta pasta à raiz publicada do projeto, com `index.html` na raiz e as pastas `assets/` e `demos/` preservadas. O site pode ser servido por uma hospedagem estática. A escolha ou a configuração de uma hospedagem não faz parte deste arquivo ZIP.

O formulário monta o resumo no navegador e permite enviá-lo ao WhatsApp. Os checkouts das demonstrações continuam simulados. Nenhuma integração bancária, banco de dados, login ou serviço de servidor foi acrescentado nesta reorganização.

A política de privacidade descreve, de forma geral, os registros técnicos da infraestrutura de hospedagem. Confirme os dados tratados pelo provedor escolhido e mantenha esse aviso atualizado. Registro de domínio e hospedagem são procedimentos independentes.

A identificação civil ou empresarial, o cadastro aplicável, o endereço e o e-mail do prestador continuam pendentes de complemento nas páginas legais. Não foram inventados dados de empresa nem declarada a conclusão de um registro de marca.

## Domínios dos clientes

A VEXORA cuida da pesquisa, do registro e da configuração de domínios .br pelo Registro.br. A escolha considera disponibilidade, compatibilidade com a marca, facilidade de uso e orçamento, com aprovação do cliente. O domínio fica no CPF ou CNPJ do cliente, com acesso sob seu controle. Registro e renovação são pagos pelo cliente, conforme a proposta. O registro de marca no INPI é um procedimento distinto.
