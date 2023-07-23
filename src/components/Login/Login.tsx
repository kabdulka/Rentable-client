import axios, { Axios, AxiosError } from "axios";
import "./Login.scss";
import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import loginImage from "../../assets/images/loginpageimg.jpg"
import CloseIcon from '@mui/icons-material/Close';

// delete later
import { ModalsOpen } from "../../App";

export interface FormData {
  email: string;
  password: string;
}

export interface loginError {
  emailErr: boolean,
  passwordErr: boolean
}

interface LoginProps {
    setUserId: (userId: number | null) => void
    setAuthorizedUser: (isAuthorized: boolean) => void
    handleModalChange: (modal: string) => void
    // delete after
    modalsOpen: ModalsOpen
    navigateTo: string
}
 
const Login = ({setUserId, setAuthorizedUser, handleModalChange, modalsOpen, navigateTo}: LoginProps) => {
    // console.log(typeof setUserId)

    const baseUrl: string = `http://localhost:8090`;
    const endpoint: string = "users/login"
    const loginUrl: string = `${baseUrl}/${endpoint}`;

    const [loginError, setLoginError] = useState<loginError>({
      emailErr: false,
      passwordErr: false
    })

    const ref = useRef<HTMLInputElement>(null);

    const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    useEffect(() => {

      const checkIfClickedOutside = (event: Event, target: string) => {
        // If the menu is open and the clicked target is not within the menu,
        // then close the menu
     
        if (modalsOpen.loginModal && ref.current && !ref.current.contains(event.target as Node)) {
          console.log("hereere")
          // setIsMenuOpen(false)
          // setModalsOpen({
          //   ...modalsOpen, [target]: !modalsOpen[target]
          // })
            handleModalChange("close")
            // alert("clicked outside");
        }
      }
        document.addEventListener("mousedown", (event: Event) => {
          checkIfClickedOutside(event, "loginModal")

          return () => {
            document.removeEventListener("mousedown", () => {
              checkIfClickedOutside(event, "loginModal")
            });
          };
        })

    }, [ref])


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formComplete: boolean = true;
    
    let loginInfo: FormData = {
        email: formData.email,
        password: formData.password
    }

    console.log(loginInfo.email, loginInfo.password);
    login(loginInfo)

  };

  const login = async(loginInfo: FormData):Promise<void> => {
    const {email, password} = loginInfo
    const localFormErr: loginError = {
      emailErr: false,
      passwordErr: false
    }

    if (email.length < 3) {
      localFormErr.emailErr = true
    }
    if (password.length < 1) {
      localFormErr.passwordErr = true
    }
    setLoginError(localFormErr);
    console.log(email, password);
    try {
        const response = await axios.post(loginUrl, loginInfo);

        console.log(response.data)
        console.log(response.data.token)
        console.log(response.data.message)
        if (!response.data.message || response.data.message === "invalid") {
            // alert("invalid username/password")
            setInvalidCredentials(true);
            // setLoginError(true)
            return;
        }
        const token = response.data.token;
        const userId = response.data.userId;
        console.log("userId login page", response.data.userId)
       
        localStorage.setItem("authenticationToken", token)
        localStorage.setItem("userId", userId)
        console.log(localStorage.userId)
        setAuthorizedUser(true);
        setUserId(userId);

        setFormData({
            email: "",
            password: ""
        })

        navigate(navigateTo)

    } catch(err) {

    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <section className="login">
      {/* <div className="login-image__container">
        <img src={loginImage} alt="login hero image" className="login-image" />
      </div> */}
        <div className="login__wrapper" ref={ref}>

            <div className="login-header__heading">
              <h3 className="login__header-title"> Login </h3>
              <CloseIcon 
                  className="login-header__close"
                  onClick={() => {handleModalChange("close")}}
              />
            </div>

          <form onSubmit={handleSubmit} className="login-form">
          {
              invalidCredentials === true && 
              <div className="login-invalid">
                invalid email or password
              </div>
            }
            <div className="login-form__container" autoFocus>
              <label htmlFor="email" className={`${loginError.emailErr ? "login-form__label--error" : "login-form__label"}`}>
              
                {
                  loginError.emailErr ? "Please enter a valid email" : "Email*"
                }
                
                {" "}
              </label>
              <div style={{width: "100%"}}>

                <input
                  value={formData.email}
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  className="login-form__input"
                />
              </div>
            </div>

            <div className="login-form__container">
              <label htmlFor="password" className={`${loginError.passwordErr ? "login-form__label--error" : "login-form__label"}`}>
              {
                  loginError.passwordErr ? "Please enter your password" : "Password*"
              }
              </label>
              <div>

                <input
                  value={formData.password}
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  className="login-form__input"
                />
              </div>
            </div>

            <button  className="login-form__submit">SIGN IN</button>
            <div className="login-form__register">
              <p className="login-form__register-text"> Don't have an account? 
                <span 
                  className="login-form__register-btn"
                  onClick={() => {handleModalChange("register")}}
                >
                  Sign Up
                </span> 
              </p>
              {/* <button className="login-form__register-btn" onClick={() => {handleModalChange("register")}}> sign Up </button> */}
            </div>
          </form>
        </div>
    </section>
  );
};

export default Login;
