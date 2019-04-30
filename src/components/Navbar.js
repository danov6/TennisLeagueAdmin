import React from 'react';

export default class Navbar extends React.Component {
    backHome = () => {
      this.props.changePage();
      this.props.showAllPlayers();
    } 
    render(){
      const { changePage, showAllPlayers } = this.props;
      return (
      	  <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a href="#" className="navbar-brand" onClick={ showAllPlayers } data-value="Home">International Tennis League</a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#" onClick={ changePage } data-value="AddPlayer">Add Player</a></li>
                  <li><a href="#">Profile</a></li>
                </ul>
              </div>
            </div>
          </nav>
      );
    }
}