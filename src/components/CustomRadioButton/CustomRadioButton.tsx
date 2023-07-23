import "./CustomRadioButton.scss";
import { useState, useEffect } from "react";

interface optionType {
    // id: string
    value: string
}

interface CustomRadioButtonProps {
    type: string
    name: string
    options: optionType[]
    setRadioData: (option: string) => void
    
}

const CustomRadioButton = ({options, type, setRadioData, name}: CustomRadioButtonProps) => {

    const [activeOption, setActiveOption] = useState<string>("")

    const handleRadioChange = (radioOption: string):void => {
        setActiveOption(radioOption)
        // console.log(activeOption)
        setRadioData(radioOption)
    }

    const getActiveClass = (option: string):string => {
        return activeOption === option ? `option-${type}__input--selected` : "";
    }

    useEffect(() => {
        if (type === "1") {

            const getFormP1 = localStorage.getItem("formDataP1")
            if (getFormP1) {
                setActiveOption(JSON.parse(getFormP1).listingOwner)
                setRadioData(JSON.parse(getFormP1).listingOwner)
                console.log("inside here ",JSON.parse(getFormP1))
            }
        }
        if (type === "2") {
            console.log("inside type2 radio btn")
            const getFormP2 = localStorage.getItem("formDataP2")
            if (getFormP2) {
               
                if (name === "beds") {

                    console.log(getFormP2)
                    setActiveOption(JSON.parse(getFormP2).bedrooms)
                    setRadioData(JSON.parse(getFormP2).bedrooms)

                }
                if (name === "baths") {

                    // console.log(getFormP2)
                    setActiveOption(JSON.parse(getFormP2).bathrooms)
                    setRadioData(JSON.parse(getFormP2).bathrooms)
                }
                // setRadioData(JSON.parse(getFormP2).bedrooms)
                // console.log("inside here ",JSON.parse(getFormP2))
            }
        }
    }, [])

    return (
        <section className={`options-${type}`}>

            {
                // type === "1" &&
                options.map((option: optionType, index: number) => 
                    
                    <div 
                        className={`option-${type}`} key={index}
                        onClick={() => {
                            handleRadioChange(option.value)
                        }}
                    >
                        <span 
                            
                            className={`option-${type}__input ${getActiveClass(option.value)}`}
                            > 
                            {
                                type === "2" && <p> {option.value} </p>
                            }
                        </span>

                        {
                            type === "1" &&
                            <p className={`option-${type}__label`}> {option.value} </p>
                        }    
                    </div>
                )

               
            }
                {/* <div onClick={show}> here </div> */}
            {
                
            }
             
        </section>
    )
}

export default CustomRadioButton;