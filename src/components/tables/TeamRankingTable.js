import React from 'react';
import TeamAbbreviations from './../../data/teamabbreviations';
import ConfAbbreviations from './../../data/conferenceabbreviations';

var _ = require('lodash');

export default class RankingTable extends React.Component {
    handleTeamClick = (e) => {
        const team = e.target.getAttribute('data-value');
        this.props.setSelectedTeam(team);
        this.props.changePage("Home");
    };
    render(){

    let { playerData } = this.props;

    let teamData = sortTeams(playerData);
    
    // list of players
    const sorted = teamData.map((team, index)=>{
      return <tr key={index}>
                <td>{ index + 1 }</td>
                <td className="playertablefield" onClick={this.handleTeamClick} data-value={team.name} >{ team.name }</td>
                <td>{ ConfAbbreviations[team.conference].Name.replace(' Conference', '') }</td>
                <td>{ team.points }</td>
                <td>{ team.depth }</td>
                <td><b>{ (team.points + team.depth) / 2 }</b></td>
            </tr>
    }); 

    return (
        <div>
            <h2 className="sub-header" key="title" style={{textAlign: 'center', paddingBottom: '5%'}}>Team Rankings</h2>
            <div className="table-responsive" key="other">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>Conference</th>
                            <th>Points</th>
                            <th>Depth</th>
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
    for(var i = 0; i < Object.keys(TeamAbbreviations).length; i++){
        let ratings = [];
        var abbrev = Object.keys(TeamAbbreviations)[i];
        var team = {
            name: TeamAbbreviations[abbrev].Name,
            conference: TeamAbbreviations[abbrev].Conf,
            points: 0,
            depth: 0,
            rating: 0
        };
        for(var j = 0; j < playerData.length; j++){
            if(abbrev === playerData[j].team){
                var playerPoints = playerData[j].pr === "" ? 0 : parseInt(playerData[j].pr);
                team.points += playerPoints;
                ratings.push(playerPoints);
            }
        }
        team.depth = getDepthRating(ratings);
        team.rating = (team.points + team.depth) / 2;
        teams.push(team);
    }

    teams = _.orderBy(teams, (item) => {
        return item['rating']
    }, 'desc');
    return teams;
}
function getDepthRating (ratings){
    var sorted = ratings.sort(sorter);
    var depthRating = 0;
    sorted.pop();
    sorted.pop();

    for(var i = 0; i < sorted.length; i++){
        depthRating += sorted[i];
    }
    return depthRating;
}
function sorter(a, b){
    return a - b;
}