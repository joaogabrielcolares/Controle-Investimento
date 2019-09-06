import React, { Component } from 'react'
import Main from '../templates/Main'

export default class Home extends Component {
    render() {
        return (
            <Main icon="home" title="Home"
                subtitle="Sua plataforma de investimento!!!">
                <div className='display-4'>Bem Vindo!</div>
                <hr />
                <p className="mb-0"> Sua plataforma de investimentos</p>
            </Main>
        )
    }
}