import React from "react";
import axios from "axios";
class Login extends React.Component {
  constructor() {
    super();
  }

  submitHandler(e) {
    e.preventDefault();
    const puppy = {
      name: e.target.name.value,
      password: e.target.password.value
    };
    console.log(puppy);
    axios.put("auth/login", puppy);
  }
  logOut() {
    axios.delete("auth/logout");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input name="name" />
          <input name="password" />
          <button type="submit">Submit</button>
        </form>
        <button onClick={this.logOut}>Logout</button>
        <button>Log In with Google</button>
      </div>
    );
  }
}

export default Login;
