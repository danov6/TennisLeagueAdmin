import React, { Component } from 'react';
//import './data/players';

const players = [
  {key: '1000', rank:'1', name: 'Gio Valdez', team: 'Southern California', conference: 'WCC', rating: '9'},
  {key: '2000', rank:'2', name: 'Gio Valdez', team: 'Southern California', conference: 'WCC', rating: '8'},
  {key: '3000', rank:'3', name: 'Gio Valdez', team: 'Southern California', conference: 'WCC', rating: '7'}
];

function Players(props) {
  const players = props.players.map((player) =>
    <tr key={player.key}>
      <td>{player.rank}</td>
      <td>{player.name}</td>
      <td>{player.team}</td>
      <td>{player.conference}</td>
      <td>{player.rating}</td>
      <td>
        <button type="button" className="btn btn-default btn-sm">
          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
        </button>
      </td>
    </tr>
  );
  return (
    <tbody>{players}</tbody>
  );
}

class App extends Component {
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Team</th>
            <th>Conference</th>
            <th>Rating</th>
            <th></th>
          </tr>
        </thead>
        < Players players={players} />
      </table>
    );
  }
}

export default App;
