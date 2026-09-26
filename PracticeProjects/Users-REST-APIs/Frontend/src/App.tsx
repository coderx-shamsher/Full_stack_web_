import './App.css'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import Home from './pages/Home'
import GetUsers from './pages/GetUsers'
import UpdateUsers from './pages/UpdateUsers'
import RemoveUser from './pages/RemoveUser'
import CreateUsers from './pages/CreateUsers'

const route = createBrowserRouter([
      {
        path : "/",
        element : <><Home/></>,
      },
      {
        path : "/get-users",
        element : <><GetUsers/></>
      },
      {
        path : "/create-user",
        element : <><CreateUsers/></>
      },
      {
        path : "/update-user",
        element : <><UpdateUsers/></>
      },
      {
        path : "/remove-user",
        element : <><RemoveUser/></>
      },
]) 

function App() {

  return (
    <>
     <RouterProvider router={route} />
    </>
  )
}

export default App
