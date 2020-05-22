import React, { Component } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component'


export default class RecipieRating extends Component {
    constructor(props){
        super(props);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            recipie_id: ''
        };
    }
    
    componentDidMount() {
        const { id } = this.props.match.params
        this.setState(() => ({ recipie_id : id }));
        console.log(id);
    }

    onChangeRating(e){
        console.log(e);

        this.setState({
            recipie_rating: e
        }, () => {
            console.log(this.state.recipie_rating);
        });
    }

    onSubmit(e){
        e.preventDefault();
        //Code to submit logic
        console.log('Submitting');

        console.log(this.state.recipie_rating);
        const newRating = {
            rating: 3
        };

        axios.post('http://localhost:1337/api/recipies/' + this.state.recipie_id, newRating)
        .then( res => console.log(res.data));

        console.log('Form Submitted');
        console.log(`Rated to:  ${this.state.recipie_rating}`)
        this.setState({
            recipie_id: '',
            recipie_rating: 0
        });
        this.props.history.push('/');
    }

    changeRating(){

    }
    state = { value: 0 };
    render() {
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>{this.state.recipie_id}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label>Please Rate!</label>
                    </div>
                </div>
                <div>

                <div className="row" style={{width: "50%"}}>
                    
                    <div className="col-9">
                        <ReactStars
                        size={50}
                        value={this.state.recipie_rating}
                        half={false}
                                onChange={value => this.setState({ recipie_rating: value })}
                    /></div>
                </div>
                </div>
                <input type="submit" value="Rate Recipe" className="btn btn-primary" onClick={this.onSubmit}></input>
                
            </div>
        )
    }
}