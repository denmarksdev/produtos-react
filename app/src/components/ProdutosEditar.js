import React from 'react'
import { Redirect } from 'react-router-dom'

export default class ProdutoEditar extends React.Component {

    state = {
        redirect: '',
        id:0
    }

    componentDidMount() {
        this.props.readProduto(this.props.match.params.id)
            .then(res => res.data)
            .then(item => {
                this.setState({ id: item.id })
                this.refs.produto.value = item.produto
                this.refs.categoria.value = item.categoria
            })
    }


    onSave = () => {
        const produto = {
            id: this.state.id,
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.editProduto(produto)
            .then(res => {
                this.refs.produto.value = ''
                this.refs.categoria.value = ''
                this.setState({ redirect: '/produtos/categoria/' + produto.categoria })
            })
    }

    render() {
        const { redirect } = this.state

        if (redirect) {
            return <Redirect to={redirect} />
        }

        return (
            <div>
                <h1>Editar produto</h1>
                <select
                    className='form-control'
                    style={{ maxWidth: '200px' }}
                    ref='categoria' >
                    {
                        this.props.categorias.map(c =>
                            <option key={c.id} value={c.id} >
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

