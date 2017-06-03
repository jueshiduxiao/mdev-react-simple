import React from 'react';
import Log from './module/log.js';
import state from '../data/state.js';
import action from '../data/action.js';


class App extends React.Component {
    constructor() {
        super();

        this.state = state;
        this.action = action;
        this.action.config({ context: this });
    }

    render() {
        return (
            <div className="app">
                <Log {...this.state.log} action={this.action} />
            </div>
        );
    }
}

export default App;
