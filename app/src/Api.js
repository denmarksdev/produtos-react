import axios from 'axios'

const customApi = axios.create({
    baseURL: 'http://localhost:3001/'
})

const api = {
    loadCategorias: () => customApi.get('categorias'),
    deleteCategoria: id => customApi.delete('categorias/' + id),
    postCategoria : nome => customApi.post('categorias', { nome }),
    getCategoria : id => customApi.get(`categorias/${id}`),

    getProduto: id => customApi.get(`produtos?categoria=${id}`)
}

export default api