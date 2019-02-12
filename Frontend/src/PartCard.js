import React from 'react';
import {Link} from 'react-router-dom';

class PartCard extends React.Component{

    state = {part: {}}

    OEMmaker = () => {
        let OEMs = [];

        for(let i=1; i<=10;i++)
        {
            let OEM = `OEM${i}`
            if(this.state.part[OEM] !== null && this.state.part[OEM] !== '')
            {
                OEMs.push(`${this.state.part[OEM]}`)
            }
            else {
                continue;
            }
        }

        return (OEMs.map(oem => <p>{oem}</p>))
    }

    relatedPartMaker = () => {

        let relatedParts =[];
        for(let i=1;i<=10;i++)
        {
            let relatedPart = `relatedPart${i}`
            if(this.state.part[relatedPart] !== null && this.state.part[relatedPart] !=='')
            {
                relatedParts.push(`${this.state.part[relatedPart]}`)
            }
            else{
                continue;
            }
        }
        return (relatedParts.map(part => <Link to={part}><p>{part}</p></Link>))
    }
    componentDidMount()
    {
        fetch(`http://localhost:8080${this.props.id}`)
        .then(res => res.json())
        .then(info => this.setState({part:info[0]}))

    }  
    
    componentDidUpdate(prevProps, prevState)
    {
        if(prevProps.id !== this.props.id)
        {
            fetch(`http://localhost:8080${this.props.id}`)
            .then(res => res.json())
            .then(info => this.setState({part:info[0]}))
        }
    }
    
render()

    {
        return(
            <div className='part'>
                <img className="part__img" src={this.state.part.img}/>
                    <table className="part__table">
                        <tr>
                            <td>Make</td>
                            <td>Model</td>
                            <td>Category</td>
                            <td>from Year</td>
                            <td>to Year</td>
                            <td>OEM</td>
                            <td>Related Parts</td>

                        </tr>
                        <tr>
                            <td>{this.state.part.make}</td>
                            <td>{this.state.part.model}</td>
                            <td>{this.state.part.category}</td>
                            <td>{this.state.part.startYear}</td>
                            <td>{this.state.part.endYear}</td>
                            <td>{this.OEMmaker()}</td>
                            <td>{this.relatedPartMaker()}</td>
                        </tr>
                    </table>    
                    
            </div>
        )
    }
}

export default PartCard;