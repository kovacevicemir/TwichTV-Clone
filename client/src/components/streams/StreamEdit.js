import React from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'
import _ from 'lodash'

class StreamEdit extends React.Component{
    componentDidMount(){
        console.log(this.props)
        this.props.fetchStream(this.props.match.params.id)
    }

    //formValues -> initialValues from below 'StreamForm'
    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    }
    
    render(){
        if(!this.props.stream){
            return <div>Loading...</div>
        }

        return(
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')} 
                    onSubmit={this.onSubmit} 
                />
            </div>
        )
    }
}

//ownProps is refference to props thats showing in streamEdit component above
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(
    mapStateToProps,{
        fetchStream:fetchStream,
        editStream:editStream
    }
)(StreamEdit)