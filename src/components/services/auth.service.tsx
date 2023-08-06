import axios from "axios"

const API_URL = "https://9ib3czapi8.execute-api.us-east-1.amazonaws.com/dev/"

class AuthService {
  async login(username: string, password: string) {
    const response = await axios.post(
      API_URL + "login",
      {},
      {
        auth: {
          username,
          password
        }
      }
    )
    //.then(response => {
    //  console.log("success")
    //  console.log(response)
    //if (response.data.accessToken) {
    //  localStorage.setItem("user", JSON.stringify(response.data))
    //}

    // return response.data
    //})
    console.log(response.headers)
  }

  logout() {
    localStorage.removeItem("user")
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    })
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user")
    if (userStr) return JSON.parse(userStr)

    return null
  }
}

export default new AuthService()
