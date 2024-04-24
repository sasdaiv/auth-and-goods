import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IPageWrapperProps {
  children: ReactNode;
  isProtectedRoute?: boolean;
}
const PageWrapper: FC<IPageWrapperProps> = (props) => {
  const { children, isProtectedRoute } = props;

  if (isProtectedRoute && !localStorage.getItem("token")) {
    return <Navigate to={"/login"} />;
  }
  return (
    <main style={{ maxWidth: "1200px", marginInline: "auto" }}>{children}</main>
  );
};
PageWrapper.defaultProps = {
  isProtectedRoute: true,
};

export default PageWrapper;
