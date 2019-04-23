import React from 'react';
import Player from './../Player';

const player_properties = ["Name","Team","Conference","PR","Points"];

var _ = require('lodash');

var teamAbbreviations = require('datasets-us-states-abbr-names');

export default class RankingTable extends React.Component {
    render(){

    const { order, orderBy, conferenceFilter, selectedTeamMap, doOrderBy, setSelectedPlayer, changePage } = this.props;  
    let { playerData } = this.props;
    
    // list of players
    const players = playerData.map((item, index)=>{
      return <Player data={ item } key={ item._id } rank={ index } orderBy={ orderBy } changePage={ changePage } setSelectedPlayer={ setSelectedPlayer } playerData={ playerData } />
    }); 

    const header_properties = player_properties.map((prop,index)=>{
      return <th key={index}><a href="#" onClick={ doOrderBy } data-value={prop.toLowerCase()}>{prop}</a></th>
    });

    return (
        <div>
            <h2 className="sub-header" key="title">{conferenceFilter + " "} Player Rankings</h2>
            <div className="table-responsive" key="other">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th><a href="#" onClick={ doOrderBy } data-value="points">#</a></th>
                            { header_properties }
                        </tr>
                    </thead>
                    <tbody>
                        { players }
                    </tbody>
                </table>
            </div>
        </div>
    );
    }
}
function getFullTeamName (code){
    if(code === "SCA" || code === "NCA"){
      return "California";
    }else{
      return teamAbbreviations[code];
    }
}
