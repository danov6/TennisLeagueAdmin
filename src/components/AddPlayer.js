import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

export default class AddPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPlayer: {
        name: '',
        team: '',
        conference: '',
        pr: '',
        points: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({ 
      newPlayer: {
        name: '',
        team: '',
        conference: '',
        pr: '',
        points: ''
      },
    })
  }
  handleInput(e) {
     let value = e.target.value;
     let name = e.target.name;
     this.setState( prevState => {
        return { 
           newPlayer : {
                    ...prevState.newPlayer, [name]: value
                   }
        }
     }, () => console.log(this.state.newPlayer)
     )
 }
  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newPlayer;

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
    })
  }  
  handleSubmit(event) {
    event.preventDefault();
    // const data = new FormData(event.target);
    console.log(event.target);
    // fetch('http://localhost:3001/players', {
    //   method: 'POST',
    //   body: data
    // });
  }

  render() {  

    const input_styles = {
      fontSize: 18,
      padding: 5,
      borderRadius: 3,
    };
    const submit_button_styles = {
      fontSize: 18,
      padding: 5,
      width: 120,
      backgroundColor: '#1c5d96',
      borderRadius: '5px',
      borderColor: '#1c5d96',
      color: '#fff',
      margin: 10
    };
    const cancel_button_styles = {
      fontSize: 18,
      padding: 5,
      width: 120,
      borderRadius: '5px',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#1c5d96',
      color: '#1c5d96',
      margin: 10
    };

    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <div style={{backgroundColor: '#fff', padding: '5%', borderRadius: '5px'}}>
              <h1 className="page-header"><center>Add Player</center></h1>
              <div className="container-fluid">
              <div className="row">
                <div style={{backgroundColor: '#fff', padding: '5%', borderRadius: '5px', textAlign: 'center', display: 'inline'}}>
                  <form onSubmit={ this.handleFormSubmit }>
                    <h4>Name</h4>
                    <input type="text" name="name" style={input_styles} onChange={this.handleInput}/>
                    <h4>Team</h4>

                    <select
                      name="team"
                      value={props.value}
                      onChange={props.handleChange}
                      >
                      <option value="" disabled>Select Team</option>
                      {props.options.map(option => {
                        return (
                          <option
                            key={option}
                            value={option}
                            label={option}>{option}
                          </option>
                        );
                      })}
                    </select>


                    <input type="text" name="team" style={input_styles} onChange={this.handleInput} />
                    <h4>Conference</h4>
                    <input type="text" name="conference" style={input_styles} onChange={this.handleInput} />
                    <h4>Player Rating</h4>
                    <input type="text" name="pr" style={input_styles} onChange={this.handleInput}/>
                    <h4>Points</h4>
                    <input type="text" name="points" style={input_styles} onChange={this.handleInput}/>
                    <br/>
                    <button type="button" name="clear" style={cancel_button_styles} onClick={ this.handleClearForm }>Clear</button> 
                    <button type="submit" name="submit" style={submit_button_styles}>Add Player</button> 
                  </form>
                </div>
              </div>
            </div>                 
        </div>  
      </div>
    );
  }
}
const teams = [{}]
