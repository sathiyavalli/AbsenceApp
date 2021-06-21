import React from 'react';
import './App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import '../node_modules/bootstrap-css-only/css/bootstrap.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';




class App extends React.Component {
    constructor(props) {
            super(props);
            /*column declarations and intializing the data array*/
            this.state = {
                datas: [],
                comments: [],
                loading: false,
                columns: [{
                        filter: textFilter(),
                        dataField: 'id',
                        text: 'Id',
                        sort: true
                    },
                    {
                        dataField: 'Item',
                        text: 'Item Name',
                        sort: true
                    }, {
                        dataField: 'Price',
                        text: 'Product Price',
                        sort: true
                    }
                ]
            }
        }
        /*retreiving the value from github json file*/
    componentDidMount() {
            let url = "https://my-json-server.typicode.com/sathiyavalli/frontend-frieghtChallenge/datas"
            fetch(url)
                .then(res => res.json())
                .then((data) => {
                    this.setState({ datas: data })
                    console.log(this.state.datas)
                })
                .catch(console.log)
        }
        /*Table formation by adding all values that is retreived above*/
    render() {
        return ( <
            div className = "container" >
            <
            center > < h3 > { React.version } < /h3></center >
            <
            BootstrapTable striped hover keyField = 'id'
            data = { this.state.datas }
            columns = { this.state.columns }
            filter = { filterFactory() }
            pagination = { paginationFactory() }
            cellEdit = { cellEditFactory({ mode: 'click' }) }
            /> <
            a href = "/Details" > Full Details < /a> < /
            div >
        );
    }
}


export default App;