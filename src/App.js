import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import RankingTable from './components/tables/RankingTable';

import AddPlayer from './pages/AddPlayer';
import PlayerProfile from './pages/PlayerProfile';
import TeamRankings from './pages/TeamRankings'

import MapUS from './components/MapUS';

//NOTES: Whenever a state changes, that render method gets called again
// Arrow functions automatically bind functions to 'this'

var _ = require('lodash');

var teamAbbreviations = require('datasets-us-states-abbr-names');

class App extends Component {
  state = {
      currentPage: "Home",      
      orderBy: "points",
      order: "desc",
      rank: 0,
      conferenceFilter: "",
      selectedPlayer: {},
      showPlayerModal: false,
      selectedTeamMap: "",
      selectedConferenceMap: {},
      playerData: [],
      messageUpdate: "",
      pinwheelActive: false
  };
  render() {
    // // filter vars
    const conferenceFilter = this.state.conferenceFilter;

    //selected team from map vars
    const selectedTeamMap = this.state.selectedTeamMap;
    let currentPage = {};

    if(this.state.currentPage === "Home"){
        currentPage = (
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <div style={{backgroundColor: '#fff', padding: '5%', borderRadius: '5px'}}>
              <AlertMessage message={ this.state.messageUpdate } />
              <h1 className="page-header"><center>{selectedTeamMap === "" ? "Dashboard": selectedTeamMap + " Menu"}</center></h1>
              <MapUS clickedTeam={ this.clickedTeam }
                 conferenceFilter={ conferenceFilter }
                 selectedTeamMap={ selectedTeamMap }
                 teamAbbreviations={ teamAbbreviations }
                 removeMarker={ this.removeMarker } />
              <RankingTable
                doOrderBy={ this.doOrderBy }
                orderBy={ this.state.orderBy }
                setPlayers={ this.setPlayers }
                order={ this.state.order }
                selectedTeamMap={ this.state.selectedTeamMap }
                conferenceFilter={ this.state.conferenceFilter }
                playerData={ this.state.playerData }
                changePage={ this.changePage }
                setSelectedPlayer={ this.setSelectedPlayer }
                setPinwheel={ this.setPinwheel }
              />
            </div>  
          </div>
        );
    } else if(this.state.currentPage === "AddPlayer"){
        currentPage = (
          <AddPlayer changePage={ this.changePage } setAlertMessage={ this.setAlertMessage }  />
        );
    } else if(this.state.currentPage === "PlayerProfile"){
      console.log(this.state.selectedPlayer)
        currentPage = (
          <PlayerProfile changePage={ this.changePage } setAlertMessage={ this.setAlertMessage } selectedPlayer={ this.state.selectedPlayer } pinwheelActive={ this.state.pinwheelActive } setPinwheel={ this.setPinwheel }/>
        );
    } else if(this.state.currentPage === "TeamRankings"){
      currentPage = (
        <TeamRankings playerData={ this.state.playerData }/>
      );
    }

    return (
    <div style={{backgroundColor: '#dadada'}}>
      <Navbar changePage={ this.changePage } showAllPlayers={this.showAllPlayers} />
      <div className="container-fluid">
        <div className="row">
          <Sidebar filterConference={ this.filterConference}
           showAllPlayers={this.showAllPlayers}
           changePage={this.changePage}
            />
          { currentPage }
        </div>
      </div>      
    </div>
    );
  }
  removeMarker = () => {
    if(document.querySelectorAll('.jvectormap-tip').length > 0){
      document.querySelectorAll('.jvectormap-tip')[0].remove();
    }
  }

  // sets the order of the list based on clicked header
  doOrderBy = (e) => {
    e.preventDefault(); // prevents an a href link from going to page
    const newOrderBy = e.target.getAttribute('data-value'); // (element).getAttribute('data-value')
    console.log(newOrderBy)
    // update the state of the orderBy property
    this.setState({orderBy : newOrderBy});

    if(newOrderBy !== 'pr' && newOrderBy !== 'points'){
      this.setState({order : 'asc'});
    }else{
      this.setState({order : 'desc'});
    }
  }

  // filter players in the list by selected conference in the Sidebar
  filterConference = (e) => {
    e.preventDefault();
    const newFilter = e.target.getAttribute('data-value');
    const page = this.state.currentPage;

    if(page !== "Home"){
      this.setState({
        currentPage: "Home"
      });
    }

    this.setState({
      conferenceFilter : newFilter,
      selectedTeamMap : "",
      selectedConferenceMap : ""
    });
  }

  // Resets the states back to default and shows all active players
  showAllPlayers = (e) => {
    e.preventDefault();

    this.setState({
      conferenceFilter : "",
      teamFilter : "",
      selectedTeamMap : "",
      selectedConferenceMap : "",
      orderBy: "pr",
      order: "desc",
      currentPage: "Home"
    });
  }

  // closes the modal on exit
  hideModal = () => {
    this.setState({
      showPlayerModal : false
    });
  }

  changePage = (e) => {
    let newPage = '';
    if(typeof e.target === 'undefined'){
      newPage = e;
    }else{
      e.preventDefault(); // prevents an a href link from going to page
      newPage = e.target.getAttribute('data-value');
    }
    this.setState({
      currentPage: newPage
    });
  }

  // calls this function onchange when doing player edits
  updatePlayer = (newPlayer) => {
    this.setState({
      selectedPlayer: newPlayer
    });
  }

  // calls this function on team selected from the map
  clickedTeam = (e,code) => {

    var team = "";
    var california = ["SCA","NCA"];
    code = code.replace("US-","");
    
    //TODO: Need popup or something to help distinguish if user wants SCA or NCA
    console.log(code === "CA")
    if(code === "CA"){
      team = "California"
    }else{
      team = teamAbbreviations[code];
    }

    this.setState({
      selectedTeamMap : team,
      conferenceFilter : ""
    });
  }
  setAlertMessage = (message) => {
    this.setState({
      messageUpdate: message
    });
  }
  setPlayers = (players) => {
    this.setState({
      playerData: players
    });
  }
  setPinwheel = (active) => {
    this.setState({
      pinwheelActive: active
    })
  }
  setSelectedPlayer = (selectedPlayer) => {
    this.setState({
      selectedPlayer: selectedPlayer
    })
  }
}
function AlertMessage (props){
    if(props.message === ""){
      return (
        <div></div>
      );
    }else{
      return (
        <div className="alert alert-success" role="alert">
          { props.message }
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
}

export default App;
