/** Conteúdo dos projetos, cenas e textos do portfólio. */
export const projects = {
  norte: {
    name: 'Linha Norte',
    type: 'SITE INSTITUCIONAL',
    line: 'Espaços para viver.',
    url: 'demos/linha-norte.html',
    goal: 'Apresentar meu negócio',
    action: 'Visitar o site',
    scenes: [
      {
        tab: 'Interior',
        image: 'norte.webp',
        alt: 'Interior de concreto e madeira iluminado pelo pôr do sol',
        label: 'O AMBIENTE',
        title: 'Casa de luz',
        description:
          'Concreto, madeira e luz natural contam a história do projeto. O layout dá espaço para cada imagem e mantém a navegação à mão.',
      },
      {
        tab: 'Fachada',
        image: 'norte-fachada.webp',
        alt: 'Casa contemporânea com concreto, madeira e piscina',
        label: 'A ARQUITETURA',
        title: 'A casa na paisagem',
        description:
          'A imagem de fachada revela o espaço inteiro. Na galeria do site, essa vista ajuda o visitante a entender a relação da casa com o terreno.',
      },
      {
        tab: 'Detalhes',
        image: 'norte-detalhes.webp',
        alt: 'Corredor com arcos de concreto, sombras e uma árvore',
        label: 'OS MATERIAIS',
        title: 'Entre luz e sombra',
        description:
          'A galeria aproxima o visitante das texturas e dos recortes de luz. Cada vista tem texto e navegação próprios, inclusive na versão para celular.',
      },
    ],
  },
  brasa: {
    name: 'Brasa & Pão',
    type: 'CARDÁPIO DIGITAL',
    line: 'Na brasa. De verdade.',
    url: 'demos/brasa-e-pao.html',
    goal: 'Receber pedidos pelo WhatsApp',
    action: 'Montar um pedido',
    start: '#itens',
    scenes: [
      {
        tab: 'Cardápio',
        image: 'brasa.webp',
        alt: 'Hambúrguer artesanal com dois discos de carne e cheddar',
        label: 'O CARDÁPIO',
        title: 'O pedido começa pela vontade.',
        description:
          'O cardápio coloca o produto em primeiro plano. A pessoa escolhe o lanche e os acompanhamentos e pode ajustar o pedido antes de fechar.',
      },
      {
        tab: 'Carrinho',
        image: 'brasa.webp',
        alt: 'Hambúrguer artesanal com cheddar e pão tostado',
        label: 'A REVISÃO',
        title: 'Tudo na conta.',
        sample: ['1× Duplo da Casa · 1× Batata', 'Total do pedido  •  R$ 49,80'],
        description:
          'O carrinho soma os itens na hora. Dá para aumentar ou reduzir a quantidade e conferir o total antes de preparar a mensagem.',
      },
      {
        tab: 'WhatsApp',
        image: 'brasa.webp',
        alt: 'Hambúrguer artesanal do cardápio de demonstração',
        label: 'O PEDIDO',
        title: 'Mensagem pronta para enviar.',
        sample: ['Mensagem para WhatsApp', 'Olá! Gostaria de fazer um pedido…'],
        description:
          'O site prepara uma mensagem com os itens, as quantidades e o total. Na demo, você pode copiar o texto ou abrir o WhatsApp e escolher o destinatário.',
      },
    ],
  },
  orla: {
    name: 'Orla',
    type: 'LOJA COM CHECKOUT',
    line: 'O cuidado de todo dia.',
    url: 'demos/orla.html',
    goal: 'Vender com pagamento online',
    action: 'Experimentar a loja',
    start: '#itens',
    scenes: [
      {
        tab: 'Vitrine',
        image: 'orla.webp',
        alt: 'Frasco verde de cosmético sobre pedra natural',
        label: 'A VITRINE',
        title: 'A marca em primeiro plano.',
        description:
          'Cores, fotografia e tipografia apresentam a coleção. O visitante pode explorar os produtos e montar a sacola ali mesmo.',
      },
      {
        tab: 'Sacola',
        image: 'orla.webp',
        alt: 'Frasco de sérum da coleção Orla',
        label: 'A SACOLA',
        title: 'Escolha, revise, avance.',
        sample: ['Sérum Maré  ×  1', 'Total da sacola  •  R$ 79,00'],
        description:
          'A sacola mostra o preço e a quantidade de cada produto. Você pode revisar tudo antes de seguir para o checkout.',
      },
      {
        tab: 'Checkout',
        image: 'orla.webp',
        alt: 'Cosmético da vitrine de demonstração',
        label: 'O PAGAMENTO',
        title: 'Pix ou cartão, em teste.',
        sample: ['Forma de pagamento', 'Pix  /  Cartão'],
        description:
          'Escolha como pagar e veja a confirmação do pedido. O checkout é simulado e não solicita informações financeiras.',
      },
    ],
  },
};

/** Galeria da demonstração de arquitetura. */
export const architectureViews = [
  {
    file: 'norte.webp',
    alt: 'Interior com paredes de concreto e luz natural',
    caption: 'Luz natural nos ambientes internos.',
  },
  {
    file: 'norte-fachada.webp',
    alt: 'Fachada em concreto e madeira com piscina',
    caption: 'A fachada se abre para a paisagem.',
  },
  {
    file: 'norte-detalhes.webp',
    alt: 'Arcos de concreto, uma árvore e sombras projetadas',
    caption: 'As sombras revelam o ritmo dos arcos.',
  },
];
