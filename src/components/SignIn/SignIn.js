import React from 'react';

const SignIn = () => {
    return (
        <div>
            <h2>Sign In</h2>
            <form>
                <label>
                    <p>Email</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <button>Sign In</button>
            </form>
        </div>
    )
}

export default SignIn;