import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { withContext } from '../Auth/AuthContext';
import { Nav } from 'react-bootstrap';

class AdminSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.isAdminLoggedIn = this.isAdminLoggedIn.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    }

    isAdminLoggedIn() {
      let value = localStorage.getItem("admin");
      value = JSON.parse(value);
      if (value === "true") {
        return true;
      } else {
        return false;
      }
    }

    componentDidMount() {
      this.isAdminLoggedIn();
    }

    render() {
        return (
            <React.Fragment>
            {(this.props.admin || this.props.user) &&
            <Sidebar
                sidebar={
                <Nav defaultActiveKey="/admin/dashboard" as="ul" className="flex-column">
                  <Nav.Link className="navlink" href="/admin/dashboard">
                    <p>Dashboard</p>
                  </Nav.Link>
                  <Nav.Link className="navlink" href="/admin/requests">
                    <p>Requests</p>
                  </Nav.Link>
                </Nav>
                }
                docked="true"
                styles={{sidebar: {background: "#414141" }}}
            >

            </Sidebar>}
            </React.Fragment>
        )
    }
}

export default withContext(AdminSidebar);