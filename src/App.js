import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Chat from './Components/Chat'
import Posts from './Components/Posts'
import NotFound from './Components/NotFound'
import ThemeContext from './Context/ThemeContext'

class App extends Component {
  state = {
    isDark: false,
  }

  onChangeTheme = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  render() {
    const {isDark} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDark,

          onChangeTheme: this.onChangeTheme,
        }}
      >
        <Switch>
          <Route exact path="/" component={Chat} />
          <Route exact path="/users/:id/posts" component={Posts} />
          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}
export default App
