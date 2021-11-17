import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Comments from '../Comments'
import ThemeContext from '../../Context/ThemeContext'

class Posts extends Component {
  state = {
    userPosts: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://jsonplaceholder.typicode.com/users/${id}/posts`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      this.setState(
        {
          userPosts: data,
          isLoading: false,
        },
        this.getPosts,
      )
    }
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {userPosts, isLoading} = this.state

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
                    <Sidebar />
                  </div>
                  <div
                    className={isDark ? 'app__body dark__body' : 'app__body'}
                  >
                    <div className="posts__container">
                      <h1 className="posts__heading">Posts</h1>

                      {userPosts.length > 0 ? (
                        <>
                          {isLoading ? (
                            this.renderLoader()
                          ) : (
                            <ul>
                              {userPosts.map(each => (
                                <Comments key={each.id} details={each} />
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        <h1 className="suggestion">
                          Click on any user to get their specific-posts
                        </h1>
                      )}
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

export default Posts
