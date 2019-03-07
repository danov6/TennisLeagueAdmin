import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

export default class AddPlayer extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('http://localhost:3001', {
      method: 'POST',
      body: data,
    });
  }

  render() {    
    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <div style={{backgroundColor: '#fff', padding: '5%', borderRadius: '5px'}}>
              <h1 className="page-header"><center>Add Player</center></h1>
              <div className="container-fluid">
              <div className="row">
                <div style={{backgroundColor: '#fff', padding: '5%', borderRadius: '5px'}}>
                  <form onSubmit={this.handleSubmit}>
                    <h4>Name</h4>
                    <input type="text" name="name" />
                    <h4>Team</h4>
                    <input type="text" name="team" />
                    <h4>Conference</h4>
                    <input type="text" name="conference" />
                    <h4>Player Rating</h4>
                    <input type="text" name="pr" />
                    <h4>Points</h4>
                    <input type="text" name="points" />
                  </form>
                </div>
              </div>
            </div>                 
        </div>  
      </div>
    );
  }
}
