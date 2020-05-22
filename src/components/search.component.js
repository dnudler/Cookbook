import React, { Component } from 'react';

class Search extends Component{
filterUpdate(){
    const val = this.filterContent.value;
    this.props.filterUpdate(val);
    //console.log(val);
}

render(){
    return (
        <form>
            <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Filter:</label>
                <div className="col-sm-10">
                    <input type="text" 
                    ref={(value) => this.filterContent = value}
                    onChange={this.filterUpdate.bind(this)}
                    className="form-control" placeholder="Type to filter" />
                </div>
            </div>
        </form>
    )
}

}

export default Search