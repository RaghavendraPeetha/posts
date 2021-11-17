import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,

  onChangeTheme: () => {},
})

export default ThemeContext
