import React, { Component } from 'react'
import Main from '../templates/Main'

const headerProps = {
    icon: "cog",
    title: 'Configurações Pessoal',
    subtitle: 'Personalize seu sistema!'
}

export default class PersonalSetting extends Component {
    render() {
        return (
            <Main {...headerProps}>
                <div className='lead'>Parametrização do sistema</div>
                <hr />

                <p> Plataforma para você investir com inteligencia!</p>
                <div className="formulario">
                    Percentual de lucro esperado: <input type="text"></input>
                    <button className="btn btn-primary"
                        onClick={e => this.save(e)}>
                        Salvar
                    </button>
                </div>
            </Main>
        )
    }
}