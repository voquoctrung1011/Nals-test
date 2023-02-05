import React, { Suspense, lazy } from "react";

import AppLoading from "../../layouts/AppLoading";

const Blog = lazy(() => import("../../components/Blog"));

const BlogComponent = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <Blog />
    </Suspense>
  );
};

export default BlogComponent;
