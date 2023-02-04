import Blog from "./Blog";
import BlogDetail from "./BlogDetail";

const PagesConfigs = [
  {
    routes: [
      {
        path: "/blog",
        component: Blog,
        auth: ["guest", "user"],
        settings: {
          layout: {
            head: true,
          },
        },
      },
      {
        path: "/blog/:id",
        component: BlogDetail,
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
