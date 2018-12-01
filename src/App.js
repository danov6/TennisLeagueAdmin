import React, { Component } from 'react';
import PlayerData from './data/PlayerData.json';

var _ = require('lodash');

var i = 1;

class App extends Component {

  constructor(){
    super();
    this.state = {      
      playerData: PlayerData,
      orderBy: "points",
      order: 'desc'
    };

    this.doOrderBy = this.doOrderBy.bind(this);
  }

  doOrderBy(e){
    e.preventDefault(); // prevents an a href link from going to page
    const newOrderBy = e.target.getAttribute('data-value'); // (element).getAttribute('data-value')
    this.setState({orderBy : newOrderBy}); //setState() schedules an update to a component’s state object. When state changes, the component responds by re-rendering.
  
    if(newOrderBy !== 'points' && newOrderBy !== 'pr'){
      this.setState({order : 'asc'});
    }else{
      this.setState({order : 'desc'});
    }
  }

  render() {

    const orderBy = this.state.orderBy;
    const order = this.state.order;
    let sorted = this.state.playerData;
    
    sorted = _.orderBy(sorted, (item) => {
      return item[orderBy]
    }, order);

    const players = sorted.map((item)=>{
      return <Player data={ item } key={ item.id } orderBy={ this.state.orderBy } />
    }); 

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th><a href="#">#</a></th>
            <th><a href="#" onClick={ this.doOrderBy } data-value="name">Name</a></th>
            <th><a href="#" onClick={ this.doOrderBy } data-value="team">Team</a></th>
            <th><a href="#" onClick={ this.doOrderBy } data-value="conference">Conference</a></th>
            <th><a href="#" onClick={ this.doOrderBy } data-value="pr">PR</a></th>
            <th><a href="#" onClick={ this.doOrderBy } data-value="points">Points</a></th>
          </tr>
        </thead>
        <tbody>
          {players}
        </tbody>
      </table>
    );
  }
}

class Player extends React.Component {
  render(){
    const { data, orderBy } = this.props;
    const input = categories; // array from the bottom of this script
    const output = input.map((item)=>{
      return <div><small className={ orderBy === item ? "active" : null }>{item}:</small> {data[item] }</div>
    });

    return (    
      <tr key={data.id}>
        <td>{i++}</td>
        <td className={ orderBy === "name" ? "active" : null }>{data.name}</td>
        <td className={ orderBy === "team" ? "active" : null }>{data.team}</td>
        <td className={ orderBy === "conference" ? "active" : null }>{data.conference}</td>
        <td className={ orderBy === "pr" ? "active" : null }>{data.pr}</td>
        <td className={ orderBy === "points" ? "active" : null }>{data.points}</td>
        <td>
          <button type="button" className="btn btn-default btn-sm">
            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
          </button>
        </td>
      </tr>    
    )
  }
}
const categories = ["rank","name","team","conference","pr","points"];

export default App;
