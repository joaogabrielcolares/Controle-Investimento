import React, { Component } from 'react'

import axios from 'axios'
import Main from '../templates/Main'
import Form from '../templates/Form'
import InputText from '../templates/inputs/InputText'
import SelectText from '../templates/inputs/SelectText'

const backEndUrl = 'http://localhost:3004/Trasactions'
const backEndWallet = 'http://localhost:3004/Wallet'

const headerProps = {
    icon: '',
    title: 'Transações',
    subtitle: 'Cadastre suas transações aqui! **As informações inseridas aqui influenciam diretamente na sua carteira**'
}
const initialState = {
    transaction: {
        tipo: "Compra",
        papel: "",
        valor: "",
        quantidade: "",
        data: ""
    },
    list: []
}
let walletList = {};

export default class Transaction extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(backEndUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    renderForm() {
        return (
            <Form>
                <div className="row">
                    <SelectText
                        col_md='2' label='Tipo de transição' name='tipo'
                        value={this.state.transaction.tipo}
                        onChange={e => this.updateField(e)}
                        placeholder="Informe o tipo">
                        <option value="Compra">Compra</option>
                        <option value="Venda">Venda</option>
                    </SelectText>

                    <InputText
                        col_md='2' label='Papel' name='papel' type="text"
                        value={this.state.transaction.papel}
                        onChange={e => this.updateField(e)}
                        placeholder="Informe o papel"
                    />

                    <InputText
                        col_md='2' label='Valor' name='valor' type="text"
                        value={this.state.transaction.valor}
                        onChange={e => this.updateField(e)}
                        placeholder="Informe o Valor"
                    />

                    <InputText
                        col_md='2' label='Quantidade' name='quantidade' type="number"
                        value={this.state.transaction.quantidade}
                        onChange={e => this.updateField(e)}
                        placeholder="Informe a quantidade"
                    />

                    <InputText
                        col_md='2' label='Data' name='data' type="date"
                        value={this.state.transaction.data}
                        onChange={e => this.updateField(e)}
                        placeholder="Informe o Data"
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
            </Form >
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
                        <th>Quantidade</th>
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
                    <td>{transaction.quantidade}</td>
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

    async save() {
        const transaction = this.state.transaction

        const method = transaction.id ? 'put' : 'post' //Caso id estiver vazio é um novo usuário, caso contrario atualiza o registro
        const url = transaction.id ? `${backEndUrl}/${transaction.id}` : backEndUrl

        const updatedWallet = await this.updateWallet()
        if (updatedWallet) {
            axios[method](url, transaction)
                .then(resp => {
                    const list = this.getUpdatedList(resp.data)

                    this.setState({ transaction: initialState.transaction, list }) //Limpa o form e atualiza a lista de
                })
        }
    }

    async updateWallet() {
        let transaction = this.state.transaction
        let wallet = {
            papel: transaction.papel,
            quantidade: transaction.tipo === "Venda" ? transaction.quantidade * -1 : transaction.quantidade,
            precoMedioCompra: transaction.valor
        }

        const resp = await axios(backEndWallet);
        walletList = resp.data.filter(u => u.papel === transaction.papel)

        if (!walletList.length || walletList.length === 0) {
            if (transaction.tipo === "Compra") {
                axios["post"](backEndWallet, { ...wallet })
            } else {
                alert("Não é possível vender um papel que você não tem!")
                return false;
            }
        } else {
            wallet.quantidade = Number.parseInt(walletList[0].quantidade) + Number.parseInt(wallet.quantidade)
            axios['put'](`${backEndWallet}/${walletList[0].id}`, { ...wallet })
        }
        return true;
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