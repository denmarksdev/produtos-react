import React from 'react'

export default class Categoria extends React.Component {
    render(){
        const { match } = this.props
        return <h1>Categoria {match.params.catId}</h1>
    }
}