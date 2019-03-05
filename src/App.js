import React, { Component } from 'react';
import PlayerData from './data/PlayerData.json';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Player from './components/Player';
import PlayerModal from './components/PlayerModal';
import Highlights from './components/Highlights';

import TeamMap from './maps/TeamMap';
import TeamMapWCC from './maps/TeamMapWCC';
import TeamMapRMC from './maps/TeamMapRMC';
import TeamMapMWC from './maps/TeamMapMWC';
import TeamMapSAC from './maps/TeamMapSAC';
import TeamMapGLC from './maps/TeamMapGLC';
import TeamMapNEC from './maps/TeamMapNEC';
import TeamMapCAC from './maps/TeamMapCAC';

//NOTES: Whenever a state changes, that render method gets called again

var _ = require('lodash');

var teamAbbreviations = require('datasets-us-states-abbr-names');

function getFullTeamName (code){
    if(code === "SCA" || code === "NCA"){
      return "California";
    }else{
      return teamAbbreviations[code];
    }
}

function Map(props) {
  const conference = props.conferenceFilter;
  if (conference === "WCC") {
    return (
      <TeamMapWCC clickedTeam={ props.clickedTeam }
               conferenceFilter={ props.conferenceFilter }
               selectedTeamMap={ props.selectedTeamMap }
               teamAbbreviations={ props.teamAbbreviations }
               removeMarker={ props.removeMarker } />
      );
  }else if (conference === "RMC") {
    return (
      <TeamMapRMC clickedTeam={ props.clickedTeam }
               conferenceFilter={ props.conferenceFilter }
               selectedTeamMap={ props.selectedTeamMap }
               teamAbbreviations={ props.teamAbbreviations }
               removeMarker={ props.removeMarker } />
      );
  }else if(conference === "MWC"){
    return (
      <TeamMapMWC clickedTeam={ props.clickedTeam }
               conferenceFilter={ props.conferenceFilter }
               selectedTeamMap={ props.selectedTeamMap }
               teamAbbreviations={ props.teamAbbreviations }
               removeMarker={ props.removeMarker } />
      );
  }else if(conference === "SAC"){
    return (
      <TeamMapSAC clickedTeam={ props.clickedTeam }
               conferenceFilter={ props.conferenceFilter }
               selectedTeamMap={ props.selectedTeamMap }
               teamAbbreviations={ props.teamAbbreviations }
               removeMarker={ props.removeMarker } />
      );
  }else if(conference === "GLC"){
    return (
      <TeamMapGLC clickedTeam={ props.clickedTeam }
               conferenceFilter={ props.conferenceFilter }
               selectedTeamMap={ props.selectedTeamMap }
               teamAbbreviations={ props.teamAbbreviations }
               removeMarker={ props.removeMarker } />
      );
  }else if(conference === "NEC"){
    return (
      <TeamMapNEC clickedTeam={ props.clickedTeam }
               conferenceFilter={ props.conferenceFilter }
               selectedTeamMap={ props.selectedTeamMap }
               teamAbbreviations={ props.teamAbbreviations }
               removeMarker={ props.removeMarker } />
      );
  }else if(conference === "CAC"){
    return (
      <TeamMapCAC clickedTeam={ props.clickedTeam }
               conferenceFilter={ props.conferenceFilter }
               selectedTeamMap={ props.selectedTeamMap }
               teamAbbreviations={ props.teamAbbreviations }
               removeMarker={ props.removeMarker } />
      );
  }else{
    return ( 
      <TeamMap clickedTeam={ props.clickedTeam }
               conferenceFilter={ props.conferenceFilter }
               selectedTeamMap={ props.selectedTeamMap }
               teamAbbreviations={ props.teamAbbreviations }
               removeMarker={ props.removeMarker } />
      );         
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      currentPage: "Player Rankings",      
      playerData: PlayerData,
      orderBy: "points",
      order: "desc",
      rank: 0,
      conferenceFilter: "",
      selectedPlayer: {},
      showPlayerModal: false,
      selectedTeamMap: "",
      selectedConferenceMap: {},
      playerDataMongo: []
    };

    //filter functions (keeps in scope)
    this.doOrderBy = this.doOrderBy.bind(this);
    this.filterConference = this.filterConference.bind(this);
    this.showAllPlayers = this.showAllPlayers.bind(this);

    //modal functions
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updatePlayerProperty = this.updatePlayerProperty.bind(this);

    //map functions
    this.clickedTeam = this.clickedTeam.bind(this);
    this.removeMarker = this.removeMarker.bind(this);

  }

  componentDidMount() {
    console.log("[LIFECYCLE]");
    fetch('http://localhost:3001/players')
    .then(
      res => res.json()
    ).then((response) =>
      this.setState({
        playerDataMongo: response.products
      })
    );
  }

  removeMarker(){
    if(document.querySelectorAll('.jvectormap-tip').length > 0){
      document.querySelectorAll('.jvectormap-tip')[0].remove();
      console.log('Element Removed')
    }
  }

  // sets the order of the list based on clicked header
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

  // filter players in the list by selected conference in the Sidebar
  filterConference(e){
    e.preventDefault();
    const newFilter = e.target.getAttribute('data-value');

    this.setState({
      conferenceFilter : newFilter,
      selectedTeamMap : "",
      selectedConferenceMap : ""
    });
  }

  // Resets the states back to default and shows all active players
  showAllPlayers(e){
    e.preventDefault();

    this.setState({
      conferenceFilter : "",
      teamFilter : "",
      selectedTeamMap : "",
      selectedConferenceMap : "",
      orderBy: "points",
      order: "desc"
    });
  }

  // displays the modal on "Edit" Button click
  showModal(e){

    const selectedPlayerId = e.target.getAttribute('data-value');
    const selectedPlayer = _.find(this.state.playerDataMongo, {_id: selectedPlayerId});
    //    const selectedPlayer = _.find(this.state.playerData, {id: parseInt(selectedPlayerId)});


    console.log(selectedPlayerId);
    console.log(selectedPlayer);

    // displays modal with player attributes
    this.setState({
      selectedPlayer: selectedPlayer,
      showPlayerModal: true
    });
  }

  // closes the modal on exit
  hideModal(){
    this.setState({
      showPlayerModal : false
    });
  }

  // calls this function onchange when doing player edits
  updatePlayerProperty(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const selectedPlayer = this.state.selectedPlayer;

    if(selectedPlayer){
      selectedPlayer[name] = value;
    }

    console.log("[CHANGE]");
    console.log(this.state.playerDataMongo[0])

    // stores the updates in a new object 'selectedPlayerUpdates'
    this.setState({
      selectedPlayer: selectedPlayer
    });
  }

  // calls this function on team selected from the map
  clickedTeam(e,code){

    console.log('[TEAM SELECTED]: ' + code);
    var team = "";
    var california = ["SCA","NCA"];
    code = code.replace("US-","");

    //TODO: Need popup or something to help distinguish if user wants SCA or NCA
    if(code !== "CA"){
      team = getFullTeamName(code);
    }else{
      team = "California";
    }

    this.setState({
      selectedTeamMap : team,
      conferenceFilter : ""
    });
  }

  render() {
    console.log('[APP]');

    // filter vars
    const orderBy = this.state.orderBy;
    const order = this.state.order;
    const conferenceFilter = this.state.conferenceFilter;

    //selected team from map vars
    const selectedTeamMap = this.state.selectedTeamMap;
    const selectedConferenceMap = this.state.selectedConferenceMap;

    let sorted = this.state.playerDataMongo;

    // lodash library used to sort the list 
    sorted = _.orderBy(sorted, (item) => {
      return item[orderBy]
    }, order);

    // does the filters based on selection
    sorted = _.map(sorted, function(eligible) {

      // first remove the extra players
      if(selectedTeamMap !== "" && (selectedTeamMap === getFullTeamName(eligible.team))){
        return eligible;
      }else if(eligible.conference !== "" && selectedTeamMap === ""){
        // filter by conference if one is selected
        if((conferenceFilter === "") || (conferenceFilter !== "" && conferenceFilter === eligible.conference)){

          //TODO: Add Team Filter
          return eligible;
        }
      }
    });

    // remove all undefined and display filtered list
    sorted = _.without(sorted, undefined);

    const topPlayers = _.orderBy(sorted, function(player) {
      return player["points"];
    }, "desc");

    // list of players
    const players = sorted.map((item, index)=>{
      return <Player data={ item } key={ item._id } rank={ index } orderBy={ this.state.orderBy } showModal={ this.showModal } />
    }); 

    const header_properties = player_properties.map((prop,index)=>{
      return <th key={index}><a href="#" onClick={ this.doOrderBy } data-value={prop.toLowerCase()}>{prop}</a></th>
    });

    return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar filterConference={ this.filterConference} showAllPlayers={this.showAllPlayers} />
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 className="page-header"><center>{selectedTeamMap === "" ? "Dashboard": selectedTeamMap + " Menu"}</center></h1>
            <Map clickedTeam={ this.clickedTeam }
               conferenceFilter={ conferenceFilter }
               selectedTeamMap={ selectedTeamMap }
               teamAbbreviations={ teamAbbreviations }
               removeMarker={ this.removeMarker } />
            <Highlights sorted={ sorted } selectedTeamMap={ selectedTeamMap } topPlayers={ topPlayers } />
            <div>
              <h2 className="sub-header">{conferenceFilter + " "} Player Rankings</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th><a href="#" onClick={ this.doOrderBy } data-value="points">#</a></th>
                      {header_properties}
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
      < PlayerModal selectedPlayer={ this.state.selectedPlayer }
       hideModal={ this.hideModal }
        show={ this.state.showPlayerModal }
         updatePlayerProperty={ this.updatePlayerProperty }
          />
    </div>
    );
  }
}

const player_properties = ["Name","Team","Conference","PR","Points"];


export default App;
