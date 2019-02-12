import React, { Component } from 'react';
import './App.css';
import Search from './Search';
import PartList from './PartList';
import {Redirect} from 'react-dom';
import PartCard from './PartCard';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
class App extends Component {
   constructor(props)
    {
        super(props);
        this.state ={
            make:'Select a Make',
            models: ['Select a Model'],
            model:'Select a Model',
            category:'Select a category',
            year:'Select a year',
            parts:[],
            baseUrl: 'http://localhost:8080',
            relatedParts:'',
            OEM:'',
            qfpp:''
        }

        this.init = this.init.bind(this)
        this.maker = this.maker.bind(this);
        this.modeler = this.modeler.bind(this);
        this.catMaker = this.catMaker.bind(this);
        this.yearBuilder = this.yearBuilder.bind(this);
        this.OEMMaker = this.OEMMaker.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.oemSubmitHandler = this.oemSubmitHandler.bind(this);
        this.qfppMaker = this.qfppMaker.bind(this);
        this.qfppSubmitHandler = this.qfppSubmitHandler.bind(this);
    }

    init = (body) => {
        const init=  {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(body)
            };
            return init
            }

    maker = (make) => {
        this.setState({make:make})
    }

    modeler = (model) => {
        this.setState({model:model})
    }

    catMaker = (category) => {
        this.setState({category:category})
    }

    yearBuilder = (year) => {
        this.setState({year:year})
    }



    submitHandler = (e) =>{
        e.preventDefault();
        let body = {
            make:this.state.make,
            model: this.state.model,
            category:this.state.category,
            year:this.state.year
        }
        

        fetch(`${this.state.baseUrl}/part`,this.init(body))
        .then(res => res.json())
        .then(parts => this.setState({parts:parts}));
    }

    OEMMaker = (oem) => {
        this.setState({OEM:oem})
    }

    oemSubmitHandler = (e) => {
        e.preventDefault();
        let body ={
            OEM: this.state.OEM
        }

        fetch(`${this.state.baseUrl}/oem`, this.init(body))
        .then(res => res.json())
        .then(parts => this.setState({parts:parts}));
    }

    qfppMaker = (qfpp) => {
        this.setState({qfpp:qfpp})
    }
    qfppSubmitHandler = (e) => {
        e.preventDefault();
        let body ={
            qfpp: this.state.qfpp
        }

        fetch(`${this.state.baseUrl}/qfpp`, this.init(body))
        .then(res => res.json())
        .then(parts => this.setState({parts:parts}));
    }

    componentDidUpdate(prevProps,prevState)
    {
        if(prevState.make !== this.state.make)
        {
            let body = {make:this.state.make}
           
            fetch(`${this.state.baseUrl}/make`,this.init(body))
            .then(res => res.json())
            .then(data => this.setState({models:data}))
        }

        
    }

  render() {
    return (
      <div className="App">
      <Router>
            {/* <Route path='/' exact render={()=> */}
            <div>
            <Search models={this.state.models}
                    model = {this.state.model}
                    make = {this.state.make}
                    year = {this.state.year}
                    category = {this.state.category}
                    maker ={this.maker}
                    modeler = {this.modeler}
                    catMaker = {this.catMaker}
                    yearBuilder = {this.yearBuilder}
                    submitHandler = {this.submitHandler}
                    oemSubmitHandler = {this.oemSubmitHandler}
                    oemMaker = {this.OEMMaker}
                    qfppMaker = {this.qfppMaker}
                    qfppSubmitHandler = {this.qfppSubmitHandler}/>

            <PartList result = {this.state.parts}/>          
            
            <Switch>

            <Route path='/:qfpp' render ={(props)=>
                <PartCard id = {props.match.url}/>}/>
                
            </Switch>
            </div>
            </Router>
      </div>
    );
  }
}

export default App;
