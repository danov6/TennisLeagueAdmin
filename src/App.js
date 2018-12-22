import React, { Component } from 'react';
import PlayerData from './data/PlayerData.json';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';


var _ = require('lodash');

class App extends Component {

  constructor(){
    super();
    this.state = {      
      playerData: PlayerData,
      orderBy: "points",
      order: "desc",
      rank: 0,
      conferenceFilter: "",
      teamFilter: ""
    };

    this.doOrderBy = this.doOrderBy.bind(this);
    this.filterConference = this.filterConference.bind(this);
    this.showAllPlayers = this.showAllPlayers.bind(this);
  }

  doOrderBy(e){
    e.preventDefault(); // prevents an a href link from going to page
    const newOrderBy = e.target.getAttribute('data-value'); // (element).getAttribute('data-value')

    // update the state of the orderBy property
    this.setState({orderBy : newOrderBy});

    if(newOrderBy !== 'pr' && newOrderBy !== 'points'){
      this.setState({order : 'asc'});
    }else{
      this.setState({order : 'desc'});
    }
  }

  filterConference(e){
    e.preventDefault();
    const newFilter = e.target.getAttribute('data-value');

    this.setState({conferenceFilter : newFilter});
  }

  showAllPlayers(e){
    e.preventDefault();

    this.setState({conferenceFilter : ""});
    this.setState({teamFilter : ""});
  }

  render() {

    const orderBy = this.state.orderBy;
    const order = this.state.order;
    const conferenceFilter = this.state.conferenceFilter;
    const teamFilter = this.state.teamFilter;

    let sorted = this.state.playerData;
    
    // lodash library used to sort the list 
    sorted = _.orderBy(sorted, (item) => {
      return item[orderBy]
    }, order);

    // filters
    sorted = _.map(sorted, function(eligible) {

      // first remove the extra players
      if (eligible.conference !== ""){

        // filter by conference if one is selected
        if((conferenceFilter === "") || (conferenceFilter !== "" && conferenceFilter === eligible.conference)){

          //TODO: Add Team Filter
          return eligible;
        }
      }
    });

    // remove all undefined and display filtered list
    sorted = _.without(sorted, undefined);

    const players = sorted.map((item, index)=>{
      return <Player data={ item } key={ item.id } rank={ index } orderBy={ this.state.orderBy } />
    }); 

    return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar filterConference={ this.filterConference } showAllPlayers={this.showAllPlayers} />
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 className="page-header">Dashboard</h1>
            <Highlights />
            <div>
              <h2 className="sub-header">Top 10 National</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th><a href="#" onClick={ this.doOrderBy } data-value="points">#</a></th>
                      <th><a href="#" onClick={ this.doOrderBy } data-value="name">Name</a></th>
                      <th><a href="#" onClick={ this.doOrderBy } data-value="team">Team</a></th>
                      <th><a href="#" onClick={ this.doOrderBy } data-value="conference">Conference</a></th>
                      <th><a href="#" onClick={ this.doOrderBy } data-value="pr">PR</a></th>
                      <th><a href="#" onClick={ this.doOrderBy } data-value="points">Points</a></th>
                    </tr>
                  </thead>
                  <tbody>
                    {players}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

class Highlights extends React.Component {
  render(){

  const highlightBubbleClasses = 'col-xs-4 col-sm-4 placeholder';

    return (    
      <div className="row placeholders">
        <div className={highlightBubbleClasses}>
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="150" height="150" className="img-responsive" alt="Generic placeholder thumbnail" />
          <h4>Label</h4>
          <span className="text-muted">Something else</span>
        </div>
        <div className={highlightBubbleClasses}>
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="150" height="150" className="img-responsive" alt="Generic placeholder thumbnail" />
          <h4>Label</h4>
          <span className="text-muted">Something else</span>
        </div>
        <div className={highlightBubbleClasses}>
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="150" height="150" className="img-responsive" alt="Generic placeholder thumbnail" />
          <h4>Label</h4>
          <span className="text-muted">Something else</span>
        </div>
      </div>  
    )
  }
}

class Player extends React.Component {

  render(){
    const { data, orderBy, rank } = this.props;

    return (    
      <tr key={data.id}>
        <td>{ rank + 1 }</td>
        <td className={ orderBy === "name" ? "active" : null }>{data.name}</td>
        <td className={ orderBy === "team" ? "active" : null }>{data.team}</td>
        <td className={ orderBy === "conference" ? "active" : null }>{data.conference}</td>
        <td className={ orderBy === "pr" ? "active" : null }>{data.pr}</td>
        <td className={ orderBy === "points" ? "active" : null }>{data.points}</td>
        <td>
          <button type="button" className="btn btn-default btn-sm">
            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
          </button>
        </td>
      </tr>    
    )
  }
}

export default App;
