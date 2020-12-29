import MaterialTable from 'material-table';
import React, {Component} from 'react';
import {connect} from "react-redux";
import { fetchdataImages } from "../../store/actions/imageAction";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : []
        }
    }

    componentDidMount(){
        this.props.fetchData(this.onResponse);
    }

    onResponse = (res) => {
        this.setState({data :res})
    }

    setData = (data) => {
        this.setState({data})
    }

    render() {

        const gridHeader = [
            {
                title : 'AlbumId',
                field : 'albumId',
                hidden : false
            },
            {
                title : 'Id',
                field : 'id',
                hidden : false
            },
            {
                title : 'Title',
                field : 'title',
                hidden : false
            },
            {
                title : 'Url',
                field : 'url',
                hidden : false
            },
            {
                title : 'Thumbnail Url',
                field : 'thumbnailUrl',
                hidden : false
            }
        ]   
        let data = this.state.data;

        return (
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
            />
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