import MaterialTable from 'material-table';
import React, {Component} from 'react';
import {connect} from "react-redux";
import { fetchdataImages } from "../../store/actions/imageAction";
import "./Dashboard.css";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            error : ''
        }
    }

    componentDidMount(){
        this.props.fetchData(this.onResponse,this.onError);
    }

    onResponse = (res) => {
        this.setState({data :res})
    }

    onError = (err) => {
        this.setState({error :err})
    }

    //add/update/delete table data
    setData = (data) => {
        this.setState({data})
    }

    getTableHeaders = () => {
        const gridHeader = [
            {
                title : 'AlbumId',
                field : 'albumId',
                hidden : false,
                editable: 'never'
            },
            {
                title : 'Id',
                field : 'id',
                hidden : false,
                editable: 'never'
            },
            {
                title : 'Title',
                field : 'title',
                hidden : false
            },
            {
                title : 'Url',
                field : 'url',
                hidden : false,
                render: rowData => <a href={rowData.url} target="_blank" rel="noreferrer">{rowData.url}</a> 
            },
            {
                title : 'Thumbnail Url',
                field : 'thumbnailUrl',
                hidden : false,
                render: rowData => <a href={rowData.thumbnailUrl} target="_blank" rel="noreferrer">{rowData.thumbnailUrl}</a> 
            }
        ]

        return gridHeader;
    }

    render() {
        const gridHeader = this.getTableHeaders();   
        const data = this.state.data;

        return (
            !this.state.error ? 
            <MaterialTable
                columns={gridHeader}
                data={data}
                title="Images"
                editable={{
                    onRowAdd: newData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          this.setData([...data, newData]);
                          
                          resolve();
                        }, 1000)
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                         this.setData([...dataUpdate]);
            
                          resolve();
                        }, 1000)
                      }),
                    onRowDelete: oldData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataDelete = [...data];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                            this.setData([...dataDelete]);
                        
                          
                          resolve()
                        }, 1000)
                      }),
                  }}
            /> : <div className="errorBox">
                OOPS ! Something went wrong
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
       data: state.imageReducer.data
    };
}

function mapDispatchToProps(dispatch){
    return {
        fetchData:(onResponse,onError) => dispatch(fetchdataImages(onResponse,onError))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);