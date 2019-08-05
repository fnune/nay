import 'bulma/css/bulma.css'

import React from 'react'

import Rules from '../shared/Rules'

const Popup: React.FC = () => {
  return (
    <div
      className="content is-small"
      style={{
        width: '300px',
        maxHeight: '800px',
        padding: '30px',
      }}
    >
      <div className="container is-fluid">
        <Rules />
        <div className="notification is-info">
          <p>
            Add your reason for saying Nay! to each rule. That way, you'll remember why they're
            there in the future.
          </p>
          <p>To see why you added a rule, you can hover it.</p>
        </div>
        <div className="notification">
          <p>
            Rules you add will be used to match against links in all the pages you visit. Those
            links will then be masked with a random URL and modified so you can't click on them.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Popup
