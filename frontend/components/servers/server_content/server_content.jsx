
import React from 'react';
import { fetchServers } from '../../../actions/server_actions';


class ServerContent extends React.Component {
      constructor(props) {
            super(props)
      }

      render() {
            return (
                  <div className="server-content-shell">
                        <div className="server-info-header">
                              
                        </div>
                        <div className="user-options-shell">
                              <div className="user-info-shell">

                              </div>
                              <div className="user-icon-shell">

                              </div>
                        </div>
                  </div>
            )
      }
}


export default ServerContent;