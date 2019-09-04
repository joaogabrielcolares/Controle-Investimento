import React, { Component } from 'react'
import Main from '../templates/Main'

let Rss = require('rss-parser')
let rss = new Rss();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
const ulrGloboEconomia = 'http://g1.globo.com/dynamo/economia/rss2.xml'

let noticias = {}

export default class Home extends Component {

    async componentWillMount() {
        await rss.parseURL(CORS_PROXY + ulrGloboEconomia, function (err, feed) {
            noticias = feed;
            console.log('1', noticias);
        })
    }

    renderFeed() {
        return (
            <div>
                aaa
                {/* {noticias: copyright} */}
            </div>
        )
    }

    render() {
        return (
            <Main icon="home" title="Home"
                subtitle="Sua plataforma de investimento!!!">
                <div className='display-4'>Bem Vindo!</div>
                <hr />
                <p className="mb-0"> Plataforma para você investir com inteligencia!</p>

                {this.renderFeed()}
            </Main>
        )
    }

}