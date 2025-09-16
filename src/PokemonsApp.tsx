import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";

export const PokemonsApp = () => {
  return (
    <>
        <RouterProvider router= {appRouter} />
    </>
  )
}
