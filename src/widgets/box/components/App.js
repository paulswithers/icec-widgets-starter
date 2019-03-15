import React from "react";
import ContentExplorer from "box-ui-elements/lib/components/ContentExplorer";
import messages from "box-ui-elements/i18n/en-US";
import "box-ui-elements/dist/explorer.css";

import "./app.scss";

const App = ({ token }) => (
    <Main>
        <ContentExplorer language="en-US" messages={messages} token={token} logoUrl=""/>
    </Main>
);

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, children } = this.props;

        return (
            <div className="app">
                <div className="body">
                    <main className={className}>{children}</main>
                </div>
            </div>
        );
    }
}

export default App;
