import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import "./Auth.scss";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };
  fillDemoEmail = () => {
    this.setState({ email: "test@test.com" });
  };
  fillDemoPassword = () => {
    this.setState({ password: "test123" });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="wrapper">
        <div className="header-logo">
          <img src="../../img/carddex_logo.png" alt=""/>
        </div>
        <div className="base-wrapper">
          <div className="main-paragraph">
            <h1>Личный кабинет Карддекс</h1>
            <h3>Личный кабинет партнеров и дилеров Карддекс</h3>
            <p>
              Войдите или зарегистрируйтесь для получения всей доступной информации
              по продуктам Карддекс, вашим заказам, скидкам и предложениям.
            </p>
          </div>
          <div className="wrapper-separator"></div>
          <form className="auth-form" noValidate onSubmit={this.onSubmit}>
            <div className="auth-group">
              <div className="bottom-group">
                <Link to="/" className="link-login active">
                  Вход
                </Link>
                <Link to="/register" className="link-register">
                  Регистрация
                </Link>
              </div>
              <label>
                <div className="auth-label">Email</div>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className="auth-input"
                />
                <div className="auth-error">
                  {errors.email}
                  {errors.emailnotfound}
                </div>
              </label>
            </div>
            <div className="auth-group">
              <label>
                <div className="auth-label">Пароль</div>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className="auth-input"
                />
                <div className="auth-error">
                  {errors.password}
                  {errors.passwordincorrect}
                </div>
              </label>
            </div>
            <div>
              <button type="submit" className="auth-button">
                Войти
              </button>
            </div>
          </form>
        </div>
        <div className="footer">
          <div className="footer-copy">
            <h1>Copyright 2019 &copy; CARDDEX</h1>
            <p>Информация на сайте не является публичной офертой</p>
          </div>
          <div className="footer-phone">
            <img src="../../img/call.png" alt="" />
            <div className="footer-phone__number">
              <h1>8 (800) 333-93-36</h1>
              <h1>8 (499) 64-333-69</h1>
            </div>
          </div>
          <div className="footer-email">
            <img src="../../img/email.png" alt="" />
            <h1>help@carddex.ru</h1>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
