import React from 'react';

export default class Player extends React.Component {

  render(){
    const { data, orderBy, rank, showModal } = this.props;

    return (    
      <tr key={data.id}>
        <td>{ rank + 1 }</td>
        <td className={ orderBy === "name" ? "active" : null }>{data.name}</td>
        <td className={ orderBy === "team" ? "active" : null }>{data.team}</td>
        <td className={ orderBy === "conference" ? "active" : null }>{data.conference}</td>
        <td className={ orderBy === "pr" ? "active" : null }>{data.pr}</td>
        <td className={ orderBy === "points" ? "active" : null }>{data.points}</td>
        <td>
          <button type="button" className="btn btn-default btn-sm" onClick={ showModal } data-value={data.id}>
            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
          </button>
        </td>
      </tr>    
    )
  }
}