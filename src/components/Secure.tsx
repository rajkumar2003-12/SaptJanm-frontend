import { Navigate } from 'react-router-dom';

interface SecureRouteProps {
  element: JSX.Element;
}

export const Secure = ({ element }: SecureRouteProps) => {
  const token = localStorage.getItem('authToken'); 

  if (!token) {
    return <Navigate to="/main" replace />;
  }
  return element;
};