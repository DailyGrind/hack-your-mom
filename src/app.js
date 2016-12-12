import React, {Component} from "react";
import {Paper, AppBar, Card} from "material-ui";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default class App extends Component {
    shouldComponentUpdate() {
        return true
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Hack Your Mom" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                    <Paper style={{display: "flex", flexDirection: "column", alignItems: "center", height: "100vh"}}>
                        <Card style={{marginTop: "10vh", padding: "10px", height: "90vh", width: "70vw"}}>
                            <div>Here you go!</div>
                        </Card>
                        <Card style={{marginTop: "10vh", padding: "10px", height: "90vh", width: "70vw"}}>
                            <div>Here you go!</div>
                        </Card>
                        <Card style={{marginTop: "10vh", marginBottom: "10vh", padding: "10px", height: "90vh", width: "70vw"}}>
                            <div>Here you go!</div>
                        </Card>

                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}
