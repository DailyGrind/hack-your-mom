import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Paper, AppBar, Card} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin()

export default class Home extends Component {
  render(){
    return (<MuiThemeProvider>
      <div>
        <AppBar
  title="Hack Your Mom"
  iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
<Paper style={{ display: 'flex', flexDirection: 'column', alignItems:'center', height:'100vh'}}>
        <Card style={{ marginTop: '10vh', padding: '10px', height:'90vh', width: '70vw'}}>
        <article>
          Hacking your mom for her own good jah
        </article>
        <article>
          Hacking your mom for her own good jah
        </article>
        <article>
          Hacking your mom for her own good jah
        </article>
      </Card>
      </Paper>
    </div>
     </MuiThemeProvider>)
  }
}

ReactDOM.render(<Home/>, document.getElementById('app'))
