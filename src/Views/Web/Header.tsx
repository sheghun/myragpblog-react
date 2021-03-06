import { StyleRulesCallback } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/myragpblog-logo.jpg";

// In-built styles
const useStyles = makeStyles<StyleRulesCallback>(theme => ({
    collapseNavbarTransition: {
        transition: "all .5s ease-in-out"
    }
}));

const Header = () => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const collapseNavClasses = classNames({
        [classes.collapseNavbarTransition]: true,
        ["navbar-collapse"]: true,
        ["collapse"]: true,
        in: open
    });

    const buttonCollapseClasses = classNames({
        collapsed: true,
        "gfort-toggle": open,
        "navbar-toggle": true
    });

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <header id="header-section-1" className="header-section header-style-1">
            <div className="header-section-container">
                <div className="header-menu">
                    <div className="header-menu-container">
                        <nav className="navbar">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="navbar-header">
                                            <a
                                                href="#header-section-1"
                                                className="navbar-brand"
                                                title="LUNE"
                                            >
                                                <img
                                                    src={logo}
                                                    width="250"
                                                    height="120"
                                                    style={{
                                                        padding: "0 !important",
                                                    }}
                                                    alt="LUNE Logo"
                                                />
                                                {/* <p
                                                    style={{
                                                        fontFamily:
                                                            "Great Vibes, cursive",
                                                        fontSize: "24px",
                                                        padding: "1rem"
                                                    }}
                                                >
                                                    MY RAGP BLOG
                                                </p> */}
                                            </a>

                                            <button
                                                type="button"
                                                className={
                                                    buttonCollapseClasses
                                                }
                                                onClick={toggle}
                                            >
                                                Menu{" "}
                                                <span>
                                                    <i className="lines" />
                                                </span>
                                            </button>
                                        </div>

                                        <div className={collapseNavClasses}>
                                            <ul className="nav navbar-nav navbar-right">
                                                <li>
                                                    <a
                                                        href="#header-section-1"
                                                        title="Home"
                                                    >
                                                        Home
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#features-of-the-blog"
                                                        title="Features"
                                                    >
                                                        Features
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#team-section-8"
                                                        title="Team"
                                                    >
                                                        Team
                                                    </a>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/login"
                                                        title="Login"
                                                    >
                                                        Login
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#contact-section-14"
                                                        title="Contact"
                                                    >
                                                        Contact Us
                                                    </a>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/register"
                                                        title="Purchase"
                                                        className="btn btn-gfort wave-effect"
                                                    >
                                                        Join Now
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
