import React from 'react';

var teamAbbreviations = require('datasets-us-states-abbr-names');

function getFullTeamName (code){
  if(code === "SCA" || code === "NCA"){
    return "California";
  }else{
    return teamAbbreviations[code];
  }
}

export default class Highlights extends React.Component {
  render(){

  const { selectedTeamMap, topPlayers } = this.props;
  let placeholder = ["1","2","3"];
  const highlightBubbleClasses = 'col-xs-4 col-sm-4 placeholder';
  const emptyHighlights = <div className="row placeholders"></div>;

  if(topPlayers.length < 3){
    placeholder = [];
  }

  const highlightedPlayers = placeholder.map((prop,index)=>{
      return (
        <div className={highlightBubbleClasses} key={index}>
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="150" height="150" className="img-responsive" alt="Generic placeholder thumbnail" />
          <h4>{topPlayers[index].name}</h4>
          <span className="text-muted">{getFullTeamName(topPlayers[index].team)}</span>
        </div>
      );
  });

  if(selectedTeamMap !== ""){
    return emptyHighlights;
  }else{

    return (    
      <div className="row placeholders">
        {highlightedPlayers}
      </div>  
    );
  }

  }
}