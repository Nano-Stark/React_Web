import React, { Component} from 'react';
import PageWrapper from './component/PageWrapper';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'; 

//Pages
import Home from './component/Pages/Home';
import About from './component/Pages/About';
import Contact from '../src/component/Common/Contact';
import Portfolio from '../src/component/Common/Portfolio';
import Team from '../src/component/Common/Team';
import Services from './component/Common/Services';

//continuation from loopack last two video tutorials
import AdminWrapper from './component/AdminWrapper';
import Login from './component/Pages/Login';

//REDUX
import {connect} from 'react-redux';
//Admin Pages
import Dashboard from './component/Pages/Admin/Dashboard';
import Users from './component/Pages/Admin/Users';
import Posts from './component/Pages/Admin/Posts';

import LoginWrapper from './component/LoginWrapper';

//FAB
import AddPost from './component/Pages/Admin/AddPost';

//Loading post to front end
import Blog from './component/Pages/Blog';
import Single from './component/Pages/Single';
//Registering new accounts
import SignUp from './component/Pages/SignUp';

class App extends Component {
  render() {
    return (
      <Router>

        {/*<Route
          path='/admin/users'
          component={Users}
        />*/}

        <Route
          path='/admin/users'
          render={props => {
            console.log('Props', props);
            return (
              <div>
              {this.props.auth.token ?
              <AdminWrapper>
                <Users />
              </AdminWrapper>
              :
              <LoginWrapper>
                <Login />
              </LoginWrapper>  
              }
              </div>
            )
          }} 
          />

       

        <Route 
        path='/admin/posts/:view/:id'
          exact={true}
          render={props => {
            console.log('Props', props);
            return (
              <div>
              {this.props.auth.token ?
              <AdminWrapper>
                <AddPost />
              </AdminWrapper>
              :
              <LoginWrapper>
                <Login />
              </LoginWrapper>  
              }
              </div>
            )
          }}
        />

        {/*FAB*/}

        <Route 
        path='/admin/posts/:view'
          exact={true}
          render={props => {
            console.log('Props', props);
            return (
              <div>
              {this.props.auth.token ?
              <AdminWrapper>
                <AddPost />
              </AdminWrapper>
              :
              <LoginWrapper>
                <Login />
              </LoginWrapper>  
              }
              </div>
            )
          }}
        />

        <Route
          path='/admin/posts'
          exact={true}
          render={props => {
            console.log('Props', props);
            return (
              <div>
              {this.props.auth.token ?
              <AdminWrapper>
                <Posts />
              </AdminWrapper>
              :
              <LoginWrapper>
                <Login />
              </LoginWrapper>  
              }
              </div>
            )
          }} 
          />


      <Route
        exact={true}
        path='/signup'
        render={props => {
          if(this.props.auth.token){
            return (
              <Redirect to='/' />
            )
          }else {
            return (
              <LoginWrapper>
                <SignUp />
              </LoginWrapper>
            )
          }
        }}
        />

      <Route
      exact={true}
        path="/admin"
        render={props => {
          console.log('Props', props);
          return (
            <div>
            {this.props.auth.token ?
            <AdminWrapper>
              <Dashboard />
            </AdminWrapper>
            :
            <LoginWrapper>
              <Login />
            </LoginWrapper>
              
            }
            </div>
           
          )
        }} 
        />

      <Route
        exact={true}
        path="/"
        render={props => (
          <PageWrapper>
            <Home {...props} />
          </PageWrapper>
        )}
        />


      <Route
        exact={true}
        path="/blog/:slug"
        render={props => (
          <PageWrapper>
            <Single {...props} />
          </PageWrapper>
        )}
        />

      <Route
        exact={true}
        path="/blog"
        render={props => (
          <PageWrapper>
            <Blog {...props} />
          </PageWrapper>
        )}
        />

      <Route
        path="/contact"
        render={props => (
          <PageWrapper>
            <Contact {...props} />
          </PageWrapper>
        )}
        />

      <Route
        path="/portfolio"
        render={props => (
          <PageWrapper>
            <Portfolio {...props} />
          </PageWrapper>
        )}
        />

      <Route
        path="/services"
        render={props => (
          <PageWrapper>
            <Services {...props} />
          </PageWrapper>
        )}
        />

      <Route
        path="/team"
        render={props => (
          <PageWrapper>
            <Team {...props} />
          </PageWrapper>
        )}
        />




      {/*ASIDE THE PART I INDICATE COMMENT START AND END, 
      I COMMENTED THE OTHER PARTS BASED ON THE USAGE OF LOOPBACK
      BCOS IT RENDERS OUT IN THE BROWSER CODE INSPECTOR WHICH IS NOT NEEDED. INSTEAD,
       I USED THE ABOVE APPROACH */}
      {/*<PageWrapper>
          <Route exact={true} path="/" component={Home}/>*/}

          {/*COMMENT START*/}
          {/*the / allows any link with / to work, using
          exact={true} simply forces to direct to the component specified only */}
          {/*<Home />
          <Route path="/a" render={() => {return (<h1>I am the /a route</h1>)}} />*/}
          {/*COMMENT END*/}


          {/*<Route path="/about" component={About} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/contact" component={Contact} />
          <Route path="/services" component={Services} />
          <Route path="/team" component={Team} />
        </Router>

      </PageWrapper>*/}
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dsipatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
