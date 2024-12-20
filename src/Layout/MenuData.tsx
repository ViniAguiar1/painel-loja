const menuItems = [
  {
    label: "MENU PRINCIPAL",
    type: "HEADER",
  },
  {
    type: "HASHMENU",
    id: "dashboard",
    label: "Dashboard",
    icon: "ph-duotone ph-chart-donut",
    link: "/",
  },
  {
    type: "HASHMENU",
    id: "pedidos",
    label: "Pedidos",
    icon: "ph-duotone ph-shopping-cart",
    link: "/pedidos",
  },
  {
    type: "HASHMENU",
    id: "clientes",
    label: "Clientes",
    icon: "ph-duotone ph-users",
    link: "/clientes",
  },
  {
    type: "HASHMENU",
    id: "staff",
    label: "Staff",
    icon: "ph-duotone ph-users",
    link: "/staff",
  },
  {
    type: "HASHMENU",
    id: "truck",
    label: "Envios",
    icon: "ph-duotone ph-truck",
    link: "/envios",
},
  {
    label: "PRODUTOS",
    type: "HEADER",
  },
  // {
  //   type: "HASHMENU",
  //   id: "adicionar-produto",
  //   label: "Adicionar Produto",
  //   icon: "ph-duotone ph-plus-circle",
  //   link: "/add-product",
  // },
  {
    type: "HASHMENU",
    id: "lista-produtos",
    label: "Lista de Produtos",
    icon: "ph-duotone ph-package",
    link: "/produtos",
  },
  {
    type: "HASHMENU",
    id: "categorias-produto",
    label: "Categorias de Produto",
    icon: "ph-duotone ph-cards",
    link: "/categorias",
  },
  {
    type: "HASHMENU",
    id: "frete",
    label: "Frete",
    icon: "ph-duotone ph-truck",
    link: "/fretes",
  },
  {
    label: "ADMINISTRADOR",
    type: "HEADER",
  },
  {
    type: "HASHMENU",
    id: "controle-usuarios",
    label: "Controle de Usuários",
    icon: "ph-duotone ph-user-circle",
    link: "/usuarios",
  },
  {
    type: "HASHMENU",
    id: "links",
    label: "Links",
    icon: "ph-duotone ph-link",
    link: "/links",
  },
  {
    type: "HASHMENU",
    id: "despesas",
    label: "Despesas",
    icon: "ph-duotone ph-currency-dollar",
    link: "/despesas",
  },
  {
    type: "HASHMENU",
    id: "saidas",
    label: "Saídas",
    icon: "ph-duotone ph-arrow-circle-down",
    link: "/saidas",
  },
  {
    type: "HASHMENU",
    id: "avisos",
    label: "Avisos",
    icon: "ph-duotone ph-bell",
    link: "/avisos",
  },
  {
    type: "HASHMENU",
    id: "cupom",
    label: "Cupom",
    icon: "ph-duotone ph-tag",
    link: "/cupom",
  },
  {
    type: "HASHMENU",
    id: "configuracoes",
    label: "Configurações",
    icon: "ph-duotone ph-gear",
    link: "/configuracoes",
  },
];

const menuFuncionarios = [
  {
    type: "HASHMENU",
    id: "separacao-pedidos",
    label: "Separação de Pedidos",
    icon: "ph-duotone ph-list",
    link: "/separacao-pedidos",
  }
]

export { menuItems, menuFuncionarios };
