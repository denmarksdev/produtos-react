import React from 'react'

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

    loadData = id => {
        this.props.loadProdutos(id)
        this.props.loadCategoria(id)
    }

    renderProduto = (item, index) => {
        return (
            <div>
                <div key={index} style={{ display: 'flex', maxHeight: '40px', marginBottom: '10px' }} >
                    <p className='well'  >
                        {item.produto}
                    </p>
                    <button className='btn btn-primary'
                        onClick={() => {
                            this.props.removeProduto(item)
                                .then(res => this.loadData(this.props.match.params.catId))
                        }}>
                        Excluir
                    </button>
                </div>
            </div>
        )
    }

    render() {
        const {
            match,
            produtos,
            categoria,
            removeProduto
        } = this.props

        console.log(removeProduto)

        return (
            <div>
                <h1>{categoria.nome} (cód: {match.params.catId})</h1>
                {
                    produtos.map(this.renderProduto)
                }
                {
                    produtos.length === 0  &&
                    <span class="label label-info">Sem produtos</span>
                }
            </div>
        )
    }
}