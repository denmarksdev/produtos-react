import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './components/Home'
import Sobre from './components/Sobre'
import Produtos from './components/Produtos'

class App extends Component {

  state = {
    categorias: [],
    produtos: [],
    categoria: {},
  }

  loadCategorias = () => {
    this.props.api.loadCategorias()
      .then(res => res.data)
      .then(categorias => {
        this.setState({ categorias })
      })
  }

  removeCategoria = (id) => {
    this.props.api.deleteCategoria(id)
      .then(() => {
        this.setState({
          categorias: this.state.categorias.filter(c => c.id !== id)
        })
      })
  }

  addCategoria = (nome) => {
    return this.props.api.postCategoria(nome)
      .then(res => res.data)
      .then(novaCategoria => {
        this.setState({
          categorias: [...this.state.categorias, novaCategoria]
        })
      })
  }

  editCategoria = categoria => {
    return this.props.api.editCategoria(categoria)
      .then(res => this.loadCategorias())
  }

  loadCategoria = id => {
    return this.props.api.getCategoria(id)
      .then(res => res.data)
      .then(categoria => this.setState({ categoria }))
  }

  createProduto = produto => {
    return this.props.api.createProduto(produto)
  }

  loadProdutos = idCategoria => {
    return this.props.api.getProdutos(idCategoria)
      .then(res => res.data)
      .then(produtos => this.setState({ produtos }))
  }

  removeProduto = (produto) => {
    return this.props.api.deleteProduto(produto.id)
  }

  readProduto = (id) => {
    return this.props.api.readProduto(id)
  }

  editProduto = (produto) =>  {
    return this.props.api.editProduto(produto)
  }

  render() {
    return (
      <Router>
        <div>
          <nav className='navbar navbar-inverse' >
            <div className='container' >
              <div className='navbar-header' >
                <a href='/' className='navbar-brand'>Gerenciador de produtos</a>
              </div>
              <ul className='nav navbar-nav'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/produtos'>Produtos</Link></li>
                <li><Link to='/sobre'>Sobre</Link></li>
              </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/sobre' component={Sobre} />
            <Route path='/produtos'
              render={(props) =>
                <Produtos
                  {...props}
                  loadCategorias={this.loadCategorias}
                  removeCategoria={this.removeCategoria}
                  addCategoria={this.addCategoria}
                  editCategoria={this.editCategoria}
                  categorias={this.state.categorias}
                  createProduto={this.createProduto}
                  loadProdutos={this.loadProdutos}
                  loadCategoria={this.loadCategoria}
                  produtos={this.state.produtos}
                  categoria={this.state.categoria}
                  removeProduto={this.removeProduto}
                  readProduto={this.readProduto}
                  editProduto={this.editProduto}
                />}
            />

          </div>
        </div>
      </Router>
    )
  }
}

export default App;
