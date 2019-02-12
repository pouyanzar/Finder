import React from 'react';
import {Link} from 'react-router-dom';

class PartList extends React.Component {

    render()
    {
        return(
            this.props.result.map(part => 
                {
                    return(

                        <Link to={part.qfpp}><p>{part.qfpp}</p></Link>)
                }
            )
        )
    }
}

export default PartList;