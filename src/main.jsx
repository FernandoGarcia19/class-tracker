import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BrowseAula from './components/BrowseAula.jsx'
import Aula from './components/Aula.jsx'

import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { DataProvider } from './context/DataContext.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/browse-aula", element: <BrowseAula />},
  {path: "/aula/:aula", element: <Aula/>,}
])
  

createRoot(document.getElementById('root')).render(
  <DataProvider>
    <RouterProvider router={router}/>
  </DataProvider> 
)
