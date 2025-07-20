import './assets/scss/index.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-modern-drawer/dist/index.css'
import RoutesMain from './routes/routes';
import { Toaster } from "react-hot-toast";
import { useEffect } from 'react';
function App() {
  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault(); // disables right-click
  //   };

  //   document.addEventListener("contextmenu", handleContextMenu);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  return (
    <>
     <Toaster position="top-right" reverseOrder={true} />
      <RoutesMain/>
    </>
  )
}

export default App
