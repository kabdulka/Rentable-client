import "./Register.scss"
import axios, { Axios, AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FormData } from "../Login/Login";
import CloseIcon from '@mui/icons-material/Close';
// import Login from "../Login/Login";
import { loginError } from "../Login/Login";
import { ModalsOpen } from "../../App";

interface RegisterFormData extends FormData {
    confirmPassword: string
    username: string
}

interface RegisterError extends loginError {
    usernameErr: boolean
    confirmPasswordErr: boolean
}

interface RegisterProps {
    handleModalChange: (modal: string) => void
    // delete later
    modalsOpen: ModalsOpen
    setModalsOpen: (modalsOpen: ModalsOpen) => void
}

const Register = ({handleModalChange, modalsOpen, setModalsOpen}: RegisterProps) => {

    const baseUrl: string = `http://localhost:8090`;
    const endpoint: string = "users/register"
    const loginUrl: string = `${baseUrl}/${endpoint}`;
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)
    const [acountExists, setAccountExists] = useState<boolean>(false)

    const navigate = useNavigate()
    const regRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState<RegisterFormData>({
        email: "",
        password: "",
        confirmPassword: "",
        username: ""
    });

    const [formError, setFormError] = useState<RegisterError>({
        emailErr: false,
        passwordErr: false,
        confirmPasswordErr: false,
        usernameErr: false
    })


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        console.log("register: login", modalsOpen.loginModal)
        console.log("register: register", modalsOpen.registerModal)
        // document.addEventListener(("mousedown"), (event: Event) => {
        //     if (modalsOpen.registerModal && !regRef.current?.contains(event.target as Node)) {
        //         handleModalChange("close")
        //         // setModalsOpen({
        //         //     ...modalsOpen, registerModal: false
        //         // })
        //     }
        // })
        const checkIfClickedOutside = (event: Event, target: string) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
         
            if (modalsOpen.registerModal && regRef.current && !regRef.current.contains(event.target as Node)) {
              console.log("hereere")
              // setIsMenuOpen(false)
              // setModalsOpen({
              //   ...modalsOpen, [target]: !modalsOpen[target]
              // })
                handleModalChange(target)
                // alert("clicked outside");
            }
          }
            document.addEventListener("mousedown", (event: Event) => {
              checkIfClickedOutside(event, "close")
    
              return () => {
                document.removeEventListener("mousedown", () => {
                  checkIfClickedOutside(event, "close")
                });
              };
            })
    
    }, [regRef])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formComplete: boolean = true;

        let loginInfo: RegisterFormData = {
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            username: formData.username
        }
    
        // console.log(loginInfo.email, loginInfo.confirmPassword);
        registerUser(loginInfo)

        // navigate("/")
 
    };

    const registerUser = async (loginInfo: RegisterFormData): Promise<void> => {
 
        setPasswordsMatch(true)
        setAccountExists(false)

        try {
            const {email, password, confirmPassword, username} = loginInfo
            console.log(email, password, username, confirmPassword);
            // if (email.length <= 3 || password.length <= 2 || username.length <= 2) {
            //     return;
            // }

            const localFormErr: RegisterError = {
                emailErr: false,
                passwordErr: false,
                confirmPasswordErr: false,
                usernameErr: false 
            }
            setFormError(localFormErr)

            if (email.length < 1) {
                localFormErr.emailErr = true;
            }
            if (password.length < 1) {
                localFormErr.passwordErr = true;
            }
            if (confirmPassword.length < 1) {
                localFormErr.confirmPasswordErr = true;
            }
            if (username.length < 1) {
                localFormErr.usernameErr = true
            }

            if (password !== confirmPassword) {
                // passwords don't match
                setPasswordsMatch(false)
                localFormErr.passwordErr = true;
                localFormErr.confirmPasswordErr = true;
                return;
            }
            setFormError(localFormErr);

            const response = await axios.post(loginUrl, loginInfo);

            if (response.data === "user-exists") {
                // user exists
                setAccountExists(true)
                return;
            }

            // user successfully created an account
            // take them to login
            if (response.data) {
                handleModalChange("login")
            }

            setFormData({
                email: "",
                password: "",
                confirmPassword: "",
                username: "",
            })
            
    } catch(err) {
        console.log(err)
        return;
    }
  }
      
    return (

        <section className="register" >
            <div className="register__wrapper" ref={regRef}>
                <div className="register-header__heading">
                    <h3 className="register__header-title"> Create an account </h3>
                    <CloseIcon 
                        className="register-header__close"
                        onClick={() => {
                            handleModalChange("close")
                        }}
                    />
                </div>
         
                <form onSubmit={handleSubmit} className="register-form">
                {
                    acountExists === true && 
                    <div className="register__account-exists">
                        An account with the email {formData.email} already exists
                    </div>
                }
                {
                    passwordsMatch === false && 
                    <div className="register__passwords-missmatch">
                        Make sure both passwords match
                    </div>
                }

                    <div className="register-form__container">
                        <label htmlFor="email" className={`${formError.emailErr ? "register-form__label--error" : "register-form__label"}`}>
                           
                            {
                                formError.emailErr === true ? "Please provide your email" : "Email*"
                            }
                        </label>
                        <div style={{width: "100%"}}>
                            <input
                                value={formData.email}
                                id="email"
                                name="email"
                                type="email"
                                onChange={handleInputChange}
                                className="register-form__input"
                            />
                        </div>
                    </div>

                    <div className="register-form__container">
                        <label htmlFor="password" className={`${formError.passwordErr ? "register-form__label--error" : "register-form__label"}`}>
                        {
                            formError.confirmPasswordErr === true ? "Password must be least 3 characters" : "Password*"
                        }
                        </label>
                        <div style={{width: "100%"}}>

                            <input
                                value={formData.password}
                                id="password"
                                name="password"
                                type="password"
                                onChange={handleInputChange}
                                className="register-form__input"
                            />
                        </div>
                    </div>

                    <div className="register-form__container">
                        <label htmlFor="confirmPassword" className={`${formError.confirmPasswordErr ? "register-form__label--error" : "register-form__label"}`}>
                        {
                            formError.confirmPasswordErr === true ? "Password must be least 3 characters" : "Confirm Password*"
                        }
                        </label>
                        <div style={{width: "100%"}}>

                            <input
                                value={formData.confirmPassword}
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                onChange={handleInputChange}
                                className="register-form__input"
                            />
                        </div>
                    </div>
                    <div className="register-form__container">
                        <label htmlFor="username" className={`${formError.usernameErr ? "register-form__label--error" : "register-form__label"}`}>
                        {
                            formError.usernameErr === true ? "Please provide your username" : "Username*"
                        }
                        </label>
                        <div style={{width: "100%"}}>
                        
                            <input
                                value={formData.username}
                                id="username"
                                name="username"
                                type="text"
                                onChange={handleInputChange}
                                className="register-form__input"
                            />
                        </div>
                    </div>

                    <button className="register-form__submit">Register</button>
                    <div className="register-form__login">
                        <p className="register-form__login-text"> Already have an account?
                            <span 
                                className="register-form__login-btn"
                                onClick={() => {handleModalChange("login")}}
                            >
                                Log In
                            </span> 
                        </p>
                        {/* <button className="register-form__login-btn" onClick={() => {handleModalChange("login")}}> Log In </button> */}
                    </div>
                </form>
            </div>
    </section>


    )
}

export default Register;