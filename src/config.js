
const dev = {
  baseUrl: 'http://152.136.182.96:5034/',
  jumpUrl: 'http://10.131.101.56:88/patient-panorama.html' // 全景图跳转
}
const test = {
  baseUrl: 'http://172.16.115.130:5036/', // 郭飞本地地址
  // baseUrl: 'http://192.168.129.16:5032/', // 南方医院打包地址
  // baseUrl: 'http://192.168.1.246:15032/', // 重庆医院打包地址


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
