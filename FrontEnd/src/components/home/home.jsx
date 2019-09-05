import React, { Component } from 'react'
import Main from '../templates/Main'
import { object } from 'prop-types';
import './home.css'

let Rss = require('rss-parser')
let rss = new Rss();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
const ulrGloboEconomia = 'http://g1.globo.com/dynamo/economia/rss2.xml'

let noticias = {}

export default class Home extends Component {

    constructor(props) {
        super();

        this.state = {
            loading: 'initial',
            data: ''
        };
    }

    componentDidMount() {
        rss.parseURL(CORS_PROXY + ulrGloboEconomia)
            .then((object) => {
                noticias = object
                this.setState({ loading: 'FInisi' })
            });
    }

    renderNews() {
        return noticias.items.map(noticia => {
            return (
                <div className="news">

                    <h5><a href={noticia.link}>{noticia.title}</a></h5>
                    <br />
                    <p>{noticia.contentSnippet}</p>
                    < hr />

                </div>
            )
        })
    }

    render() {
        if (this.state.loading === 'initial') {
            return (
                <Main icon="home" title="Home"
                    subtitle="Sua plataforma de investimento!!!">
                    <div className='display-4'>Bem Vindo!</div>
                    <hr />
                    <p className="mb-0"> Acompanhe as noticias</p>
                </Main>
            )
        }

        return (
            <Main icon="home" title="Home"
                subtitle="Sua plataforma de investimento!!!">
                <div className='display-4'>Bem Vindo!</div>
                <hr />
                <p className="mb-0"> Plataforma para você investir com inteligencia!</p>
                <hr />
                <h1 className='align=center'>Noticias</h1>
                <hr />
                {console.log(noticias)}

                {this.renderNews()}

            </Main>
        )


    }

}