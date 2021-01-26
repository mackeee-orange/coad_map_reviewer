import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Icon, Input, Button } from 'antd'
import { signUp } from '../actions/accounts'
import routes from '../routes'
import { setPageTitle } from '../actions/apps'

class SignUpPage extends Component {
  state = {
    confirmDirty: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signUp(values)
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('パスワードが一致しません。')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['passwordConfirmation'], { force: true })
    }
    callback()
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  componentDidMount() {
    this.props.setPageTitle('Minerva | Register')
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Row>
        <Col md={6} span={0} />
        <Col md={12} span={24} style={{ marginTop: 50, padding: 20, background: '#fff' }}>
          <h2>アカウント登録</h2>
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
                  placeholder="パスワード(6〜32文字)"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              <div>
                Do you have any accounts？ <Link to={routes.signIn()}>Log In</Link>
              </div>
            </Form.Item>
          </Form>
        </Col>
        <Col md={6} span={0} />
      </Row>
    )
  }
}

const mapStateToProps = ({ account }) => ({
  errors: account.errors,
})

const mapDispatchToProps = dispatch => ({
  signUp: formProps => dispatch(signUp(formProps)),
  setPageTitle: pageTitle => dispatch(setPageTitle(pageTitle)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'sign_up' })(SignUpPage))
