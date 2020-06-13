import React, { Component } from 'react'
import {connect} from 'react-redux'
import flv from 'flv.js'
import {fetchStream} from '../../actions'

class StreamShow extends Component {
    constructor(props){
        super(props)
        this.videoRef = React.createRef()
    }

    componentDidMount(){
        const {id} = this.props.match.params.id

        this.props.fetchStream(id)
        this.buildPlayeR()
    }
    buildPlayeR(){
        if(this.player || !this.props.stream){
            return;
        }

        const {id} = this.props.match.params

        this.player = flv.createPlayer({
            type:'flv',
            url:`http://localhost:8000/live/${id}.flv`
        })

        this.player.attachMediaElement(this.videoRef.current)
        this.player.load()
    }

    componentDidUpdate(){
        this.buildPlayeR()
    }


    render() {
        if(!this.props.stream){
            return <div>Loading...</div>
        }

        const {title, description} = this.props.stream

        return (
            <div>
                <video  ref={this.videoRef} style={{width: '100%'}} controls={true}/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {stream: state.streams[ownProps.match.params.id]}
}


export default connect(
    mapStateToProps,
    {fetchStream}
)(StreamShow)
