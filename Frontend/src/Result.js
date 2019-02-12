import React from 'react';
import PartCard from './PartCard';
import {Link} from 'react-router-dom';
class Result extends React.Component{

    componentDidUpdate(prevProps, prevState)
    {
        if(prevProps.result !== this.props.result)
        {
            
        }
    }

    render()
    {  

        return(

            this.props.result.map((part,i) => 

                        <PartCard make={part.make}
                                model={part.model}
                                category={part.category}
                                startYear={part.startYear}
                                endYear={part.endYear}
                                oem={[
                                    part.OEM1,
                                    part.OEM2,
                                    part.OEM3,
                                    part.OEM4,
                                    part.OEM5,
                                    part.OEM6,
                                    part.OEM7,
                                    part.OEM8,
                                    part.OEM9,
                                    part.OEM10
                                ]}
                                relatedPart={[
                                    part.relatedPart1,
                                    part.relatedPart2,
                                    part.relatedPart3,
                                    part.relatedPart4,
                                    part.relatedPart5,
                                    part.relatedPart6,
                                    part.relatedPart7,
                                    part.relatedPart8,
                                    part.relatedPart9,
                                    part.relatedPart10
                                ]}
                        ></PartCard>
            )
        )
        
    }
}

export default Result; 