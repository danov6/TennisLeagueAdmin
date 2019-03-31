import React from 'react';

export default class LoadingWheel extends React.Component {
    render(){
      return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
      );
    }
}