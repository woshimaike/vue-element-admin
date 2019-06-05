import Axios from 'axios'

Axios.defaults.baseURL = ''
Axios.defaults.timeout = 15000
Axios.defaults.withCredentials = false
Axios.defaults.params = {}
Axios.defaults.validateStatus = () => true
Axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

// export const addTemplate = params => { return Axios.post(`http://192.168.0.40:8080/template/add`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
// export const queryTemplate = params => { return Axios.get(`http://192.168.0.40:8080/template/query`, { params: { ...params }}) }
// export const deleteTemplate = params => { return Axios.post(`http://192.168.0.40:8080/template/delete`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
// export const getExchangeList = params => { return Axios.post(`http://192.168.0.40:8080/api/v1/exchange/queryAllExchangs`, { ...params }) }
var ip = '47.90.97.83' // 山东
// var ip = '47.75.110.73' // 西安
// var ip = 'localhost'
export const getExchangeList = params => { return Axios.post(`http://` + ip + `:8080/api/v1/exchange/queryAllExchangs`, { ...params }) }
export const getTemplateList = params => { return Axios.post(`http://` + ip + `:8080/api/v1/template/queryAllTemplate`, { ...params }) }
export const addAccount = params => { return Axios.post(`http://` + ip + `:8080/api/v1/transacc/addAccout`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const queryAccount = params => { return Axios.post(`http://` + ip + `:8080/api/v1/transacc/queryAccount`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const queryAllAccount = params => { return Axios.post(`http://` + ip + `:8080/api/v1/transacc/queryAllAccount`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const deleteAccount = params => { return Axios.post(`http://` + ip + `:8080/api/v1/transacc/deleteAccount`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const operateAccount = params => { return Axios.post(`http://` + ip + `:8080/api/v1/transacc/operateAccount`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }

export const summaryStrategy = params => { return Axios.post(`http://` + ip + `:8080/api/v1/strategy/summary`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }

export const queryStrategy = params => { return Axios.post(`http://` + ip + `:8080/api/v1/strategy/queryAll`, { params: { ...params }}) }
export const deleteTemplate = params => { return Axios.post(`http://` + ip + `:8080/api/v1/template/delete`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const queryTemplate = params => { return Axios.post(`http://` + ip + `:8080/api/v1/template/query`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const addTemplate = params => { return Axios.post(`http://` + ip + `:8080/api/v1/template/add`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const updateTemplate = params => { return Axios.post(`http://` + ip + `:8080/api/v1/template/update`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const operateTemplate = params => { return Axios.post(`http://` + ip + `:8080/api/v1/template/operate`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }

export const queryRobot = params => { return Axios.post(`http://` + ip + `:8080/api/v1/robot/query`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const addRobot = params => { return Axios.post(`http://` + ip + `:8080/api/v1/robot/add`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const deleteRobot = params => { return Axios.post(`http://` + ip + `:8080/api/v1/robot/delete`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const updateRobot = params => { return Axios.post(`http://` + ip + `:8080/api/v1/robot/update`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const operateRobot = params => { return Axios.post(`http://` + ip + `:8080/api/v1/robot/operate`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }

export const countAllAccount = params => { return Axios.post(`http://` + ip + `:8080/api/v1/transacc/countAllAccount`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const countAllTemplate = params => { return Axios.post(`http://` + ip + `:8080/api/v1/template/countAllTemplate`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const countAllStrategy = params => { return Axios.post(`http://` + ip + `:8080/api/v1/strategy/countAllStrategy`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const saveAccount = params => { return Axios.post(`http://` + ip + `:8080/api/v1/transacc/saveAccount`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }

export const queryPrecision = params => { return Axios.post(`http://` + ip + `:8080/api/v1/precision/query`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
export const setPrecision = params => { return Axios.post(`http://` + ip + `:8080/api/v1/precision/set`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }

export const queryWithdrawAddress = params => { return Axios.post(`http://` + ip + `:8080/api/v1/withdraw/queryaddress`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
// export const replaceWithdrawAddress = params => { return Axios.post(`http://` + ip + `:8080/api/v1/withdraw/replaceaddress`, { ...params }, { headers: { 'Content-type': 'application/json' }}) }
// export const login = params => {
//   return Axios.post(`http://` + ip + `:8080/api/v1/api/login`, { ...params }, { headers: {
//     'Content-type': 'application/json'
//   }})
// }
