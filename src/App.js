import React, { Component } from 'react';
import PlayerData from './data/PlayerData.json';

var i = 1;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {      
      PlayerData: PlayerData,
      date: new Date()
    };
  }

  render() {

    const players = PlayerData.map((player) => {
      return (
        <tr key={player.id}>
            <td>{i++}</td>
            <td>{player.name}</td>
            <td>{player.team}</td>
            <td>{player.conference}</td>
            <td>{player.pr}</td>
            <td>{player.points}</td>
            <td>
              <button type="button" className="btn btn-default btn-sm">
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
              </button>
          </td>
        </tr>
      );
    });

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th><a href="#">#</a></th>
            <th><a href="#">Name</a></th>
            <th><a href="#">Team</a></th>
            <th><a href="#">Conference</a></th>
            <th><a href="#">PR</a></th>
            <th><a href="#">Points</a></th>
          </tr>
        </thead>
        <tbody>
          {players}
        </tbody>
      </table>
    );
  }
}

export default App;
