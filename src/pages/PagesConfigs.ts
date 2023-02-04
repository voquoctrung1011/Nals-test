import Dashboard from "./Dashboard";
const PagesConfigs = [
  {
    routes: [
      {
        path: "/",
        component: Dashboard,
        auth: ["guest", "user"],
        settings: {
          layout: {
            head: true,
          },
        },
      },
    ],
  },
];

export default PagesConfigs;
