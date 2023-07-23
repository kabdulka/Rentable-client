import "./AddListingFormS1.scss";
import SelectComponent from "../SelectComponent/SelectComponent";
import CustomRadioButton from "../CustomRadioButton/CustomRadioButton";
import { useState, useEffect } from "react";

interface FormDataSec1 {
    address: string
    propertyType: string
    listingOwner: string
}

interface AddListingSec1Props {
    // formDataS1: FormDataSec1
    setFormDataP1: (newData: FormDataSec1) => void
    formDataP1: FormDataSec1
    
}

const AddListingFormS1 = ({setFormDataP1, formDataP1}: AddListingSec1Props) => {

    // add state variables here and pass them down to children components
    // then set the form data p1 setter with the data from the children
    const [address, setAddress] = useState<string>("")
    const [propertyType, setPropertyType] = useState<string>("")
    const [listingOwner, setListingOwner] = useState<string>("")

    useEffect(() => {
        const tempFormData: FormDataSec1 = {
            address: address,
            propertyType: propertyType,
            listingOwner: listingOwner
        }
        console.log(tempFormData)
        setFormDataP1(tempFormData)
    }, [address, propertyType, listingOwner])

    useEffect(() => {
        const getFormP1 = localStorage.getItem("formDataP1")
        if (getFormP1) {
            setAddress(JSON.parse(getFormP1).address)
            console.log("inside here ", JSON.parse(getFormP1))
        }
    }, [])

    return (
        
        <>
            <h2 className="add-listing__form-title"> Let's take care of the basics </h2>
            <div className="add-listing__form__address">
                <label 
                    className="add-listing__form__label"
                    htmlFor="adddress"> Where’s your property located? * </label>
                <input 
                    name="address" 
                    id="address" 
                    className="add-listing__form__input" 
                    type="text"
                    value={address}
                    onChange={(event) => {
                        setAddress(event.target.value)
                    }} 
                    placeholder="Street Address, City, Province, Postal Code"
                    />
            </div>
            <div className="add-listing__form__property-type">
                <p className="add-listing__form__label">
                    What type of property is this? *
                </p>
                <SelectComponent 
                    setPropertyType={setPropertyType}
                    options={["Home", "Townhouse", "Basement", "Duplex", "Parking Spot", "space"]}
                    />
            </div>
            <div className="add-listing__form__options">
                <p className="add-listing__form__label">
                    Who's listing this property for rent? *
                </p>
                <CustomRadioButton 
                setRadioData={setListingOwner}
                type="1"
                name={"listingOwner"}
                options={[
                    {
                        
                        value: "Property Owner"
                    },
                    {
                        
                        value: "Management Company or Agency"
                    }
                    
                ]}/>
            </div>
        
        </>
    )

}

export default AddListingFormS1;