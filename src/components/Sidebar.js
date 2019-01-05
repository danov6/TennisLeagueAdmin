import React from 'react';

export default class Sidebar extends React.Component {

    render(){

      const { filterConference, showAllPlayers } = this.props;

      const titleStyle = {
        padding: '0px 20px 0px 20px',
      };

      const conferences = conference_names.map((conf, index)=>{
        return (
            <li key={index}><a href="#" onClick={ filterConference } data-value={conf}>{conf}</a></li>
          )
      }); 

      return (
      	<div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
            <li className="active"><a href="#" onClick={showAllPlayers}>Player Rankings<span className="sr-only">(current)</span></a></li>
            <li><a href="#">Team Rankings</a></li>
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
const conference_names = ["WCC","RMC","MWC","SAC","GLC","NEC","CAC"];