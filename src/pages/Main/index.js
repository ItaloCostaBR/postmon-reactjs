import React, { Component } from 'react';
import InputMask from "react-input-mask";
import './style.scss';
import TableComponent from '../../components/Table';

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            loading: false,
            error: false,
            cep: null,
        }

        this.handlerSubmitCep = this.handlerSubmitCep.bind(this);
        this.handleChangeCep = this.handleChangeCep.bind(this);
    }
    getInfoAddress = async (cep) => {
        this.setState({...this.state, loading: true});
        let response = await fetch(`https://api.postmon.com.br/v1/cep/${cep}`);
        let data = await response.json();
        return data;
    }
    handleChangeCep = e => {
        this.setState({...this.state, cep: e.target.value});
    }
    handlerSubmitCep = e => {
        e.preventDefault();
        if(this.state.cep !== null) {
            this.getInfoAddress(this.state.cep)
                .then( res => {
                    this.setState({...this.state, data: res, loading: false, error: false});
                }).catch( err=> {
                    console.log(err)
                    this.setState({...this.state, data: {}, loading: false, error: true});
                });
        } else {
            alert('O campo de CEP é obrigatório.')
        }
    }
    render() {
        return (
            <main>
                <div className="container py-5">
                    <form className="form-cep" onSubmit={this.handlerSubmitCep}>
                        <div className="form-group">
                            <label htmlFor="cep">Informe o CEP</label>
                            <InputMask
                            mask="99999-999"
                            type="text"
                            className="form-control"
                            id="cep"
                            name="cep"
                            autoComplete="off"
                            onChange={this.handleChangeCep} />
                        </div>
                        <button type="submit" className="btn btn-dark">Buscar</button>
                    </form>
                    <div id="result">
                        <div className="card">
                            <div className="card-header">
                                Resultado da busca
                            </div>
                            <div className="card-body">
                                {
                                    this.state.loading ? (
                                        <div className="spinner-border text-warning" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : (
                                        this.state.error
                                        ? ( <p>Ops! Algo deu errado :(</p> )
                                        : <TableComponent contentTable={this.state.data} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
