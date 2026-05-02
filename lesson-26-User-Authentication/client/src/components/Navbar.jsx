import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>
                Home
            </Link>
            <div style={styles.authLinks}>
                <Link to="/login" style={styles.link}>
                    Login
                </Link>
                <Link to="/register" className =" text-green-500 font-bold">
                    Register
                </Link>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",  // skyver gruppene fra hverandre
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#1613db",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
    },
    authLinks: {
        display: "flex",
        gap: "1rem",                       // mellomrom mellom Login og Register
    },
    link: {
        color: "#ffffff",
        textDecoration: "none",
        fontWeight: "500",
    },
};

export default Navbar;