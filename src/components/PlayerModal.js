import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';


export default class PlayerModal extends React.Component {

  render() {

    const { hideModal, updatePlayerProperty, selectedPlayer } = this.props;
    const emptyHighlights = (
        <Modal
        {...this.props}
          bsSize="small"
          aria-labelledby="contained-modal-title-lg"
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

    if(!selectedPlayer){
      return emptyHighlights;
    }else{
      return (
        <Modal
        {...this.props}
          bsSize="small"
          aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header closeButton onClick={ hideModal }>
            <Modal.Title id="contained-modal-title-lg">Edit {selectedPlayer.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="hidden" name="id" value={selectedPlayer._id} />
            <h4>Team</h4>
            <input type="text" name="team" value={selectedPlayer.team} onChange={ updatePlayerProperty } />
            <h4>Conference</h4>
            <input type="text" name="conference" value={selectedPlayer.conference} onChange={ updatePlayerProperty } />
            <h4>Player Rating</h4>
            <input type="text" name="pr" value={selectedPlayer.pr} onChange={ updatePlayerProperty } />
            <h4>Points</h4>
            <input type="text" name="points" value={selectedPlayer.points} onChange={ updatePlayerProperty } />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ hideModal } bsStyle="link">Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
}
