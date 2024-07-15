import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Platform from '../pages/Platform/Platform';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "platforms/:key",
    element: <Platform />
  }
]);

const Router: React.FC = () => {

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

export default Router;