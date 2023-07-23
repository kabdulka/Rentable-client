
import "./Navbar.scss"
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {AiOutlineClose} from "react-icons/ai"
import {RxHamburgerMenu} from "react-icons/Rx";
// import { ModalsOpen } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";



interface NavbarProps {
    setIsUserAuthorized: (isUserAuth: boolean) => void
    isUserAuthorized: boolean
    userId: number | null
    handleLogout: () => void
    username: string
    handleModalChange: (modal: string) => void
    setNavigateTo: (navigateTo: string) => void
}

const Navbar = ({setIsUserAuthorized, username, isUserAuthorized, userId, handleLogout, handleModalChange, setNavigateTo}: NavbarProps) => {

    console.log(username)
    console.log(isUserAuthorized)
    console.log(userId)

    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname)

    const [toggleMobile, setToggleMobile] = useState<boolean>(false)

    const getActiveLink = (path: string) => {
    
        if (location.pathname === path) {
            return `navbar__link--active`;
        } else {
            return ""
        }
        // location.pathname === path ? `navbar__link--active` : "" ;
    }

    const handleClick = (): void => {
        setToggleMobile(prev => !prev)
        // console.log(toggleMobile)
    }

    const handleNavClick =  (navigateTo: string):void => {
        // if user is not authorized display login
        if (!isUserAuthorized) {
            handleModalChange("login") 
            setNavigateTo(navigateTo)
        } else {
            navigate(navigateTo)
        }
        
    }

    useEffect(() => {
        setToggleMobile(false)
    }, [location])

    return (

        <>
            <header className="header">

                <nav className={`navbar ${toggleMobile ? "navbar--mobile" : ""}`}>
                    <div className={ `${toggleMobile ? "navbar__mobile-buttons" : "navbar__mobile-buttons"} `}>

                        <button 
                            className={`${toggleMobile === true ? "navbar__button--clicked" : "navbar__button"}`}
                            onClick={handleClick}
                        >
                            <RxHamburgerMenu />
                        </button>

                        <button 
                            className={`${toggleMobile === false ? "navbar__button--clicked" : "navbar__button"}`}
                            onClick={handleClick}
                        >
                            <AiOutlineClose  style={{color: "white"}}/>
                        </button>
                    </div>
                    <div className={`navbar__list ${toggleMobile === true? "navbar__list--mobile" : ""}`}>
                        <div className="navbar__list--left">

                            <div className="navbar__item">
                                <div className={`navbar__link ${getActiveLink("/")}`}
                                    onClick={() => {
                                        handleNavClick("/")
                                    }}
                                >
                                    Home
                                </div>
                            </div>
                            {/* <li className="navbar__item">
                                <div className="navbar__link" 
                                    onClick={() => {
                                        navigate("/viewAll")
                                    }}
                                >
                                    view All
                                </div>
                            </li> */}
                            <div className="navbar__item">
                                <div className={`navbar__link ${getActiveLink("/viewAll")}`}
                                    onClick={() => {
                                        navigate("/viewAll")
                                    }}
                                >
                                    View Listings
                                </div>
                            </div>
                            <div className="navbar__item">
                            <div className={`navbar__link ${getActiveLink("/add")}`}
                                    onClick={() => {
                                        handleNavClick("/add")
                                    }}
                                >
                                    Add a listing
                                </div>
                            </div>
                            <div className="navbar__item">
                            <div className={`navbar__link ${getActiveLink("/watchlist")}`}
                                    onClick={
                                        () => {
                                            // if user is not authorized display login
                                            handleNavClick("/watchlist")
                                        }
                                    }
                                >
                                    Watchlist
                                </div>
                            </div>
                        </div>
                        <div className="navbar__list--right">
                            <div className={`${isUserAuthorized ? "navbar__item" : "navbar__item--invisible"}`}>
                                <div className={`navbar__link ${getActiveLink("/profile")}`}
                                    onClick={() => {
                                        handleNavClick("/")
                                    }}
                                >
                                    Profile
                                </div>
                            </div>
                            <div 
                                className={`${isUserAuthorized === false ? "navbar__item" : "navbar__item--invisible"}  navbar__link--sign`}
                                onClick={() => {handleModalChange("login")}}
                            >
                                <div className="navbar__item--login">

                                    Login
                                </div>
                            </div>
                            
                            <div className= {`${isUserAuthorized ? "navbar__item" : "navbar__item--invisible"} navbar__link--sign`} 
                                onClick={() => {
                                    handleModalChange("close")
                                    handleLogout()
                                }}>
                                <div className="navbar__item--logout" 
                                    onClick={() => {
                                        navigate("/")
                                    }}
                                >
                                    Logout
                                </div>
                            </div>
                           
                        </div>
                       
                    </div>



                </nav>

            </header>
        </>
    );
}

export default Navbar;

