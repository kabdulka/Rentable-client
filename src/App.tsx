import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import './App.scss'
import axios from 'axios';
import UserPage from './pages/UserPage/UserPage';
import AddListing from './pages/AddListing/AddListing';
import Watchlist from './pages/Watchlist/Watchlist';
import ViewListings from "./pages/ViewListings/ViewListings";

export interface UserType {
  avatar_url: string
  email: string
  id: number | null
  password: string
  updated_at: string
  username: string
}

export interface ModalsOpen {
  [key: string] : boolean,
  loginModal: boolean
  registerModal: boolean
}

function App() {

  const [isUserAuthorized, setIsUserAuthorized] = useState<boolean>(true)
  const [userId, setUserId] = useState<number | null>(null)
  const [isUserLoggedIn, setIsUserLogginIn] = useState<boolean>(false)
  const [user, setUser] = useState<UserType | null>(null)

  // used to communicate with the navbar to let the login modal know where to
  // navigate to upon succcessful user sign in
  const [navigateTo, setNavigateTo] = useState<string>("")

  const ref = useRef<HTMLInputElement>();
  // useState for login and register modals
  const [modalsOpen, setModalsOpen] = useState<ModalsOpen>({
    loginModal: false,
    registerModal: false
  })

  // useEffect(() => {
  //   setModalsOpen({
  //     loginModal: false,
  //     registerModal: false
  //   })
  // }, [])
  useEffect(() => {
    // const checkIfClickedOutside = (event: Event, target: string) => {
    //   // If the menu is open and the clicked target is not within the menu,
    //   // then close the menu
    //   if (modalsOpen[target] && ref.current && !ref.current.contains(event.target as Node)) {
    //     // setIsMenuOpen(false)
    //     setModalsOpen({
    //       ...modalsOpen, [target]: !modalsOpen[target]
    //     })
    //   }
    //   document.addEventListener("mousedown", () => {
    //     checkIfClickedOutside(event, "loginModal")
    //   })
    // }
  }, [modalsOpen])

  const handleModalChange = (modal: string): void => {
        // setModalsOpen({
        //   ...modalsOpen, [modal]: !modalsOpen[modal]
        // })
        if (modal === "login") {

          setModalsOpen({
            loginModal: true,
            registerModal: false
          })

        } else if (modal === "register") {
          setModalsOpen({
            loginModal: false,
            registerModal: true
          })
        } else {
          setModalsOpen({
            loginModal: false,
            registerModal: false
          })
        }
  }

  const baseUrl: string = `http://localhost:8090`;
  let endpoint: string = `users/${userId}`
  let getUserUrl: string = `${baseUrl}/${endpoint}`;

  useEffect(() => {
    // if localstorage has a user id then retrieve it
    const userId = localStorage.getItem("userId")
    if (userId) {
      setUserId(parseInt(userId))
      // console.log(userId)
      endpoint = `users/${userId}`
      getUserUrl = `${baseUrl}/${endpoint}`;
   
    } else {
      setIsUserAuthorized(false)
    }
    console.log(localStorage)
  }, [])


  useEffect(() => {
    getUser()
  }, [isUserAuthorized])

  const getUser = async () => {
    try  {
      console.log("here")
      const token = localStorage.getItem("authenticationToken");
      
      const headers = {
        Authorization: `Bearer ${token}`,
      }; 
      console.log("redender here")
      console.log(localStorage.getItem("userId"))
      console.log(getUserUrl)
      const response = await axios.get(getUserUrl, {
        headers: headers
      })
      setUser(response.data)
      console.log("User here")
      console.log(response.data)
    } catch (err) {

    }

  }

  const handleLogout = (): void => {
    console.log("hehrehrehrherhe")
    localStorage.removeItem("authenticationToken")
    localStorage.removeItem("userId")
    localStorage.clear()
    setIsUserAuthorized(false)
    setUserId(null)
    console.log(localStorage)
    setUser(null)
    // setUserId()
  }

  return (

    <div className='app'>

      <BrowserRouter>
        <Navbar 
          setIsUserAuthorized={setIsUserAuthorized}
          isUserAuthorized={isUserAuthorized}
          userId={userId}
          handleLogout={handleLogout}
          username={user?.username!}
          handleModalChange={handleModalChange}
          setNavigateTo={setNavigateTo}
        />
        {
          (modalsOpen.loginModal === true && isUserAuthorized === false) && <Login 
                      setUserId={setUserId} 
                      setAuthorizedUser={setIsUserAuthorized}
                      handleModalChange={handleModalChange}
                      modalsOpen={modalsOpen}
                      navigateTo={navigateTo}
                    />

                  }
        {
          modalsOpen.registerModal === true && 
            <Register  
              handleModalChange={handleModalChange}
              modalsOpen={modalsOpen}
              setModalsOpen={setModalsOpen}
            />
        }
          <Routes>
            <Route path="/" element={<Home username={user?.username!}/>}/>
            <Route 
              path="/add" 
              element={
                <AddListing />}
              />
               <Route 
              path="/watchlist" 
              element={
                < Watchlist/>}
              />
            <Route 
              path="/userProfile" 
              element={<UserPage user={user} isUserAuthorized={isUserAuthorized}/>}/>
            <Route 
              path="/viewAll" 
              element={<ViewListings />}/>
          
          </Routes>
      </BrowserRouter>

    
    </div>

  )
}

export default App
