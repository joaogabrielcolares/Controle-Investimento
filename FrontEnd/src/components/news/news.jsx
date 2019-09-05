import React, { Component } from 'react'
import Main from '../templates/Main'


const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
const ulrGloboEconomia = 'http://g1.globo.com/dynamo/economia/rss2.xml'

let Rss = require('rss-parser')
let rss = new Rss();

let noticias = {}

const headerProps = {
    icon: 'newspaper-o',
    title: 'Noticias do Mercado',
    subtitle: 'Fique por dentro de tudo que acontece!',

}

export default class News extends Component {
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
                <Main{...headerProps}>
                    <div className='display-4'>Noticias!</div>
                    <hr />
                    <p className="mb-0"> Acompanhe as noticias</p>
                </Main>
            )
        }

        return (
            <Main{...headerProps}>
                < div className='display-4' > Noticias!</div >
                <hr />
                <p className="mb-0"> Acompanhe as noticias!</p>
                <hr />
                {this.renderNews()}

            </Main >
        )


    }

}