import React from 'react';

import TeamCodes from './../data/teamabbreviations';
import ConferenceCodes from './../data/conferenceabbreviations';

import LoadingWheel from './../components/LoadingWheel';
import { tmpdir } from 'os';

export default class PlayerProfile extends React.Component {
  state = {
    index: 0,
    player: {
      _id: "",
      name: "",
      team: "",
      conference: "",
      pr: "",
      points: ""
    },
    updatedPlayer: {
      _id: "",
      name: "",
      team: "",
      conference: "",
      pr: "",
      points: ""
    },
    pinwheelActive: this.props.pinwheelActive
  };
  componentDidMount(){
    console.log('DID MOUNT LIFE')
    console.log(this.props.selectedPlayer)
    this.setState({
      player: this.props.selectedPlayer,
      updatedPlayer: this.props.selectedPlayer,
      pinwheelActive: false
    });
  }
  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
   
     this.setState( prevState => {
       return { 
         updatedPlayer : {
           ...prevState.updatedPlayer, [name]: value,
         }
       }
     });

     if(name === "team" && value !== ""){
       let conference = TeamCodes[value].Conf;
       this.setState( prevState => {
         return { 
          updatedPlayer : {
             ...prevState.updatedPlayer, ["conference"]: conference,
           }
         }
       });
     }
    }
  handleUpdatePlayer = (e) => {
    e.preventDefault();
    let oldPlayer = this.state.player;
    let newPlayer = this.state.updatedPlayer;

    if(oldPlayer !== newPlayer){
      //close the modal, no updates were made
      fetch('http://localhost:3001/players/' + newPlayer._id,{
        method: "PATCH",
        body: JSON.stringify(newPlayer),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        response.json()
        .then(data => {
            this.props.changePage('Home')
          this.props.setAlertMessage(data.message);
        })
      });
    }
  }  
  render() {

    const { changePage, selectedPlayer } = this.props;
    const input_styles = {
      fontSize: 20,
      padding: 5,
      borderRadius: 3,
      width: '100%',
      borderColor: '#1c5c96',
      borderWidth: 1,
      outline: 'none',
      marginLeft: '2%'
    };
    const select_dropdown_styles = {
      fontSize: 20,
      padding: 5,
      borderRadius: 3,
      backgroundColor: '#fff',
      width: '100%',
      borderColor: '#1c5c96',
      borderWidth: 1,
      textAlign: 'center',
      marginLeft: '2%',
      height: 40
    };

    let teamData = Object.keys(TeamCodes).map((team,index) => {
      return <option value={ team } key={ index }>{ TeamCodes[team].Name }</option>
    });

    if(this.state.pinwheelActive){
        return (
            <LoadingWheel />
        );
    }else{
        return (
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <div style={{backgroundColor: '#fff', padding: '5%', borderRadius: '5px'}}>
                <h1 className="page-header"><center>{ selectedPlayer.name }</center></h1>
                <table>
                    <tbody>
                        <tr>
                            <td>
                            <h4>Name</h4>
                            <input type="text" name="name" style={input_styles} onChange={this.handleInput} value={this.state.updatedPlayer.name}/>
                            <h4>Team</h4>
                            <select
                                name="team"
                                value={this.state.updatedPlayer.team}
                                onChange={this.handleInput}
                                style={ select_dropdown_styles }
                                >
                                <option value="" disabled>Select Team</option>
                                { teamData }
                            </select>
                            <h4>Conference</h4>
                            <h4 style={{marginLeft: '2%'}}>{this.state.player.conference !== "" ? ConferenceCodes[this.state.updatedPlayer.conference].Name : "N/A"}</h4>
                            <h4>Player Rating</h4>
                            <input type="text" name="pr" style={input_styles} onChange={this.handleInput} value={this.state.updatedPlayer.pr}/>
                            <h4>Points</h4>
                            <input type="text" name="points" style={input_styles} onChange={this.handleInput} value={this.state.updatedPlayer.points}/>
                            <table>
                                <tbody>
                                <tr>
                                    <td style={{padding: '2%'}}>
                                    <button onClick={ changePage } className="btn btn-link btn-lg" style={{width: 180}} data-value="Home">Back</button>
                                    </td>
                                    <td>
                                    <button onClick={ this.handleUpdatePlayer } className="btn btn-primary btn-lg" style={{width: 180}} id="updateButton">Update</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                    </tbody>
                </table> 
                </div>
            </div>
            );
    }
  }
}
