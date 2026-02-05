import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./globals.css";
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./globals.css";
import Error from './routes/Pages/Error';
import Home from './routes/Pages/Home';
import Sobre from './routes/PagesRodape/Sobre';
import Presenca from './routes/Pages/Presenca';
import Presentes from './routes/Pages/Presentes';
import Recados from './routes/Pages/Recados';
import Convites from './routes/Pages/Convites';
import Convidados from './routes/Pages/Convidados';

const router = createBrowserRouter([
    {path: "/", element: <App/>, errorElement: <Error/>, children: [
        {path: "/", element:<Home/>},
        {path: "/sobre", element:<Sobre/>},
        {path: "/presenca", element:<Presenca/>},
        {path: "/lista_presentes", element:<Presentes/>},
        {path: "/mural_recados", element:<Recados/>},
        {path: "/convites", element:<Convites/>},
        {path: "/convidados/:idConvite", element:<Convidados/>}
    ]},
], {basename: import.meta.env.VITE_BASE_URL});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)