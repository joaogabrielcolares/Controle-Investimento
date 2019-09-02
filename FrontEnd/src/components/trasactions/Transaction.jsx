import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'

const backEndUrl = 'http://localhost:3004/Wallet'

const headerProps = {
    icon: '',
    title: 'Transações',
    subtitle: 'Cadastre suas transações aqui!!!'
}
const initialState = {
    transaction: {
        tipo: "Compra",
        papel: "",
        valor: "",
        data: ""
    },
    list: []
}

export default class Transaction extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(backEndUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Tipo da Operação</label>
                            <select name="tipo" className="form-control"
                                onChange={e => this.updateField(e)}
                                value={this.state.transaction.tipo}>
                                <option value="Compra">Compra</option>
                                <option value="Venda">Venda</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Papel</label>
                            <input type="text" className="form-control"
                                name="papel"
                                value={this.state.transaction.papel}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o papel..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Valor</label>
                            <input type="text" className="form-control"
                                name="valor"
                                value={this.state.transaction.valor}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o valor..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Data</label>
                            <input type="text" className="form-control"
                                name="data"
                                value={this.state.transaction.data}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe a data..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    updateField(event) {
        const transaction = { ...this.state.transaction } //Nunca altere diretamente o estado, sempre clone depois use o setState

        transaction[event.target.name] = event.target.value
        this.setState({ transaction })
    }

    renderTable() {
        return (
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Papel</th>
                        <th>Valor Médio</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(transaction => {
            return (
                <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.tipo}</td>
                    <td>{transaction.papel}</td>
                    <td>{transaction.valor}</td>
                    <td>{transaction.data}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(transaction)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(transaction)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    save() {
        const transaction = this.state.transaction

        const method = transaction.id ? 'put' : 'post' //Caso id estiver vazio é um novo usuário, caso contrario atualiza o registro 
        const url = transaction.id ? `${backEndUrl}/${transaction.id}` : backEndUrl

        console.log(url, transaction);
        console.log(url);

        axios[method](url, transaction)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)

                this.setState({ transaction: initialState.transaction, list }) //Limpa o form e atualiza a lista de
            })
    }

    clear() {
        this.setState({ transaction: initialState.transaction })
    }

    getUpdatedList(transaction, add = true) {
        const list = this.state.list.filter(u => u.id !== transaction.id) //Filtra a lista retirando o atual registro
        if (add) list.unshift(transaction) //Add registro no topo
        return list
    }

    load(transaction) {
        this.setState({ transaction })
    }

    remove(transaction) {
        axios.delete(`${backEndUrl}/${transaction.id}`).then(resp => {
            const list = this.getUpdatedList(transaction, false)
            this.setState({ list })
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}