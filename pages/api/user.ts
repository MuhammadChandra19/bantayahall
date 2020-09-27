import userService from "../../domain/user/service"

export default (req, res) => {
  const { account } = userService()
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(account.getUserData()))
}