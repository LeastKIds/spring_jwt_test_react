import React, {FC, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const MainView = () => {

    return (
        <div>
            main
            <Link to='/auth/sign-up'>test</Link>
        </div>
    )
}

export default MainView;