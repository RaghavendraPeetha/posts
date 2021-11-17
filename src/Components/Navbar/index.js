import {Link} from 'react-router-dom'
import './index.css'
import {MdDarkMode, MdOutlineLightMode} from 'react-icons/md'
import {FaHome} from 'react-icons/fa'
import ThemeContext from '../../Context/ThemeContext'

const Navbar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, onChangeTheme} = value

      const changeTheme = () => {
        onChangeTheme()
      }

      return (
        <div className={isDark ? 'navbar dark__nav' : 'navbar'}>
          <Link to="/" className="link__home">
            <FaHome className="home__logo" />
            <h1 className={isDark && 'app__name'}>PostMan</h1>
          </Link>

          <div>
            {!isDark ? (
              <MdDarkMode className="dark" onClick={changeTheme} />
            ) : (
              <MdOutlineLightMode className="light" onClick={changeTheme} />
            )}
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default Navbar
