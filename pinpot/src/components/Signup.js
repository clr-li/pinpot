import React from 'react';
import Login, { Render } from 'react-login-page';
import Logo from 'react-login-page/logo';

function SignupForm() {
    return (
        <Login>
          <Render>
            {({ fields, buttons, blocks, $$index }) => {
              return (
                <div style={{ display: "flex", "justify-content": "center" }}>
                    <div style={{ display: "flex", 
                    "flex-direction": "column", 
                    "align-items": "center", 
                    "background-color": "#fff", 
                    padding: "20px",
                    "border-radius": "8px", "box-shadow": "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                        <header>
                            {blocks.title}
                        </header>
                        <div>
                            <label>{fields.username}</label>
                        </div>
                        <div>
                            <label>{fields.password}</label>
                        </div>
                        <div>
                            <label>{fields.email}</label>
                        </div>
                        <div>
                            {buttons.submit}
                        </div>
                    </div>
                </div>
              );
            }}
          </Render>
          <Login.Block keyname="logo" tagName="span">
            <Logo />
          </Login.Block>
          <Login.Block keyname="title" tagName="span">
            Signup for PinPot
          </Login.Block>
          <Login.Input keyname="username" placeholder="Username" />
          <Login.Input keyname="password" placeholder="Password" />
          <Login.Input keyname="email" placeholder="Email" />
          <Login.Button keyname="submit" type="submit">
            Submit
          </Login.Button>
        </Login>
      );
}

export default SignupForm;