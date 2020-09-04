import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_AA_SERVER,
  timeout: 5000
})

export function login(data) {
  const formData = createLoginFormData(data)
  const basicAuth = 'Basic ' + btoa(process.env.VUE_APP_AA_CLIENT + ':' + process.env.VUE_APP_AA_PASSWORD)
  return service({
    url: '/oauth/token',
    method: 'post',
    headers: {
      'Authorization': basicAuth,
      'Content-Type': 'application/json'
    },
    data: formData
  })
}

function createLoginFormData(data) {
  var form = new FormData()
  form.append('username', data.username)
  form.append('password', data.password)
  form.append('grant_type', 'password')
  return form
}
