import React from 'react'
import { Route, Link } from 'react-router-dom'
import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria';
import ProdutosNovo from './ProdutoNovo';
import ProdutoEditar from './ProdutosEditar'

const categoriaContainer = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '10px'
}

export default class Produtos extends React.Component {

    state = {
        editingCategoria: '',
        emails: []
    }

    componentDidMount() {
        this.props.loadCategorias()
    }

    cancelEditing = () => {
        this.setState({ editingCategoria: '' })
    }

    renderCategorias = (cat, index) => {
        const { editingCategoria } = this.state
        return (
            <li key={index} style={categoriaContainer} >
                {
                    editingCategoria === cat.id &&
                    <div className='input-group'>
                        <div className='input-group-btn'>
                            <input ref={'cat-' + cat.id} onKeyUp={this.handleEditCategoria} className='form-control' type='text' defaultValue={cat.nome} />
                            <button className='btn' onClick={this.cancelEditing} >Cancel</button>
                        </div>
                    </div>
                }
                {editingCategoria !== cat.id &&
                    <div>
                        <button className='btn' style={{ maxWidth: 35, maxHeight: 35, marginRight: '10px', }}
                            onClick={() => this.props.removeCategoria(cat.id)}>
                            <span style={{ fontSize: 10, textAlign: 'center', }} className='glyphicon glyphicon-remove'></span>
                        </button>
                        <button className='btn' style={{ maxWidth: 35, maxHeight: 35, marginRight: '10px', }}
                            onClick={() => this.editCategoria(cat)}>
                            <span style={{ fontSize: 10, textAlign: 'center', }} className='glyphicon glyphicon-pencil'></span>
                        </button>
                        <Link style={{ flexBasis: 100 }}
                            to={`/produtos/categoria/${cat.id}`}>
                            {cat.nome}
                        </Link>
                    </div>
                }
            </li>
        )
    }

    editCategoria = categoria => {
        this.setState({
            editingCategoria: categoria.id
        })
    }

    handleNewCategoria = key => {
        const ENTER_KEY = 13;
        if (key.keyCode === ENTER_KEY) {
            this.props.addCategoria(this.refs.categoria.value)
                .then(() => this.refs.categoria.value = '')
        }
    }

    handleEditCategoria = key => {
        const ENTER_KEY = 13;

        if (key.keyCode === ENTER_KEY) {
            this.props.editCategoria({
                id: this.state.editingCategoria,
                produto: this.refs['cat-' + this.state.editingCategoria].value
            })
           .then(() => {
                    this.setState({ editingCategoria: '' })
           })
        }
    }

    render() {
        const { match, categorias } = this.props
        return (
            <div className='row' >
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul style={{ listStyle: 'none' }} >
                        {categorias.map(this.renderCategorias)}
                    </ul>
                    <div className='well well-sm' >
                        <input className='form-control'
                            type='text'
                            ref='categoria'
                            placeholder='Nova categoria'
                            onKeyUp={this.handleNewCategoria} />
                    </div>
                    <Link to='/produtos/novo' >Novo produto</Link>
                </div>
                <div className='col-md-10' >
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url + '/novo'}
                        render={props =>
                            <ProdutosNovo
                                {...props}
                                categorias={categorias}
                                createProduto={this.props.createProduto}
                            />
                        } />
                    <Route path={match.url + '/editar/:id'} render={props =>
                        <ProdutoEditar {...props}
                            readProduto={this.props.readProduto}
                            editProduto={this.props.editProduto}
                            categorias={categorias} />
                    } />

                    <Route exact path={match.url + '/categoria/:catId'} render={props =>
                        <Categoria  {...props}
                            loadProdutos={this.props.loadProdutos}
                            loadCategoria={this.props.loadCategoria}
                            produtos={this.props.produtos}
                            categoria={this.props.categoria}
                            removeProduto={this.props.removeProduto}
                        />
                    } />

                </div>
            </div>
        )
    }
}