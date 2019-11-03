import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">React</a>
                <p className="navbar-text">URL Shortener</p>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    {/* Hidden on Mobile */}
                </div>
            </nav>
        );
    }
}

export default Header;