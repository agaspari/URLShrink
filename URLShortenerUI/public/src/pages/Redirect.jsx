import React, { Component } from "react";

export default class Redirect extends Component {
    componentDidMount() {
        console.log(this.props.match.params.id);
        fetch(`${window.location.protocol}//${window.location.hostname}:3001/${this.props.match.params.id}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(json => {
            console.log('Json: ', json);
            window.location.href = json.url;
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() {
        return `Redirecting Now...`;
    }
}