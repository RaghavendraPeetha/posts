import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

import Navbar from '../Navbar'
import ThemeContext from '../../Context/ThemeContext'

class Chat extends Component {
  render() {
    return (
      <div className="app__container">
        <div className="navbar__container">
          <Navbar />
        </div>
        <div className="bottom__container">
          <ThemeContext.Consumer>
            {value => {
              const {isDark} = value
              return (
                <>
                  <div
                    className={
                      isDark
                        ? 'sidebar__container sidebar__dark'
                        : 'sidebar__container'
                    }
                  >
                    <div className="users__cnr">
                      <Link to="/users/:id/posts" className="users__link">
                        <h1 className="users">users</h1>
                      </Link>
                    </div>
                  </div>
                  <div className="app__body">
                    <div
                      className={
                        isDark
                          ? 'home__container dark__body'
                          : 'home__container'
                      }
                    >
                      <h1>Welcome to PostMan App</h1>
                      <p className={isDark && 'pg__dark'}>
                        click on link in sidebar to explore user specific-posts.
                      </p>
                    </div>
                  </div>
                </>
              )
            }}
          </ThemeContext.Consumer>
        </div>
      </div>
    )
  }
}
export default Chat
