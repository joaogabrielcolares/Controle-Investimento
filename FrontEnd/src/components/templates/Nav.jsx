import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>

            <Link to="/">
                <i className="fa fa-accessible-icon"></i> Configuração pessoal
            </Link>
            <Link to="/wallet">
                <i className="fa fa-accessible-icon"></i> Minha Carteira
            </Link>
            <Link to="/transactions">
                <i className="fa fa-accessible-icon"></i> Transações
            </Link>
        </nav>
    </aside>
