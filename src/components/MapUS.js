import React from 'react';

import TeamMap from './../maps/TeamMap';
import TeamMapWCC from './../maps/TeamMapWCC';
import TeamMapRMC from './../maps/TeamMapRMC';
import TeamMapMWC from './../maps/TeamMapMWC';
import TeamMapSAC from './../maps/TeamMapSAC';
import TeamMapGLC from './../maps/TeamMapGLC';
import TeamMapNEC from './../maps/TeamMapNEC';
import TeamMapCAC from './../maps/TeamMapCAC';

export default class MapUS extends React.Component {
    render(){
        const { clickedTeam, conferenceFilter, selectedTeamMap, teamAbbreviations, removeMarker } = this.props;
        if (conferenceFilter === "WCC") {
          return (
            <TeamMapWCC clickedTeam={ clickedTeam }
                     conferenceFilter={ conferenceFilter }
                     selectedTeamMap={ selectedTeamMap }
                     teamAbbreviations={ teamAbbreviations }
                     removeMarker={ removeMarker } />
            );
        }else if (conferenceFilter === "RMC") {
          return (
            <TeamMapRMC clickedTeam={ clickedTeam }
                     conferenceFilter={ conferenceFilter }
                     selectedTeamMap={ selectedTeamMap }
                     teamAbbreviations={ teamAbbreviations }
                     removeMarker={ removeMarker } />
            );
        }else if(conferenceFilter === "MWC"){
          return (
            <TeamMapMWC clickedTeam={ clickedTeam }
                     conferenceFilter={ conferenceFilter }
                     selectedTeamMap={ selectedTeamMap }
                     teamAbbreviations={ teamAbbreviations }
                     removeMarker={ removeMarker } />
            );
        }else if(conferenceFilter === "SAC"){
          return (
            <TeamMapSAC clickedTeam={ clickedTeam }
                     conferenceFilter={ conferenceFilter }
                     selectedTeamMap={ selectedTeamMap }
                     teamAbbreviations={ teamAbbreviations }
                     removeMarker={ removeMarker } />
            );
        }else if(conferenceFilter === "GLC"){
          return (
            <TeamMapGLC clickedTeam={ clickedTeam }
                     conferenceFilter={ conferenceFilter }
                     selectedTeamMap={ selectedTeamMap }
                     teamAbbreviations={ teamAbbreviations }
                     removeMarker={ removeMarker } />
            );
        }else if(conferenceFilter === "NEC"){
          return (
            <TeamMapNEC clickedTeam={ clickedTeam }
                     conferenceFilter={ conferenceFilter }
                     selectedTeamMap={ selectedTeamMap }
                     teamAbbreviations={ teamAbbreviations }
                     removeMarker={ removeMarker } />
            );
        }else if(conferenceFilter === "CAC"){
          return (
            <TeamMapCAC clickedTeam={ clickedTeam }
                     conferenceFilter={ conferenceFilter }
                     selectedTeamMap={ selectedTeamMap }
                     teamAbbreviations={ teamAbbreviations }
                     removeMarker={ removeMarker } />
            );
        }else{
          return ( 
            <TeamMap clickedTeam={ clickedTeam }
                     conferenceFilter={ conferenceFilter }
                     selectedTeamMap={ selectedTeamMap }
                     teamAbbreviations={ teamAbbreviations }
                     removeMarker={ removeMarker } />
            );         
        }
    }
}