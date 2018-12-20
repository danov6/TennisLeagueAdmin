import React from 'react';

export default class Sidebar extends React.Component {

    render(){
      const titleStyle = {
        padding: '0px 20px 0px 20px',
      };
      return (
      	<div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
            <li className="active"><a href="#">Overview <span className="sr-only">(current)</span></a></li>
            <li><a href="#">Standings</a></li>
            <li><a href="#">Playoffs</a></li>
            <li><a href="#">NTL Draft</a></li>
          </ul>
          <ul className="nav nav-sidebar">
            <li><b style={titleStyle}>Player Rankings</b></li>
            <li><a href="">Singles</a></li>
            <li><a href="">Doubles</a></li>
          </ul>
          <ul className="nav nav-sidebar">
            <li><b style={titleStyle}>Conference</b></li>
            <li><a href="">WCC</a></li>
            <li><a href="">RMC</a></li>
            <li><a href="">MWC</a></li>
            <li><a href="">SAC</a></li>
            <li><a href="">GLC</a></li>
            <li><a href="">NEC</a></li>
            <li><a href="">CAC</a></li>
          </ul>
          <ul className="nav nav-sidebar">
            <li><a href="">Archives</a></li>
            <li><a href="">One more nav</a></li>
            <li><a href="">Another nav item</a></li>
          </ul>
        </div>
      );
    }
}