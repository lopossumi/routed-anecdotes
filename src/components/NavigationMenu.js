import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'


class NavigationMenu extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name='anecdotes'
          as={NavLink}
          exact to='/'
          active={activeItem === 'anecdotes'}
          onClick={this.handleItemClick}
        >
          Anecdotes
        </Menu.Item>

        <Menu.Item
          name='create'
          as={NavLink}
          exact to='/create'
          active={activeItem === 'create'}
          onClick={this.handleItemClick}
        >
          Create New
        </Menu.Item>

        <Menu.Item
          name='about'
          as={NavLink}
          exact to='/about'
          active={activeItem === 'about'}
          onClick={this.handleItemClick}
        >
          About
        </Menu.Item>
      </Menu>
    )
  }
}

export default NavigationMenu