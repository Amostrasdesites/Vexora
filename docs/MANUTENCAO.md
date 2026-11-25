# Manutenção do projeto

## Textos e seções

As páginas HTML estão indentadas e divididas por comentários. Edite o texto dentro das seções correspondentes. Os nomes das classes e os atributos `id` e `data-*` conectam o HTML aos estilos e aos comportamentos. Preserve esses nomes ao trocar apenas o conteúdo.

As páginas legais permanecem em `privacidade.html`, `termos.html` e `atendimento.html`. Complete a identificação do responsável com dados reais. Uma reorganização de código não substitui a revisão dos contratos e das informações publicadas.

## Planos e preços

Edite `assets/js/data/plans.js`. Cada plano possui nome, descrição, preço de criação (`priceCents`), mensalidade (`monthlyCents`), destaques e itens de manutenção.

Os valores são números inteiros em centavos. Por exemplo, `44990` representa R$ 449,90. O total do primeiro ano é calculado como criação mais doze mensalidades. A tabela das condições de contratação usa os mesmos dados.

A lista `comparison` define as linhas da tabela comparativa. Mantenha a ordem das colunas correspondente à ordem dos planos.

## Contato

Edite `assets/js/config/site.js`. `whatsapp` recebe apenas dígitos com DDI e DDD; `whatsappDisplay` recebe a versão legível. Os links identificados por `data-contact` são atualizados pelo módulo de contato.

Há textos de contato no HTML como conteúdo inicial antes de o JavaScript carregar. Se quiser manter esse conteúdo inicial sincronizado, procure o número anterior nas quatro páginas principais e substitua-o também.

## Portfólio

Edite `assets/js/data/projects.js`. Cada projeto tem nome, categoria, frase, endereço da demo, objetivo de orçamento e cenas. As cenas possuem imagem, descrição e textos próprios. O arquivo também contém as vistas da galeria Linha Norte.

Guarde as imagens em `assets/images/`. Use o nome do arquivo no campo `image` ou `file` correspondente. Preserve os caminhos das demos, ou atualize as referências quando criar outros endereços.

## Catálogos e carrinhos

As demos atuais usam `assets/js/data/products.js`. As antigas usam `assets/js/data/legacy-products.js`. Os preços estão em centavos. As quantidades são mantidas na memória da página e são descartadas quando ela é recarregada.

Os pagamentos são simulados. Uma loja real precisa de implementação própria para preços e estoque no servidor, autenticação quando aplicável e confirmação efetiva de pagamento.

## Estilos

A página principal carrega, nesta ordem, tokens, base, portfólio, tema e estilos legais. A ordem conserva os ajustes de aparência da versão anterior. Comece por `tokens.css` para cores e fontes, e depois use o arquivo referente ao componente que deseja alterar.

As demos atuais têm uma folha própria em `assets/css/demos.css`. As antigas usam `assets/css/legacy/demos.css`. Os arquivos com `original` no nome são históricos e não são carregados pela página principal.

## Comportamentos

`assets/js/main.js` inicializa os componentes da página principal. `assets/js/legal.js` sincroniza contatos e preços nas páginas legais. Cada módulo em `components` responde por um grupo de funções: planos, orçamento, contato, portfólio ou animações.

Os módulos das demos ficam em `assets/js/demos/`. O diretório `shared` reúne a formatação de valores e a conversão de texto usada nos modelos HTML.

## Conferir depois de editar

Abra o site pelo servidor local. Verifique o plano selecionado no orçamento, o envio pelo WhatsApp, a navegação entre projetos e cenas, a prévia em desktop e celular e os carrinhos das demonstrações. Ao mudar preços, confira também a tabela das condições de contratação.
