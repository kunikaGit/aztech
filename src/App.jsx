import './assets/scss/index.scss'
import RoutesMain from './routes/routes';
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
     <Toaster position="top-right" reverseOrder={true} />
      <RoutesMain/>
    </>
  )
}

export default App
