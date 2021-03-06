import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>

            <Link to="/personalSettings">
                <i className="fa fa-cog"></i> Configuração pessoal
            </Link>
            <Link to="/wallet">
                <i className="fa fa-th-list"></i> Minha Carteira
            </Link>
            <Link to="/transactions">
                <i className="fa fa-handshake-o"></i> Transações
            </Link>
            <Link to="/news">
                <i className="fa fa-newspaper-o"></i> Noticias
            </Link>
            <Link to="/">
                <i className="fa fa-file"></i> Relatórios
            </Link>
            <Link to="/">
                <i className="fa fa-calculator"></i> Contabilidade
            </Link>
        </nav>
    </aside>
