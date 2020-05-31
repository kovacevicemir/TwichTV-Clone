import React, { Component } from 'react'

class GoogleAuth extends Component {
    state = { isSignedIn: null }

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '331838129258-codjjaqmnmo90o9q0s80lbe611c2vhcp.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState ({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = () =>{
        this.setState({isSignedIn : this.auth.isSignedIn.get()})
    }
    
    SignInOrOut = (e) =>{
        if(e.target.value === 'sign-in'){
            this.auth.signIn()
        }else{
            this.auth.signOut()
        }
    }

    renderAuthButton(){
        if(this.state.isSignedIn === null){
            return 
            
        }else if(this.state.isSignedIn === true){
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

export default GoogleAuth