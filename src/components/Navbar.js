import React from 'react';

export default class Sidebar extends React.Component {

    render(){
      const { changePage } = this.props;
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
                <a className="navbar-brand" href="#" onClick={ changePage } data-value="Home">International Tennis League</a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li><a onClick={ changePage } data-value="AddPlayer">Add Player</a></li>
                  <li><a href="#">Profile</a></li>
                </ul>
                <form className="navbar-form navbar-right">
                  <input type="text" className="form-control" placeholder="Search..." />
                </form>
              </div>
            </div>
          </nav>
      );
    }
}