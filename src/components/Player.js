import React from 'react';
import TeamAbbreviations from './../data/teamabbreviations';

var _ = require('lodash');


export default class Player extends React.Component {
  setupPlayerProfile = (e) => {
    const selectedPlayerId = e.target.getAttribute('data-value');
    const selectedPlayer = _.find(this.props.playerData, {_id: selectedPlayerId});

    this.props.setSelectedPlayer(selectedPlayer);
    this.props.changePage("PlayerProfile");
  }

  render(){
    const { data, orderBy, rank } = this.props;

    if(!isNaN(data.pr) && data.pr !== ""){
      data.pr = parseInt(data.pr);
    }

    return (    
      <tr key={data._id}>
        <td>{ rank + 1 }</td>
        <td className={ orderBy === "name" ? "active" : null }><div onClick={ this.setupPlayerProfile } data-value={data._id} className="playertablefield" >{data.name}</div></td>
        <td className={ orderBy === "team" ? "active" : null }>{ getFullTeamName(data.team) }</td>
        <td className={ orderBy === "conference" ? "active" : null }>{data.conference}</td>
        <td className={ orderBy === "pr" ? "active" : null }>{data.pr}</td>
        <td className={ orderBy === "points" ? "active" : null }>{data.points}</td>
      </tr>    
    )
  }
}
function getFullTeamName (team){
  return TeamAbbreviations[team].Name;
}