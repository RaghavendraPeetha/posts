import {Component} from 'react'
import './index.css'
import {SiGmail} from 'react-icons/si'
import ThemeContext from '../../Context/ThemeContext'

class Comments extends Component {
  state = {
    commentsList: [],
    showComments: false,
  }

  componentDidMount() {
    this.getComments()
  }

  showComments = () => {
    this.setState(prevState => ({
      showComments: !prevState.showComments,
    }))
  }

  getComments = async () => {
    const {details} = this.props
    const {id} = details

    const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    const response = await fetch(url)
    const data = await response.json()

    console.log(data, 'each')
    if (response.ok) {
      this.setState({
        commentsList: data,
      })
    }
  }

  render() {
    const {details} = this.props

    const {commentsList, showComments} = this.state

    return (
      <li className="list__user__post">
        <div>
          <h1 className="user__title">{details.title}</h1>
          <p className="user__body">{details.body}</p>

          <ThemeContext.Consumer>
            {value => {
              const {isDark} = value
              return (
                <>
                  {showComments && (
                    <ul
                      className={
                        isDark
                          ? 'comments__container dark__comments__cnr'
                          : 'comments__container'
                      }
                    >
                      {commentsList.map(each => (
                        <li key={each.id}>
                          <div className="name__container">
                            <div className="firstname">
                              <div className="name__badge">
                                <h1>{each.name.slice(0, 1).toUpperCase()}</h1>
                              </div>
                              <h1 className="name">{each.name}</h1>
                            </div>

                            <div className="email">
                              <p>{each.email}</p>
                              <div className="email__container">
                                <SiGmail className="mail__logo" />
                              </div>
                            </div>
                          </div>

                          <p className={isDark ? 'body dark__comment' : 'body'}>
                            {each.body}
                          </p>

                          <hr className="line" />
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )
            }}
          </ThemeContext.Consumer>

          <div className="comments__bottom">
            <div>
              <div>
                <p>{commentsList.length}</p>
              </div>
              <p>Comments</p>
            </div>

            <button onClick={this.showComments} type="button">
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
          </div>
          <hr />
        </div>
      </li>
    )
  }
}
export default Comments
