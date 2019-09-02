import React, { Component } from 'react'

import axios from 'axios'
import Main from '../templates/Main'
import InputText from '../templates/inputs/InputText'
// import Form from '../templates/Form'

const headerProps = {
    icon: 'Wallets',
    title: 'Carteira',
    subtitle: 'Administre sua carteira aqui!!!'
}

const backEndUrl = 'http://localhost:3004/Wallet'

const initialState = {
    wallet: {
        papel: "",
        quantidade: "",
        precoMedioCompra: ""
    },
    list: []
}

export default class Wallet extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(backEndUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ wallet: initialState.wallet })
    }

    save() {
        const wallet = this.state.wallet

        const method = wallet.id ? 'put' : 'post' //Caso id estiver vazio é um novo usuário, caso contrario atualiza o registro 
        const url = wallet.id ? `${backEndUrl}/${wallet.id}` : backEndUrl

        console.log(url, wallet);
        console.log(url);

        axios[method](url, wallet)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)

                this.setState({ wallet: initialState.wallet, list }) //Limpa o form e atualiza a lista de
            })
    }

    getUpdatedList(wallet, add = true) {
        const list = this.state.list.filter(u => u.id !== wallet.id) //Filtra a lista retirando o atual registro
        if (add) list.unshift(wallet) //Add registro no topo
        return list
    }

    updateField(event) {
        const wallet = { ...this.state.wallet } //Nunca altere diretamente o estado, sempre clone depois use o setState

        wallet[event.target.name] = event.target.value
        this.setState({ wallet })
    }

    load(wallet) {
        this.setState({ wallet })
    }

    remove(wallet) {
        axios.delete(`${backEndUrl}/${wallet.id}`).then(resp => {
            const list = this.getUpdatedList(wallet, false)
            this.setState({ list })
        })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">

                    <InputText
                        col_md='2' label='Papeis' name='papel'
                        value={this.state.wallet.papel}
                        onChange={e => this.updateField(e)}
                        placeholder="Informe o papel"
                    />

                    <InputText
                        col_md='2' label='Quantidade' name='quantidade'
                        value={this.state.wallet.quantidade}
                        onChange={e => this.updateField(e)}
                        placeholder="Informe a quantidade"
                    />

                    <InputText
                        col_md='2' label='Preço Médio de compra' name='precoMedioCompra'
                        value={this.state.wallet.precoMedioCompra}
                        onChange={e => this.updateField(e)}
                        placeholder="Informe a preço medio da compra"
                    />
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

    renderTable() {
        return (
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Papel</th>
                        <th>Quantidade</th>
                        <th>Valor Médio</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(wallet => {
            return (
                <tr key={wallet.id}>
                    <td>{wallet.id}</td>
                    <td>{wallet.papel}</td>
                    <td>{wallet.quantidade}</td>
                    <td>{wallet.precoMedioCompra}</td>

                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(wallet)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(wallet)}>
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