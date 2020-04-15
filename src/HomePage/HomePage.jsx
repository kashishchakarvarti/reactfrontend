import React from 'react';

import { userService, authenticationService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({users: users.data.news }));
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
    
                <h3>Top News Feeds:</h3>
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.title} {user.description}</li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export { HomePage };