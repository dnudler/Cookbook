import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import RecipieList from './components/recipie-list.component';
import RecipieRating from './components/recipie-rating.component';
import RecipieServings from './components/recipe-servings.component';

function App() {
  return (
    <Router>
      <div className="container">
              
        <Route path="/" exact component={RecipieList} />
        <Route path="/rate/:id" exact component={RecipieRating} />
        <Route path="/servings/:id" exact component={RecipieServings} />

      </div>
    </Router>
  );
}

export default App;
