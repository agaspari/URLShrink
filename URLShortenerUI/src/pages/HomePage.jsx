import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
 
export default class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            url: "",
            urlId: "",
        }
    }

    onChange = (e, value) => {
        console.log(e.target.name, value);
        this.setState({
            [e.target.name]: value,
        });
    }

    onClick = () => {
        fetch(`${window.location.protocol}//${window.location.hostname}:3001`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: this.state.url
            })
        })
        .then((res) => res.json())
        .then(json => {
            this.setState({ urlId: json.id });
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() {
        
        return(
            <div>
                <div class="page-header">
                    <h5>Enter a URL to Shrink</h5>
                </div>
                <div>
                    <form class="form-inline">
                        <TextField
                            id="url"
                            label="Url"
                            name="url"
                            // className={this.classes.textField}
                            value={this.state.url}
                            onChange={(e) => this.onChange(e, e.target.value)}
                            margin="normal"
                        />
                        <Button
                            variant="contained" 
                            color="primary"
                            onClick={(e) => this.onClick()}
                        >  
                            Shrink
                        </Button>
                    </form>
                </div>
                {this.state.urlId.length > 0 &&
                    <div>
                        {`${window.location.protocol}//${window.location.host}/${this.state.urlId}`}
                    </div>
                }
            </div>

        );
    }

    componentDidMount() {
        
    }
}