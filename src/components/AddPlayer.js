import React from 'react';

import TeamCodes from './../data/teamabbreviations';
import ConferenceCodes from './../data/conferenceabbreviations';

import { Alert } from 'react-bootstrap'

export default class AddPlayer extends React.Component {
  constructor() {
    super();

    this.state = { 
      newPlayer: {
        name: '',
        pr: '',
        points: '',
        team: '',
        conference: ''
      },
      changedProperties: {
        name: false,
        pr: false,
        points: false,
        team: false,
        conference: true //optional field
      },
      isEligible: false,
      errorMessage: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.checkIfEligible = this.checkIfEligible.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({ 
      newPlayer: {
        name: '',
        pr: '',
        points: '',
        team: '',
        conference: ''
      },
      changedProperties: {
        name: false,
        pr: false,
        points: false,
        team: false,
        conference: false
      },
      isEligible: false,
      errorMessage: ""
    });
  }
  handleTeamChange(e) {
    let team = e.target.value;
    if(team !== ""){
      let conference = TeamCodes[team].Conf;
      this.setState({
        team: team,
        conference: conference
      });
    }
 }
  handleInput(e) {
     let value = e.target.value;
     let name = e.target.name;
    
      this.setState( prevState => {
        return { 
          newPlayer : {
            ...prevState.newPlayer, [name]: value,
          }
        }
      }, () => this.checkIfEligible(this.state.newPlayer));

      if(name === "team" && value !== ""){
        let conference = TeamCodes[value].Conf;
        this.setState( prevState => {
          return { 
            newPlayer : {
              ...prevState.newPlayer, ["conference"]: conference,
            }
          }
        });
        //, () => console.log(this.state.newPlayer));

        this.setState( prevState => {
          return { 
            changedProperties : {
              ...prevState.changedProperties, ["conference"]: true,
            }
          }
        });
      }

      this.setState( prevState => {
        return { 
          changedProperties : {
            ...prevState.changedProperties, [name]: true,
          }
        }
      });
  }
  checkIfEligible(player){
    console.log('CHECK');
    console.log(player);
    if(player.name === ""){
      this.setState({
        isEligible: false,
        errorMessage: "Must enter name"
      });
      return false;
    }
    if(player.name.length <= 3){
      this.setState({
        isEligible: false,
        errorMessage: "Name not long enough"
      });
      return false;
    }
    if(player.name.indexOf(' ') === -1){
      this.setState({
        isEligible: false,
        errorMessage: "Please enter first and last name"
      });
      return false;
    }
    if(player.team === ""){
      this.setState({
        isEligible: false,
        errorMessage: "Please select team"
      });
      return false;
    }
    if(player.conference === ""){
      this.setState({
        isEligible: false,
        errorMessage: "Conference not selected"
      });
      return false;
    }
    if(player.pr === ""){
      this.setState({
        isEligible: false,
        errorMessage: "Enter a player rating"
      });
      return false;
    }
    if(isNaN(player.pr)){
      this.setState({
        isEligible: false,
        errorMessage: "Player rating must be a number"
      });
      return false;
    }
    // if(player.points === ""){
    //   this.setState({
    //     isEligible: false,
    //     errorMessage: "Enter a player's points"
    //   });
    //   return false;
    // }
    if(isNaN(player.points)){
      this.setState({
        isEligible: false,
        errorMessage: "Player points must be a number"
      });
      return false;
    }
    console.log('PLAYER ELIGIBLE')
    this.setState({
      isEligible: true,
      errorMessage: ""
    });
  }
  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newPlayer;
    console.log('NEW PLAYER:');
    console.log(userData);
    fetch('http://localhost:3001/players',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log(data);
          window.location = "http://localhost:3000/?success=" + data.createdPlayer._id
        })
    });
  }
  render() {  

    const input_styles = {
      fontSize: 20,
      padding: 5,
      borderRadius: 3,
      width: '80%',
      borderColor: '#1c5c96',
      borderWidth: 1,
      outline: 'none'
    };
    const cancel_button_styles = {
      fontSize: 20,
      padding: 5,
      width: 120,
      borderRadius: '5px',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#1c5d96',
      color: '#1c5d96',
      margin: 10
    };
    const select_dropdown_styles = {
      fontSize: 20,
      padding: 5,
      borderRadius: 3,
      backgroundColor: '#fff',
      width: '80%',
      borderColor: '#1c5c96',
      borderWidth: 1,
      textAlign: 'center'
    };

    let teamData = Object.keys(TeamCodes).map((team,index) => {
      return <option value={ team } key={ index }>{ TeamCodes[team].Name }</option>
    });

    const isEligible = this.state.isEligible ? <SubmitButton /> : <div></div>;

    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <div style={{backgroundColor: '#fff', padding: '5%', borderRadius: '5px'}}>
              <h1 className="page-header"><center>Add Player</center></h1>
              <div className="container-fluid">
              <div className="row">
                <div style={{backgroundColor: '#fff', padding: '5%', borderRadius: '5px', textAlign: 'center', display: 'block'}}>
                  <form onSubmit={ this.handleFormSubmit } style={{width: '100%'}}>
                    <AlertMessage changedProperties={ this.state.changedProperties } errorMessage={ this.state.errorMessage }/>
                    <h4>Name</h4>
                    <input type="text" name="name" style={input_styles} onChange={this.handleInput} value={this.state.newPlayer.name}/>
                    <h4>Team</h4>
                    <select
                      name="team"
                      value={this.state.newPlayer.team}
                      onChange={this.handleInput}
                      style={ select_dropdown_styles }
                      >
                      <option value="" disabled>Select Team</option>
                      { teamData }
                    </select>
                    <h4>Conference</h4>
                    <h4>{this.state.newPlayer.conference !== "" ? ConferenceCodes[this.state.newPlayer.conference].Name : "N/A"}</h4>
                    <h4>Player Rating</h4>
                    <input type="text" name="pr" style={input_styles} onChange={this.handleInput} value={this.state.newPlayer.pr}/>
                    <h4>Points</h4>
                    <input type="text" name="points" style={input_styles} onChange={this.handleInput} value={this.state.newPlayer.points}/>
                    <br/>
                    <button type="button" name="clear" className="btn btn-outline-secondary" onClick={ this.handleClearForm }>Clear</button> 
                    { isEligible }
                  </form>
                </div>
              </div>
            </div>                 
        </div>  
      </div>
    );
  }
}
function SubmitButton (){
  const submit_button_styles = {
    fontSize: 18,
    width: 120,
    margin: 10
  };
  return (
    <button type="submit" name="submit" className="btn btn-primary btn-lg" style={ submit_button_styles }>Add Player</button>
  );
}
function AlertMessage (props){
  // only display error or success message if all fields have seen an update
  var changedProperties = props.changedProperties;
  var properties = Object.keys(changedProperties);
  var errorMessage = props.errorMessage;
  var messageEligible = true;
  for(var i = 0; i < properties.length; i++){
    //console.log(changedProperties[properties[i]])
    if(!changedProperties[properties[i]]){
      messageEligible = false;
      break;
    }
  }

  if(messageEligible){
    if(errorMessage !== ""){
      return (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      );
    }else{
      return (
        <div className="alert alert-success" role="alert">
          Player Eligible!
        </div>
      );
    }
  }else{
    return (
      <div></div>
    );
  }

}