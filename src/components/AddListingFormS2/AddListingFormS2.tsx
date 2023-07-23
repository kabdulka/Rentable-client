import "./AddListingFormS2.scss";
import { useState, useEffect, ChangeEvent } from "react";
import CustomRadioButton from "../CustomRadioButton/CustomRadioButton";

interface FormDataSec2 {
    bedrooms: string
    bathrooms: string
    space: number
}

interface AddListingFormS2Props {
    setFormDataP2: (newData: FormDataSec2) => void
    formDataP2: FormDataSec2
}

const AddListingFormS2 = ({setFormDataP2, formDataP2}: AddListingFormS2Props) => {
    
    const [bedrooms, setBedrooms] = useState<string>("")
    const [bathrooms, setBathrooms] = useState<string>("")
    const [space, setSpace] = useState<number>(0)

    // retrieve the square footage input from form
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const parsedValue = parseInt(inputValue, 10); // Parse the string to an integer.
    
        if (!isNaN(parsedValue)) {
          setSpace(parsedValue); // Set the parsed value to the state.
        }
    };
    

    useEffect (() => {

        const localData: FormDataSec2 = {
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            space: space
        }

        setFormDataP2(localData)
        // console.log()

    }, [bedrooms, bathrooms, space]);

    useEffect(() => {
        const getFormP2 = localStorage.getItem("formDataP2")
        if (getFormP2) {
            setSpace(JSON.parse(getFormP2).space)
            console.log("inside here space", JSON.parse(getFormP2))
        }
    }, [])

    return (
        // <div className={`add-listing__form__sec`} >
        <>
                            <h2> Nice! Let’s get some of the details </h2>
                   
                        
                            <div className="add-listing__form__options">
                                <p className="add-listing__form__label">
                                    Bedrooms *
                                </p>
                                <CustomRadioButton 
                                    setRadioData={setBedrooms}
                                    type="2"
                                    name={"beds"}
                                    options={ [
                                        {
                                            value: "0"
                                        },
                                        {
                                            value: "1"
                                        },
                                        {
                                            value: "2"
                                        },
                                        {
                                            value: "3"
                                        },
                                        {
                                            value: "4"
                                        },
                                        {
                                            value: "5+"
                                        }
                                        
                                    ]}/>
                            </div>
                            <div className="add-listing__form__options">
                                <p className="add-listing__form__label">
                                    Bathrooms *
                                </p>
                                <CustomRadioButton 
                                    setRadioData={setBathrooms}
                                    type="2"
                                    name={"baths"}
                                    options={ [
                                        
                                        {
                                            value: "1"
                                        },
                                        {
                                            value: "2"
                                        },
                                        {
                                            value: "3"
                                        },
                                        {
                                            value: "4"
                                        },
                                        {
                                            value: "5"
                                        }
                                        
                                    ]}/>
                            </div>
                            <div className="add-listing__form__space">
                                <label 
                                    className="add-listing__form__label"
                                    htmlFor="sq-feet"> How big is the space? * </label>
                                <div className="add-listing__form__input-container">

                                    <input 

                                        name="sq-feet" 
                                        id="sq-feet" 
                                        className="add-listing__form__input--sqft" 
                                        type="number" 
                                        placeholder=""
                                        value={space}
                                        onChange={handleInputChange}
                                        />
                                <span className="add-listing__form__unit"> sqft </span>
                                </div>
                        </div>
                    {/* </div> */}
                        
                        </>
                        )
                        
                    }
                    
                    export default AddListingFormS2;