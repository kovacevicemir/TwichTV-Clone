import React from 'react'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'


class StreamEdit extends React.Component{
        componentDidMount(){
            this.props.fetchStream(this.props.match.params.id)
        }
        render(){
            if(!this.props.stream){
                return <div>Loading...</div>
            }

            return(
                <div>
                    {this.props.stream.title}
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
        fetchStream:fetchStream
    }
)(StreamEdit)