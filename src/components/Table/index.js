import React from 'react';

const Table = (props) => {
    const { logradouro, complemento, bairro, cidade, estado, cep } = props.contentTable;
    return(
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">CEP</th>
                        <th scope="col">Logradouro</th>
                        <th scope="col">Complemento</th>
                        <th scope="col">Bairro</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{cep ? cep : '#'}</th>
                        <td>{logradouro ? logradouro : '#'}</td>
                        <td>{complemento ? complemento : '#'}</td>
                        <td>{bairro ? bairro : '#'}</td>
                        <td>{cidade ? cidade : '#'}</td>
                        <td>{estado ? estado : '#'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table;
