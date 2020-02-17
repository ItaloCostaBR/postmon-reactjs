import React, { Component } from 'react';

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

        this.getInfoAddress(this.state.cep)
        .then( res => {
            this.setState({...this.state, data: res, loading: false, error: false});
        }).catch( err=> {
            console.log(err)
            this.setState({...this.state, data: {}, loading: false, error: true});
        });
    }
    render() {
        const { logradouro, complemento, cep, bairro, cidade, estado } = this.state.data;
        return (
            <main>
                <div className="container">
                    <form onSubmit={this.handlerSubmitCep}>
                        <input type="text" name="cep" autoComplete="off" onChange={this.handleChangeCep} />
                        <button type="submit">Submit</button>
                    </form>
                    {this.state.loading ? 'Loading...' : (
                        this.state.error ? (
                            <p>Error</p>
                        ) : (
                            logradouro || complemento ? (
                                <p>Address: {logradouro + ' ' + complemento + ' - ' + cep + '. ' + bairro + ', ' + cidade + ' - ' + estado }</p>
                            ) : ''
                        )
                    )}
                </div>
            </main>
        )
    }
}
