import "./ProgressBar.scss";
import { useState, useEffect } from "react";

interface progressBarProps {
    steps: number
    activeStep: number
    
}

interface ProgressItem {
    activeClass: string
    completedClass: string
}

const ProgressBar = ({steps, activeStep}: progressBarProps) => {
    // console.log(steps)
    const [progressSteps, setProgressSteps] = useState<ProgressItem[]>([{
        activeClass: "",
        completedClass:""
    }]);

    // const []

    useEffect(() => {
        const localSteps: ProgressItem[] = []
        for (let i = 0; i<steps; i++) {
            localSteps.push({
                activeClass: "",
                completedClass: ""
            })
            if (i+1 === activeStep) {
                localSteps[i].activeClass = "--active"
            }
            // highlight completed steps
            if (i+1 <= activeStep) {
                localSteps[i].completedClass = "--completed"
            } else {
                localSteps[i].completedClass = ""
            }
            // localSteps[i] 
        }
        setProgressSteps([...localSteps])
    }, [steps, activeStep])

    

    return (

        <div className="progress-bar">
            <ul className="progress-bar__items">
                
                {
                    progressSteps.map((step, index) => 

                        <li 
                            key={index}
                            className={`progress-bar__item`}
                        
                        >
                            
                            <p 
                                className={`progress-bar__line 
                                            progress-bar__line${step.completedClass}
                                            ${index === 0 ? "progress-bar__line--first" : ""}
                                            `}>
        
                            </p>
                            <span className={`
                                progress-bar__circle 
                                progress-bar__circle${step.completedClass} 
                                progress-bar__circle${step.activeClass}
                                ${index === 0 ? "progress-bar__circle--first" : ""}
                                `}>
        
                            </span>
                        </li> 
                    )
                }
                 {/* <li className="progress-bar__item">
                    <span className="progress-bar__circle">

                    </span>
                    <p className="progress-bar__line">
                        
                    </p>
                </li>
                <li className="progress-bar__item">
                    <span className="progress-bar__circle">

                    </span>
                    <p className="progress-bar__line">
                        
                    </p>
                </li>
                <li className="progress-bar__item">
                    <span className="progress-bar__circle">

                    </span>
                    <p className="progress-bar__line">
                        
                    </p>
                </li>
                <li className="progress-bar__item">
                    <span className="progress-bar__circle">

                    </span>
                    
                </li>  */}
            </ul>
        </div>

    )

}

export default ProgressBar;