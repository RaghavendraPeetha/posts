import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import UserPosts from '../UserPosts'
import ThemeContext from '../../Context/ThemeContext'

class Sidebar extends Component {
  state = {
    usersList: [],
    activeId: '',
    isLoading: true,
  }

  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users'
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      const fetchedUsers = data.map(each => ({
        id: each.id,
        name: each.name,
        phone: each.phone,
        userName: each.username,
        website: each.website,
        companyName: each.company.name,
        companyCatchPhrase: each.company.catchPhrase,
        companyBs: each.company.bs,
        city: each.address.city,
        street: each.address.street,
        suite: each.address.suite,
        zipCode: each.address.zipcode,
      }))
      this.setState({
        usersList: fetchedUsers,
        isLoading: false,
      })
    }
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onChangeActiveId = id => {
    this.setState({
      activeId: id,
    })
  }

  render() {
    const {usersList, activeId, isLoading} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <div>
              <h1
                className={
                  isDark ? 'side__users users__dark__hd' : 'side__users'
                }
              >
                USERS
              </h1>

              {isLoading ? (
                this.renderLoader()
              ) : (
                <ul className={isDark ? 'sidebar color' : 'sidebar'}>
                  {usersList.map(eachUser => (
                    <UserPosts
                      key={eachUser.id}
                      details={eachUser}
                      activeId={activeId}
                      onChangeActiveId={this.onChangeActiveId}
                    />
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Sidebar
