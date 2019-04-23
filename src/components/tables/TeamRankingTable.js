import React from 'react';
import TeamAbbreviations from './../../data/teamabbreviations';

var _ = require('lodash');

export default class RankingTable extends React.Component {
    render(){

    let { playerData } = this.props;

    let teamData = sortTeams(playerData);
    
    // list of players
    const sorted = teamData.map((team, index)=>{
      return <tr>
                <td>{ index + 1 }</td>
                <td>{ team.name }</td>
                <td>{ team.conference }</td>
                <td>{ team.points }</td>
            </tr>
    }); 

    return (
        <div>
            <h2 className="sub-header" key="title">Team Rankings</h2>
            <div className="table-responsive" key="other">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>Conference</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        { sorted }
                    </tbody>
                </table>
            </div>
        </div>
    );
    }
}
function sortTeams (playerData){
    let teams = [];
    console.log(Object.keys(TeamAbbreviations))
    for(var i = 0; i < Object.keys(TeamAbbreviations).length; i++){
        var abbrev = Object.keys(TeamAbbreviations)[i];
        var team = {
            name: TeamAbbreviations[abbrev].Name,
            conference: TeamAbbreviations[abbrev].Conf,
            points: 0
        };
        for(var j = 0; j < playerData.length; j++){
            if(abbrev === playerData[j].team){
                team.points += playerData[j].pr === "" ? 0 : parseInt(playerData[j].pr);
            }
        }
        teams.push(team);
    }

    teams = _.orderBy(teams, (item) => {
        return item['points']
    }, 'desc');
    return teams;
}
