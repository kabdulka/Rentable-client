import "./SelectComponent.scss"
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { useRef } from "react";

interface SelectComponentProps {
    options: string[]
    setPropertyType: (selection: string) => void
}

const SelectComponent = ({options, setPropertyType}: SelectComponentProps) => {

    const [selectedOption, setSelectedOption] = useState<string>("");
    const [dropdownActive, setDropdownActive] = useState<boolean>(false);

    // console.log(dropdownActive)
    const dropwdownRef = useRef<HTMLInputElement>(null)

    const handleClick = ():void => {
        setDropdownActive(prev => !prev)
    }
    
    const isOptionActive = (option: string): boolean => {
        return selectedOption === option ? true : false
    }
    
    const handleSelectionChange = (selection: string):void => {
        setSelectedOption(selection)
        setPropertyType(selection)
    }

    useEffect(() => {
        const getFormP1 = localStorage.getItem("formDataP1")
        if (getFormP1) {
            setSelectedOption(JSON.parse(getFormP1).propertyType)
            setPropertyType(JSON.parse(getFormP1).propertyType)
            console.log("inside here ",JSON.parse(getFormP1))
        }
    }, [])

    const closeOpenMenus = (e: Event)=>{
        if(dropwdownRef.current && dropdownActive && !dropwdownRef.current.contains(e.target as Node)){
          setDropdownActive(false)
        }
    }

    useEffect (() => {

        window.addEventListener("mousedown", (e: Event) => {
            // setDropdownActive(false)
            closeOpenMenus(e);

            return () => {
                document.removeEventListener("mousedown", (e: Event) => {
                  closeOpenMenus(e)
                });
              };
        })
    }, [dropdownActive])

    return (

        <div className="select-property" ref={dropwdownRef}>
            <div 
                
                onClick={handleClick}
                className={`select-property__main`}
            
            >
                <p className="select-property__current">
                    {selectedOption}
                </p>
                <KeyboardArrowDownIcon />
            </div>

            <div 
                
                className={`${dropdownActive ? "select-property__options" : "select-property__options--disable"}`}
                onClick={handleClick}
            >
                <div className="container">

            

                {
                    options.map((option) => 

                        <div 
                            onClick={() => {
                                handleSelectionChange(option)
                            }}
                            className={`select-property__option ${isOptionActive(option) ? "select-property__option--active" : ""}`}
                            
                        >

                        {/* <div>  </div> */}

                            <p className="select-property__type">
                                {option}
                            </p>
                            {
                                isOptionActive(option) && <CheckIcon className="select-property__check"/>
                            }
                        </div>
                    )
                }
                    </div>
                
            </div>
        </div>

    )

}

export default SelectComponent;