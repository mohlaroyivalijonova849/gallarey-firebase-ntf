import Home from "./page/Home";
import SingleCard from "./page/SingleCard";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import CardsLayout from "./layout/CardsLayout";
import Login from "./page/Login";
import LikedPhotos from "./components/LikedPhotos";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebase/firebaseConfig";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { userSetting } from "./features/gallareySlice";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <MainLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Home />} />
          <Route path="cards" element={<CardsLayout />}>
            <Route path=":id" element={<SingleCard />} />
            <Route path="likedPhotos" element={<LikedPhotos />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
      </Route>
    )
  );
  const dispatch = useDispatch();
  // const  useSelector
  useEffect(() => {
    onAuthStateChanged(auth, (info) => {
      dispatch(userSetting(info));
    });
  }, []);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
