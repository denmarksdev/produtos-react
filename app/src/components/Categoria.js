import React from 'react'
import apis from '../Api';

export default class Categoria extends React.Component {

    state = {
        produtos: [],
        categoria: {}
    }

    componentDidMount = () => {
        this.loadData(this.props.match.params.catId);
    }

    componentWillReceiveProps(nextProps) {
        const proximoId = nextProps.match.params.catId
        const idAnterior = this.props.match.params.catId

        if (proximoId === idAnterior) return

        this.loadData(proximoId);
    }

    loadData = (id) => {
        apis.getProduto(id)
            .then(res => res.data)
            .then(produtos => {
                this.setState({ produtos });
            });
        apis.getCategoria(id)
            .then(res => res.data)
            .then(categoria => {
                this.setState({ categoria });
            });
    }

    renderProduto = (item, index) => {
        return (
            <p key={index} className='well'> {item.produto}</p>
        )
    }

    render() {
        const { match } = this.props
        const { produtos, categoria } = this.state
        return (
            <div>
                <h1>{categoria.nome} (cód: {match.params.catId})</h1>
                {
                    produtos.map(this.renderProduto)
                }
            </div>
        )
    }
}