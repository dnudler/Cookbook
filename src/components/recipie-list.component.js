import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './search.component';
import ReactStars from 'react-rating-stars-component'

const RecipieIngredient = props => (

        <li>{props.ingredient.name} Qty: {props.ingredient.qty} {props.ingredient.type}</li>
)


export class RecipieLine extends Component {

    constructor(props) {
        
        super(props);
        

    }

    recipieIngredients() {
        
        return this.props.recipie.ingredients.map(function (currentIngredient, i) {
            return <RecipieIngredient ingredient={currentIngredient} key={i}></RecipieIngredient>
        })
    }

    render() {
        //console.log(this.state.recipie.name)

        return (
            <tr>
                <td>{this.props.recipie.name}</td>
                <td>
                    <ul>
                        {this.recipieIngredients()}
                    </ul>
                </td>
                <td>
                    <ReactStars
                        edit={false}
                        size={20}
                        value={this.props.recipie.rating_average}
                        half={false}
                    />
                    
                </td>
                <td>
                    <Link to={"/rate/" + this.props.recipie.name} className="btn btn-info">Rate!</Link>
                    <Link to={"/servings/" + this.props.recipie.name} className="btn btn-info" >Calculate</Link>
                </td>
            </tr>

        )
    
    }

}

export default class RecipieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipies: [],
            filter: '',
            sortOrder : 1 //1 asc, 2 desc
        };

    }

    

    componentDidMount() {
        console.log('mount');
        fetch("http://localhost:1337/api/recipies/")
            .then(res => res.json())
            .then((data) => {
                //console.log(data);
                this.setState({ recipies: data.recipies }, () => {
                    console.log(this.state.recipies);
                });
            })
            .catch(function (err) {
                console.log(err);
            });

            
    }

    recipieListing() {
        console.log()
        return this.state.recipies.map(function (currentRecipie, i) {
            return <RecipieLine recipie={currentRecipie} key={i}></RecipieLine>
        })
    }

    reorderList(){
        if (this.state.sortOrder == 1){
            console.log('era 1');
            var orderedAsc = this.state.recipies.sort((a, b) => (a.rating_average - b.rating_average));
            console.log(orderedAsc);
            this.setState({
                sortOrder : 2,
                recipies: orderedAsc
            });
        } else{
            console.log('era 2');
            var orderedDesc = this.state.recipies.sort((a, b) => (b.rating_average - a.rating_average));
            console.log(orderedDesc);
            this.setState({
                sortOrder : 1,
                recipies: orderedDesc
            });

        }
        this.forceUpdate();
    }

    filterUpdate(value){
        //console.log('filter');
        //console.log("http://localhost:1337/api/recipies/" + value)
        fetch("http://localhost:1337/api/recipies/" + value)
            .then((r) => r.json().then((data) => {
                this.setState({ recipies: data.recipies });
            }));    
    }


    render() {
        
        
        return (
            <div>
                <div className="row">
                    <div className="col-3">

                        <h2>Cookbook</h2>
                        <Search filterText={this.state.filter} 
                            filterUpdate={this.filterUpdate.bind(this)}/>
                    </div>
                    <div className="col-9">
                        <h2>Recipies</h2>
                        
                        <table className="table table-striped" style={{ marginTop: 20 }}>
                            <thead>
                                <tr>
                                    <th>
                                        Recipie Name
                                    </th>
                                    <th>
                                        Ingredients
                                    </th>
                                    <th>
                                        <a href="#" onClick={this.reorderList.bind(this)}>Rating</a>
                                    </th>
                                    <th>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.recipieListing()}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        )
    }
}