import React from 'react';

class Search extends React.Component{
    
   maker = (e) => {
       this.props.maker(e.target.value);
   }
        
   modeler = (e) => {
       this.props.modeler(e.target.value);
   }

   catMaker = (e) => {
       this.props.catMaker(e.target.value);
   }

   yearBuilder = (e) => {
       this.props.yearBuilder(e.target.value);
   }

   submitHandler = (e) => {
       this.props.submitHandler(e);
   }

   oemMaker = (e) => {
       this.props.oemMaker(e.target.value);
   }
    
   oemSubmitHandler = (e) => {
       this.props.oemSubmitHandler(e);
   }

   qfppMaker = (e) => {
       this.props.qfppMaker(e.target.value);
   }

   qfppSubmitHandler = (e) => {
       this.props.qfppSubmitHandler(e);
   }

    render()
    {
        let yearMaker =[];
            for(let i=1990;i<2020;i++)
            {
                yearMaker.push(i)                  
            }
                    
        return(
            <div>
                <form className="form" onSubmit={this.submitHandler}>
                    <label className="form__label">
                        Make
                        <select className="form__field"
                                onChange={this.maker}
                                value={this.props.make}>
                            <option value="Select a Make">Select a Make</option>
                            <option value="Freightliner">Freightliner</option>
                            <option value="International">International</option>
                            <option value="Mack">Mack</option>
                            <option value="Western Star">Western Star</option>
                            <option value="Kenworth">Kenworth</option>
                            <option value="Peterbilt">Peterbilt</option>
                            <option value="Ford">Ford</option>
                            <option value="Volvo">Volvo</option>
                        </select>
                    </label>
                    <label className="form__label">
                        Model
                        <select className="form__field"
                            onChange={this.modeler}
                                value= {this.props.model}
                                >
                                {
                                    this.props.models.map(model=><option value={model}>{model}</option>)
                                }
                                
                        </select>
                    </label>
                    <label className="form__label">
                        Category
                        <select className="form__field" 
                                onChange={this.catMaker}
                                value={this.props.category}>
                            <option value="Select a Category">Select a Category</option>
                            <option value="Charge Air Cooler">Charge Air Cooler</option>
                            <option value="Copressor">Compressor</option>
                            <option value="Condenser">Condenser</option>
                            <option value="Dryer">Dryer</option>
                            <option value="Radiator">Radiator</option>
                            <option value="Reservoir Tank">Reservoir Tank</option>
                        </select>
                    </label>
                    <label className="form__label">
                        Year
                        <select className="form__field" 
                                onChange={this.yearBuilder}
                                value={this.props.year}>
                            <option value="Select a year">Select a year</option>
                            {yearMaker.map(year => <option>{year}</option>)}
                        </select>
                    </label>
                    <input className="form__button" type="submit" value="SEARCH"/>
                </form>
                <form className='form' onSubmit={this.oemSubmitHandler}>
                    <lable className='form__label'>
                    OEM
                        <input className="form__field" type='text' onChange={this.oemMaker}/>
                    </lable>
                    <input className="form__button" type="submit" value="SEARCH"/>
                </form>
                <form className='form' onSubmit={this.qfppSubmitHandler}>
                    <lable className='form__label'>
                    QFPP
                        <input className="form__field" type='text' onChange={this.qfppMaker}/>
                    </lable>
                    <input className="form__button" type="submit" value="SEARCH"/>
                </form>
            </div>
        )
    }
}

export default Search;