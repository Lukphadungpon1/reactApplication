/// MENU List

type MyItemsub = {
  id: number;
  title: string;
  path: string;
  icon: string;
};

type MyItem = {
  id: number;
  title: string;
  path: string;
  icon: string;
  submenu: MyItemsub[];
};
export const MenuSale: MyItem[] = [
  {
    id: 1,
    title: "SaleOrder",
    path: "",
    icon: "shopping_basket",
    submenu: [
      {
        id: 11,
        title: "New Order",
        path: "/saleOrder",
        icon: "edit_note",
      },
      {
        id: 12,
        title: "Order List ",
        path: "/SaleOrderList",
        icon: "list_alt",
      },
      // {
      //   id: 13,
      //   title: "CV To SaP",
      //   path: "/socvtosap",
      //   icon: "cloud_upload",
      // },
    ],
  },
];

export const MenuAllocate: MyItem[] = [
  {
    id: 2,
    title: "Allocate Lot",
    path: "",
    icon: "dynamic_form",
    submenu: [
      {
        id: 21,
        title: "Allocate",
        path: "/allocateLot",
        icon: "rebase_edit",
      },
      {
        id: 22,
        title: "Lot List",
        path: "/lotList",
        icon: "list_alt",
      },
      {
        id: 23,
        title: "Gen MC/PD",
        path: "/generateMC",
        icon: "qr_code_scanner",
      },
      {
        id: 24,
        title: "Production Order List",
        path: "/pdList",
        icon: "view_list",
      },
    ],
  },
];

export const MenuReqIssueMat: MyItem[] = [
  {
    id: 3,
    title: "Request Material",
    path: "",
    icon: "trolley",
    submenu: [
      {
        id: 31,
        title: "Request",
        path: "/requestIssue",
        icon: "shopping_cart_checkout",
      },
      {
        id: 32,
        title: "Approve",
        path: "/issueMT",
        icon: "approval",
      },
      {
        id: 33,
        title: "Request MT List",
        path: "/issueList",
        icon: "list_alt",
      },
    ],
  },
];

export const MenuIssueMat: MyItem[] = [
  {
    id: 4,
    title: "Issue Material",
    path: "",
    icon: "factory",
    submenu: [
      {
        id: 41,
        title: "Picking",
        path: "/requestIssue",
        icon: "local_shipping",
      },
      {
        id: 42,
        title: "Issue MT",
        path: "/issueMT",
        icon: "inventory_2",
      },
      {
        id: 43,
        title: "Issue List",
        path: "/issueList",
        icon: "list_alt",
      },
      {
        id: 44,
        title: "Match MT & DP",
        path: "/matchMTandDP",
        icon: "join_inner",
      },
    ],
  },
];
