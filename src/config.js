
const dev = {
  baseUrl: 'http://152.136.182.96:5034/',
  jumpUrl: 'http://10.131.101.56:88/patient-panorama.html' // 全景图跳转
}
const test = {
  // baseUrl: 'http://172.16.115.162:5031/',
  baseUrl: 'http://192.168.129.16:5031/',
  // jumpUrl: 'http://10.131.101.56:88/patient-panorama.html' // 全景图跳转
  // http://192.168.129.1/patient-panorama.html?patientId=${patientId}`
  jumpUrl: 'http://192.168.129.1/patient-panorama.html'
}
const production = {
  baseUrl: '',
  baseUrl2: ''
}
console.log(dev, test, production)
export default test
