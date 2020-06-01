import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends Component {

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '331838129258-codjjaqmnmo90o9q0s80lbe611c2vhcp.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    //basically lisener callback
    onAuthChange = (isSignedIn) =>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }else{
            this.props.signOut()
        }
    }
    
    SignInOrOut = (e) =>{
        if(e.target.value === 'sign-in'){
            this.auth.signIn()
        }else{
            this.auth.signOut()
        }
    }

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return 
            
        }else if(this.props.isSignedIn === true){
            return (
                <button onClick={this.SignInOrOut} value='sign-out' className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )

        }else{
            return (
                <button onClick={this.SignInOrOut} value="sign-in" className="ui red google button">
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

//state is whole redux store state
//so state.auth -> auth is reducers/index.js
//isSignedIn is reducers/authReducer that holds actual state (true or false in this case)
const mapStateToProps = (state) =>{
    return {isSignedIn : state.auth.isSignedIn}
}


export default connect(
    mapStateToProps,
    { signIn, signOut}
)(GoogleAuth)