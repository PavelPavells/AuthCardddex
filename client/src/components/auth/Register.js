import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import "./Auth.scss";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      companyName: "",
      companyINN: "",
      companyPhone: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      companyName: this.state.companyName,
      companyINN: this.state.companyINN,
      companyPhone: this.state.companyPhone,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history);
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
            <Link to="/" className="link-login">
              Вход
            </Link>
            <Link to="/register" className="link-register active">
              Регистрация
            </Link>
            <div className="auth-group">
              <div className="bottom-group">
                <label>
                  <div className="auth-label">Ф.И.О.</div>
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className="auth-input"
                  />
                  <div className="auth-error">{errors.name}</div>
                </label>
              </div>
              <div className="auth-group">
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
                  <div className="auth-error">{errors.email}</div>
                </label>
              </div>
              <div className="auth-group">
                <label>
                  <div className="auth-label">Название компании</div>
                  <input
                    onChange={this.onChange}
                    value={this.state.companyName}
                    error={errors.companyName}
                    id="companyName"
                    type="companyName"
                    className="auth-input"
                  />
                  <div className="auth-error">{errors.companyName}</div>
                </label>
              </div>
              <div className="auth-group">
                <label>
                  <div className="auth-label">ИНН</div>
                  <input
                    onChange={this.onChange}
                    value={this.state.companyINN}
                    error={errors.companyINN}
                    id="companyINN"
                    type="companyName"
                    className="auth-input"
                  />
                  <div className="auth-error">{errors.companyINN}</div>
                </label>
              </div>
              <div className="auth-group">
                <label>
                  <div className="auth-label">Телефон</div>
                  <input
                    onChange={this.onChange}
                    value={this.state.companyPhone}
                    error={errors.companyPhone}
                    id="companyPhone"
                    type="companyName"
                    className="auth-input"
                  />
                  <div className="auth-error">{errors.companyPhone}</div>
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
                  <div className="auth-error">{errors.password}</div>
                </label>
              </div>
              <div>
                <button type="submit" className="auth-button">
                  Зарегестрироваться
                </button>
              </div>
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
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {registerUser}
)(withRouter(Register));