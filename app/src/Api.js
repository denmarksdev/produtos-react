import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

const  apis = {
    loadCategorias: () => api.get('categorias'),
    deleteCategoria: id => api.delete('categorias/' + id),
    postCategoria : nome => api.post('categorias', { nome }),
    getCategoria : id => api.get(`categorias/${id}`),

    getProduto: id => api.get(`produtos?categoria=${id}`)
}

export default apis
