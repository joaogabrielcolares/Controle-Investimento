import React, { Component } from 'react'
import Main from '../templates/Main'

const backEndUrl = 'http://localhost:3004/Wallet'

const headerProps = {
    icon: '',
    title: 'Transações',
    subtitle: 'Cadastre suas transações aqui!!!'
}
const initialState = {
    transaction: {
        tipo: "",
        Papel: "",
        valor: "",
        data: ""
    },
    list: []
}

export default class Transaction extends Component {

    state = { ...initialState }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Tipo da Operação</label>
                            <select name="tipo" className="form-control"
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


    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}