import React from 'react'
import { Redirect } from 'react-router-dom'

export default class ProdutosNovo extends React.Component {

    state =
    {
      redirect : ''
    }

    onSave = () => {
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.createProduto(produto)
            .then( res => {
                this.refs.produto.value = ''
                this.setState({ redirect: '/produtos/categoria/' + produto.categoria  })
            })
    }

    render() {
        const { categorias } = this.props
        const { redirect } = this.state
        
        if (redirect){
            return <Redirect  to={redirect} />
        }

        return (
            <div>
                <h1>Novo produto</h1>
                <select
                    className='form-control'
                    style={{ maxWidth: '200px' }}
                    ref='categoria' >
                    {
                        categorias.map(c =>
                            <option key={c.id}  value={c.id}>
                                {c.nome}
                            </option>
                        )
                    }
                </select>
                <input
                    className='form-control'
                    ref='produto'
                    placeholder='Nome do novo produto' />
                <button onClick={this.onSave} 
                    className='btn btn-primary' >Salvar</button>
            </div>
        )
    }
}