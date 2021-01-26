import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Icon, Input, Button, Typography } from 'antd'
import { signIn } from '../actions/accounts'
import routes from '../routes'
import { setPageTitle } from '../actions/apps'

const { Text } = Typography

class SignInPage extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signIn(values)
      }
    })
  }



  componentDidMount() {
    this.props.setPageTitle('Minarva | Login')
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { errors } = this.props
    return (
      <Fragment>
        <Row>
          <Col md={6} span={0} />
          <Col md={12} span={24} style={{ marginTop: 50, padding: 20, background: '#fff' }}>
            <h2>サインイン</h2>
            {errors && errors.length > 0 && (
              <ul>
                {errors.map((e, idx) => (
                  <li key={idx}>
                    <Text type="danger">{e}</Text>
                  </li>
                ))}
              </ul>
            )}
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: '必須項目です。' }],
                })(
                  <Input
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Eメール"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '必須項目です。' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="パスワード"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  LogIn
                </Button>
                <div>
                  Do you have no accounts？ <Link to={routes.signUp()}>Register</Link>
                </div>
              </Form.Item>
            </Form>
          </Col>
          <Col md={6} span={0} />
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ account }) => ({
  errors: account.errors,
})

const mapDispatchToProps = dispatch => ({
  signIn: formProps => dispatch(signIn(formProps)),
  setPageTitle: pageTitle => dispatch(setPageTitle(pageTitle)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'sign_in' })(SignInPage))
