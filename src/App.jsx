import './assets/scss/index.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-modern-drawer/dist/index.css'
import RoutesMain from './routes/routes';
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from './context/themeContext';
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
     <ThemeProvider>
      <RoutesMain/>
      </ThemeProvider>
    </>
  )
}

export default App
