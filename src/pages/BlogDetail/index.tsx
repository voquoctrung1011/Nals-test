import React, { Suspense, lazy } from "react";

import AppLoading from "../../layouts/AppLoading";

const BlogDetail = lazy(() => import("../../components/BlogDetail"));

const BlogDetailComponent = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <BlogDetail />
    </Suspense>
  );
};

export default BlogDetailComponent;
