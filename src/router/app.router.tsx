import { createBrowserRouter } from "react-router";
import { HomePage } from "../pages/home/HomePage";
import { PokemonPage } from "../pages/pokemon/PokemonPage";
import { FavoritesPage } from "../pages/favorites/FavoritesPage";

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/pokemon/:id',
        element: <PokemonPage />,
    },
    {
        path: '/favorites',
        element: <FavoritesPage />,
    }
])