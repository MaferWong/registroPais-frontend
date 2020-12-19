import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav } from '@fluentui/react';
import { Pais } from '../pais/pais';
import { Departamento } from '../departamento/departamento';
import './container.css';


export const Container = () => {
    return (
        <div className="container">
            <Nav
                selectedKey="key3"
                ariaLabel="Nav basic example"
                styles={{
                    root: {
                        width: 210,
                        height: '100%',
                        boxSizing: 'border-box',
                        border: '1px solid #eee',
                        overflowY: 'auto',
                    },
                }}
                groups={[{
                    links: [{
                        name: 'Paises',
                        url: '/containers/paises',
                        icon: 'UserFollowed',
                        key: 'estudiantesNav',
                    },
                    {
                        name: 'Departamentos',
                        url: '/containers/departamentos',
                        icon: 'Telemarketer',
                        key: 'profesoresNav',
                    },]
                }]}
            />
            <Router>
                <Switch>
                    <Route exact path="/containers/paises" component={Pais} />
                    <Route exact path="/containers/departamentos" component={Departamento} />
                </Switch>
            </Router>
        </div>
    )
}