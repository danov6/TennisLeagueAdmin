import React from 'react';

import TeamAbbreviations from './../data/teamabbreviations';
import ConferenceAbbreviations from './../data/conferenceabbreviations';

var _ = require('lodash');

export default class ConferenceRankings extends React.Component {
    handleTeamClick = (e) => {
        const team = e.target.getAttribute('data-value');
        this.props.setSelectedTeam(team);
        this.props.changePage("Home");
    };
    render() { 
        let { playerData } = this.props;
        let teamData = sortTeams(playerData);
        
        return (
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <div style={{backgroundColor: '#fff', padding: '5%', borderRadius: '5px'}}>
                    <div>
                        <h2 className="sub-header" key="title" style={{textAlign: 'center', paddingBottom: '5%'}}>Conference Rankings</h2>
                        <table style={{width: '100%'}}>
                            <tbody>
                                <tr>
                                    <Conference conference={'WCC'} teamData={teamData} handleTeamClick={ this.handleTeamClick } />
                                    <Conference conference={'RMC'} teamData={teamData} handleTeamClick={ this.handleTeamClick }/>
                                </tr>
                                <tr>
                                    <Conference conference={'MWC'} teamData={teamData} handleTeamClick={ this.handleTeamClick }/>
                                    <Conference conference={'SAC'} teamData={teamData} handleTeamClick={ this.handleTeamClick }/>
                                </tr>
                                <tr>
                                    <Conference conference={'CAC'} teamData={teamData} handleTeamClick={ this.handleTeamClick }/>
                                    <Conference conference={'GLC'} teamData={teamData} handleTeamClick={ this.handleTeamClick }/>
                                </tr>
                                <tr>
                                    <Conference conference={'NEC'} teamData={teamData} handleTeamClick={ this.handleTeamClick }/>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
function Conference (props){

    const teams = props.teamData;
    const conference = props.conference;

    let conferenceTeams = getConferenceTeams(conference, teams);
    let pointsTotal = 0;
    let depthTotal = 0;

    for(var i = 0; i < conferenceTeams.length; i++){
        pointsTotal += conferenceTeams[i].points;
    }
    for(var j = 0; j < conferenceTeams.length; j++){
        depthTotal += conferenceTeams[j].depth;
    }

    const sorted = conferenceTeams.map((team, index)=> {
        return <tr key={index}>
                  <td>{ index + 1 }</td>
                  <td className="playertablefield" onClick={props.handleTeamClick} data-value={team.name} >{ team.name }</td>
                  <td>{ team.points }</td>
                  <td>{ team.depth }</td>
                  <td><b>{ (team.points + team.depth) / 2 }</b></td>
              </tr>
    }); 

    return (
        <td style={{padding: '2%'}}>
            <div className="table-responsive" key="other">
                <table className="table table-striped">
                <caption><center><h3>{ ConferenceAbbreviations[conference].Name }</h3></center></caption>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>Points</th>
                            <th>Depth</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        { sorted }
                        <tr>
                            <td></td>
                            <td><b>Conference</b></td>
                            <td><b>{pointsTotal / 8}</b></td>
                            <td><b>{depthTotal / 8}</b></td>
                            <td><b>{ ((pointsTotal + depthTotal) / 2) / 8 }</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </td>
    );
}
function getConferenceTeams (conf, teams) {

    let conferenceTeams = [];
    for(var i = 0; i < teams.length; i++){
        if(teams[i].conference === conf){
            conferenceTeams.push(teams[i]);
        }
    }
    return conferenceTeams;
}
function sorter(a, b){
    return a - b;
}
