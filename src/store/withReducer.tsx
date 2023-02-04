import { injectReducer } from "./index";

const withReducer = (key: any, reducer: any) => (WrappedComponent: any) => {
  injectReducer(key, reducer);

  return (props: JSX.IntrinsicAttributes) => <WrappedComponent {...props} />;
};

export default withReducer;
