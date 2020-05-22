import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const RecipieIngredients = props => (
    <li>{props.ingredient.name} - Qty: {props.ingredient.qty * props.servings}</li>
)

export class RecipeIngredientServings extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //console.log('mount');
        //console.log(this.props.ingredients);

        this.setState({
            ingredients: this.props.ingredients,
            qty: this.props.qty
        })
    }
    recipieIngredients() {
        console.log('recipieIngredients');
        //console.log(this.props.ingredients);
        //console.log(this.props.qty);
        const servingQty = this.props.qty;
        return this.props.ingredients.map(function (currentIngredient, i) {
            return (

                <RecipieIngredients ingredient={currentIngredient} servings={servingQty}></RecipieIngredients>
            )
        })
    }
    render() {
        //debugger;
        
        if (this.props.ingredients.length > 0){
            return(
                <div>
                <h1>{"Servings for " + this.props.qty}</h1>
                <ul>
                    {this.recipieIngredients()}
                </ul>
                </div>

            )
        } else{
            return (
                <div style={{textAlign: "center", color: "red"}}>
                    
                </div>
            )

        }

    }

}


export default class RecipieServings extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            recipieName: '',
            servingQty: 1,
            ingredients: []
        };
    }

    changeServings(e){
        console.log(e.target.value);
        
        this.setState({
            servingQty: e.target.value
        })
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.setState(() => ({ recipieName: id }));
        //console.log(id);
    }

    calculateServing(e){
        e.preventDefault();
        const url = 'http://localhost:1337/api/recipies/' + this.state.recipieName;
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                
                this.setState({ ingredients: data.recipies[0].ingredients }, () => {
                });
                
            })
            .catch(function (err) {
                console.log(err);
            });
        console.log(this.state.servingQty);
    }

    returnServings(){
        //console.log(this.state.ingredients);
        return <RecipeIngredientServings ingredients={this.state.ingredients} qty={this.state.servingQty}></RecipeIngredientServings>
    }

    render() {
        return (
            <div>
                <h1>{this.state.recipieName}</h1>
                <div className="form-group row" style={{marginTop:"20px"}}>
                    <div className="col-3">
                        <label className="col-form-label">Please enter the servings:</label>
                    </div>
                    <div className="col-4">
                        <input type="number" value={this.state.servingQty} onChange={this.changeServings.bind(this)}
                            className="form-control" placeholder="Type to filter" />
                    </div>
                    <div className="col-4">
                        <button value="" className="btn btn-info" onClick={this.calculateServing.bind(this)}>Calculate Servings</button>
                    </div>
                </div>
                <hr></hr>
                <div>
                    
                    {this.returnServings()}
                </div>

                <Link to={"/"} className="btn btn-info">Back</Link>
            </div>
        )
    }

}

