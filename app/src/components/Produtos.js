import React from 'react'
import { Route, Link } from 'react-router-dom'
import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria';

import axios from 'axios'

export default class Produtos extends React.Component {

    state = {
        categorias: []
    }

    componentDidMount() {

        axios.get('http://localhost:3001/categorias')
            .then(res => res.data)
            .then(categorias => {
                this.setState({ categorias })
            })
    }

    renderCategorias(cat,index) {
        return (
            <li key={index}>
                <Link to={`/produtos/categoria/${cat.id}`}>Categoria {cat.id}</Link>
            </li>
        )
    }

    render() {
        const { match } = this.props
        const { categorias } = this.state
        return (
            <div className='row' >
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul>
                        {categorias.map(this.renderCategorias)}
                    </ul>
                </div>
                <div className='col-md-10' >
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url + '/categoria/:catId'} component={Categoria} />
                </div>
            </div>
        )

    }
}