import React from 'react';
import TeamRankingTable from './../components/tables/TeamRankingTable'

export default class TeamRankings extends React.Component {
  render() {  
    return (
    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <div style={{backgroundColor: '#fff', padding: '5%', borderRadius: '5px'}}>
          <TeamRankingTable
            playerData={ this.props.playerData }
            changePage={ this.changePage }
          />
        </div>  
    </div>
    );
  }
}
