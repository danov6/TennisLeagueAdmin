import React from 'react';
import Player from './../Player';

const player_properties = ["Name","Team","Conference","PR","Points"];

var _ = require('lodash');

var teamAbbreviations = require('datasets-us-states-abbr-names');

export default class RankingTable extends React.Component {
    componentDidMount(){
        //Grabs the list of players
        console.log('Table mounted')
        fetch('http://localhost:3001/players')
        .then(
            res => res.json()
        ).then((response) =>
            this.props.setPlayers(response.players)
        );
    }
    render(){

    const { order, orderBy, conferenceFilter, selectedTeamMap, doOrderBy, setSelectedPlayer, setPinwheel, changePage, pinwheelActive } = this.props;  
    let { playerData } = this.props;
    
    // lodash library used to sort the list
    
    playerData = _.orderBy(playerData, (item) => {
        return item[orderBy]
    }, order);

    // does the filters based on selection
    playerData = _.map(playerData, function(eligible) {

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

    playerData = _.without(playerData, undefined);

    // list of players
    const players = playerData.map((item, index)=>{
      return <Player data={ item } key={ item._id } rank={ index } orderBy={ orderBy } changePage={ changePage } setSelectedPlayer={ setSelectedPlayer } playerData={ playerData } setPinwheel={ setPinwheel } />
    }); 

    const header_properties = player_properties.map((prop,index)=>{
      return <th key={index}><a href="#" onClick={ doOrderBy } data-value={prop.toLowerCase()}>{prop}</a></th>
    });

    return (
        <div>
            <h2 className="sub-header">{conferenceFilter + " "} Player Rankings</h2>
            <div className="table-responsive">
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
