import React from 'react';

import logFilter from './logFilter.js'
import logTable from './logTable.js'
import page from './page.js'

class Log extends React.Component {
    render() {
        return (
            <div class="log">
                <logFilter />
                <logTable />
                <page />
            </div>
        );
    }
}

export default Log;
