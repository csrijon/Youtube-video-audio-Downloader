import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import AudioDownloader from './components/AudioDownloader'
import VideoDownloader from './components/VideoDownloader'
import { RouterProvider ,createBrowserRouter } from 'react-router'
import './App.css'

function App() {

  const router = createBrowserRouter ([
    {
      path: "/",
      element: <><Navbar/><Home/><Footer/></>
    },
    {
      path: "/Music",
      element : <><Navbar/><AudioDownloader/><Footer/></>
    },
    {
      path: "/Video",
      element: <><Navbar/><VideoDownloader/><Footer/></>
    }
  ])

  return (
    <>
     < RouterProvider router={ router}/>
    </>
  )
}

export default App
