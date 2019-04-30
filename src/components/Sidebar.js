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
            <li><a href="#" onClick={showAllPlayers}>Player Rankings<span className="sr-only">(current)</span></a></li>
            <li><a href="#" onClick={changePage} data-value="TeamRankings">Team Rankings</a></li>
            <li><a href="#">Free Agency</a></li>
            <li><a href="#">Playoff Race</a></li>
          </ul>
          <ul className="nav nav-sidebar">
            <li><b style={titleStyle}>Player Rankings</b></li>
            <li><a href="#">Singles</a></li>
            <li><a href="#">Doubles</a></li>
          </ul>
          <ul className="nav nav-sidebar">
            <li><b style={titleStyle}>Conference</b></li>
            {conferences}
          </ul>
        </div>
      );
    }
}
