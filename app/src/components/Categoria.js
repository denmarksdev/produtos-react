import React from 'react'
import { Link } from 'react-router-dom'

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
                <div key={index} style={{ display: 'flex' }} >
                    <p className='well'  >
                        {item.produto}
                    </p>
                    <div style={{ display: 'flex', maxHeight:'30px', justifyItems:'center', marginLeft:'5px'   }} >
                        <Link style={{ marginRight: '5px' }}  className='btn btn-primary'
                         to={'/produtos/editar/' + item.id}>Editar</Link>
                        <button className='btn btn-danger'
                            onClick={() => {
                                this.props.removeProduto(item)
                                    .then(res => this.loadData(this.props.match.params.catId))
                            }}>
                            Excluir
                    </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {
            match,
            produtos,
            categoria,
        } = this.props

        return (
            <div>
                <h1>{categoria.nome} (cód: {match.params.catId})</h1>
                {
                    produtos.map(this.renderProduto)
                }
                {
                    produtos.length === 0 &&
                    <span className="label label-info">Sem produtos</span>
                }
            </div>
        )
    }
}