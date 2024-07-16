import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Platform from '../pages/Platform/Platform';
import SystemGames from '../pages/SystemGames/SystemGames';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "platforms/:platformKey",
    element: <Platform />,
    children: [

    ]
  },
  {
    path: "platforms/:platformKey/:systemKey",
    element: <SystemGames/>
  }
]);

const Router: React.FC = () => {

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

export default Router;