import React from 'react'
import { Route, Link } from 'react-router-dom'
import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria';

import apis from '../Api';

const categoriaContainer = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '10px'
}

export default class Produtos extends React.Component {

    state = {
        categorias: []
    }

    componentDidMount() {
        apis.loadCategorias()
            .then(res => res.data)
            .then(categorias => {
                this.setState({ categorias })
            })
    }

    removeCategoria = (id) => {
        apis.deleteCategoria(id)
            .then(() => {
                this.setState({
                    categorias: this.state.categorias.filter(c => c.id !== id)
                })
            })
    }

    renderCategorias = (cat, index) => {
        return (
            <li key={index} style={categoriaContainer} >
                <button className='btn' style={{ maxWidth: 35, maxHeight: 35, marginRight: '10px', }}
                    onClick={() => this.removeCategoria(cat.id)}>
                    <span style={{ fontSize: 10, textAlign: 'center', }} className='glyphicon glyphicon-remove'></span>
                </button>
                <Link style={{ flexBasis: 100 }}
                    to={`/produtos/categoria/${cat.id}`}>
                    {cat.nome}
                </Link>
            </li>
        )
    }

    handleNewCategoria = key => {
        const ENTER_KEY = 13;
        if (key.keyCode === ENTER_KEY) {
            apis.postCategoria(this.refs.categoria.value)
                .then(res => res.data)
                .then(novaCategoria => {
                    this.setState({
                        categorias: [...this.state.categorias, novaCategoria]
                    })
                    this.refs.categoria.value = ''
                })
        }
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
                    <div className='well well-sm' >
                        <input className='form-control'
                            type='text'
                            ref='categoria'
                            placeholder='Nova categoria'
                            onKeyUp={this.handleNewCategoria} />
                    </div>
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