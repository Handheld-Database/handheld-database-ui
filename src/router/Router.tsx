import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: []
  }
]);

const Router: React.FC = () => {

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

export default Router;