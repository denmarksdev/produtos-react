import axios from 'axios'

const customApi = axios.create({
    baseURL: 'http://localhost:3001/'
})

const api = {
    loadCategorias: () => customApi.get('categorias'),
    deleteCategoria: id => customApi.delete('categorias/' + id),
    postCategoria : nome => customApi.post('categorias', { nome }),
    editCategoria  : categoria => customApi.put('categorias/' + categoria.id , categoria),
    getCategoria : id => customApi.get(`categorias/${id}`),
    getProdutos: categoria => customApi.get(`produtos?categoria=${categoria}`),
    createProduto: produto => customApi.post(`produtos`,produto),
    deleteProduto: id => customApi.delete('produtos/' + id)
}

export default api