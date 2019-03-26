import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

import TeamCodes from './../data/teamabbreviations';
import ConferenceCodes from './../data/conferenceabbreviations';

export default class PlayerModal extends React.Component {
  state = {
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
    }
  };
  componentDidMount(){
    this.setState({
      player: this.props.selectedPlayer,
      updatedPlayer: this.props.selectedPlayer
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
    console.log(oldPlayer);
    console.log(newPlayer);

    if(oldPlayer !== newPlayer){
      //close the modal, no updates were made
      fetch('http://localhost:3001/players/' + newPlayer._id,{
        method: "PATCH",
        body: JSON.stringify(newPlayer),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data => {
          window.location =  "http://localhost:3000/?update=" + data.id;
        })
      });
    }
  }  
  render() {
    const { hideModal, selectedPlayer } = this.props;
    const input_styles = {
      fontSize: 20,
      padding: 5,
      borderRadius: 3,
      width: '80%',
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
      width: '80%',
      borderColor: '#1c5c96',
      borderWidth: 1,
      textAlign: 'center'
    };
    const emptyHighlights = (
        <Modal
        {...this.props}
          dialogClassName="modal-50w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Alert bsStyle="danger">
            <h4>Oh snap! You got an error!</h4>
            <p>
              The player selected was not found. Please try again.
            </p>
            <p>
              <Button onClick={ hideModal } bsStyle="link">Close</Button>
            </p>
          </Alert>
        </Modal>
      );
    let teamData = Object.keys(TeamCodes).map((team,index) => {
      return <option value={ team } key={ index }>{ TeamCodes[team].Name }</option>
    });

    if(!selectedPlayer){
      return emptyHighlights;
    }else{
      return (
        <Modal
        {...this.props}
        dialogClassName="modal-50w"
        aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton onClick={ hideModal }>
            <Modal.Title id="contained-modal-title-lg">Edit {this.state.updatedPlayer.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            <h4>{this.state.player.conference !== "" ? ConferenceCodes[this.state.updatedPlayer.conference].Name : "N/A"}</h4>
            <h4>Player Rating</h4>
            <input type="text" name="pr" style={input_styles} onChange={this.handleInput} value={this.state.updatedPlayer.pr}/>
            <h4>Points</h4>
            <input type="text" name="points" style={input_styles} onChange={this.handleInput} value={this.state.updatedPlayer.points}/>
          </Modal.Body>
          <Modal.Footer>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Button onClick={ hideModal } variant="link">Close</Button>
                  </td>
                  <td>
                    <Button onClick={ this.handleUpdatePlayer } variant="primary">Update</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal.Footer>
        </Modal>
      );
    }
  }
}
