
import "./AddListing.scss";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState, useEffect } from "react";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import CustomRadioButton from "../../components/CustomRadioButton/CustomRadioButton";
import AddListingFormS1 from "../../components/AddListingFormS1/AddListingFormS1";
import AddListingFormS2 from "../../components/AddListingFormS2/AddListingFormS2";

interface FormDataSec1 {
    address: string 
    propertyType: string 
    listingOwner: string 
}

interface FormDataSec2 {
    bedrooms: string
    bathrooms: string
    space: number
}

type FullFormData = FormDataSec1 | FormDataSec2

const AddListing = () => {

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [totalSteps, setTotalSteps] = useState<number>(5);

    const [formDataP1, setFormDataP1] = useState<FormDataSec1>({
        
        address: "",
        propertyType: "",
        listingOwner: ""
            
    })

    const [formDataP2, setFormDataP2] = useState<FormDataSec2>({
        
        bedrooms: "",
        bathrooms: "",
        space: 0
            
    })


    // useEffect(() => {
    //     localStorage.setItem("formDataP1",  JSON.stringify(formDataP1))

    // }, [formDataP1])

    useEffect(() => {

        const getFormP1 =  (localStorage.getItem("formDataP1"))
       
        console.log("from local storage outside, ", getFormP1)
        if (typeof getFormP1 === "string") {
            setFormDataP1(JSON.parse(getFormP1!))
            console.log("from local storage, ", getFormP1)
        }
        const getFormP2 =  (localStorage.getItem("formDataP2"))
       
        console.log("from local storage outside, ", getFormP2)
        if (typeof getFormP2 === "string") {
            setFormDataP2(JSON.parse(getFormP2!))
            console.log("from local storage2, ", getFormP2)
        }
    }, [])

    useEffect(() => {
        console.log(formDataP1)
        console.log(formDataP2)
        // localStorage.setItem("formDataP1", formDataP1)
    }, [formDataP1, formDataP2])


    const canClickNext = (currentStep: number):boolean => {
        if (currentStep === 1) {
            // check if any of the properties are empty

            for (const key in formDataP1) {
                console.log(`${key}: ${formDataP1[key as keyof FormDataSec1]}`);
                if (!formDataP1[key as keyof FormDataSec1]) {
                    console.log("false", formDataP1[key as keyof FormDataSec1])
                    return false
                }
            }
            localStorage.setItem("formDataP1", JSON.stringify(formDataP1))

        }
        if (currentStep === 2) {
            for (const key in formDataP2) {
                console.log(`${key}: ${formDataP2[key as keyof FormDataSec2]}`);
                if (!formDataP2[key as keyof FormDataSec2]) {
                    console.log("false form2", formDataP2[key as keyof FormDataSec2])
                    return false
                }
                // Here
            }
            localStorage.setItem("formDataP2", JSON.stringify(formDataP2))
        }
        return true;
    }

    const handleIncrementStep = ():void => {
        // canClickNext(currentStep)
        if (currentStep <= totalSteps && canClickNext(currentStep)) {
            setCurrentStep(prevStep => prevStep + 1)
        }

    }
    const handleDecrementStep = ():void => {
        if (currentStep > 1) {
            setCurrentStep(prevStep => prevStep - 1)
        }
    }

    const isFormSectionHidden = (formStep: number):string =>  {
        return formStep > currentStep ? "add-listing__form__sec--hidden" : "add-listing__form__sec"
    }

    const handleScrollDown = (currentStep: number):void => {
        console.log("current step before: ", currentStep)
        
        const section = document.getElementById(`part${currentStep}`);

        console.log("current step first: ", section)

        console.log(section?.id)
        if (section ) {
            console.log("current step: ", currentStep)
            section.scrollIntoView({ behavior: 'smooth' });
          }
    }

    useEffect(() => {
        handleScrollDown(currentStep)
    }, [currentStep])

    return (

        <>
            <section className="add-listing">
                
                    <div 
                        className="add-listing__header"
                    >
                        
                    <div 
                        className={` ${currentStep >= 2 ? "add-listing__previous" : "add-listing__previous--hidden"} `}
                        onClick={() => {
                                handleDecrementStep()
                            }
                        }
                    >
                        <ArrowBackIosNewIcon />
                        <p className="add-listing__back">
                            previous step
                        </p> 
                    </div>

                    <h2 className="add-listing__title">
                        Create your listing below
                    </h2>
                    <button> SAVE AND EXIT </button>
                </div>
                <ProgressBar 
                    
                    activeStep={currentStep} 
                    
                    steps={totalSteps}
                />


                <form className="add-listing__form">

                    {
                         currentStep === 1 &&
                        <div className={`${isFormSectionHidden(1)}`} id="part1">
                            <AddListingFormS1 
                                setFormDataP1={setFormDataP1}
                                formDataP1={formDataP1}
                            />
                        </div>
                    }
                        
                    { currentStep === 2 &&
                        <div className={`${isFormSectionHidden(2)}`} id="part2">
                            <AddListingFormS2 setFormDataP2={setFormDataP2} 
                            formDataP2={formDataP2}/>
                        </div>
                    }   
                    
                    {/* add submit button here */}
                </form>
                <div className="add-listing__btn-container">

                    <button 
                        className={`${!canClickNext(currentStep) ? "add-listing__btn--disabled" : "add-listing__btn-next "}`}
                        // disabled={canClickNext(currentStep)}
                        onClick={() => {
                                handleIncrementStep()
                                // handleScrollDown(currentStep)
                            
                            }
                        
                        }
                    > 
                            NEXT 
                    </button>
                </div>


            </section>
        </>
    )
}

export default AddListing;