import {Link, withRouter} from 'react-router-dom'
import './index.css'

const UserPosts = props => {
  const {details, activeId, onChangeActiveId} = props

  const onChangeId = () => {
    onChangeActiveId(details.id)
  }

  return (
    <li className={activeId === details.id ? 'each__user bg' : 'each__user'}>
      <Link
        className="link"
        to={`/users/${details.id}/posts`}
        onClick={onChangeId}
      >
        <h1>{details.name}</h1>
      </Link>
    </li>
  )
}

export default withRouter(UserPosts)
