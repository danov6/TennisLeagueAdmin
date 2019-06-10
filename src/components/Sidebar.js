import React from 'react';
import ConferenceCodes from './../data/conferenceabbreviations';

export default class Sidebar extends React.Component {

    linkClicked = () => {

    };
    render(){

      const { filterConference, showAllPlayers, changePage } = this.props;

      const titleStyle = {
        padding: '0px 20px 0px 20px',
      };

      const conferences = Object.keys(ConferenceCodes).map((conf, index)=>{
        return (
            <li key={index}><a href="#" onClick={ filterConference } data-value={conf}>{ConferenceCodes[conf].Name.replace(' Conference', '')}</a></li>
          )
      }); 

      return (
      	<div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
            <li><b style={titleStyle}>Rankings</b></li>
            <li><a href="#" onClick={showAllPlayers}>Men's Singles<span className="sr-only">(current)</span></a></li>
            <li><a href="#" onClick={changePage} data-value="TeamRankings">Team</a></li>
            <li><a href="#" onClick={changePage} data-value="ConferenceRankings">Conference</a></li>
          </ul>
          <ul className="nav nav-sidebar">
            <li><b style={titleStyle}>Conference</b></li>
            {conferences}
          </ul>
        </div>
      );
    }
}
