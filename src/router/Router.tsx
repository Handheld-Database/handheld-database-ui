import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Platform from '../pages/Platform/Platform';
import SystemGames from '../pages/SystemGames/SystemGames';
import GameDetailsPage from '../pages/GameDetails/GameDetails';
import CollaboratorsPage from '../pages/Collaborators/Collaborators';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "platforms/:platformKey",
    element: <Platform />,
  },
  {
    path: "platforms/:platformKey/:systemKey",
    element: <SystemGames/>
  },
  {
    path: "platforms/:platformKey/:systemKey/:gameKey",
    element: <GameDetailsPage/>
  },
  {
    path: "collaborators",
    element: <CollaboratorsPage/>
  }
]);

const Router: React.FC = () => {

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

export default Router;