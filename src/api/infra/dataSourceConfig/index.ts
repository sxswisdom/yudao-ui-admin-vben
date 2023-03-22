import { defHttp } from '@/utils/http/axios'

export interface DataSourceConfigVO {
  id: number
  name: string
  url: string
  username: string
  password: string
  createTime: Date
}

// 查询数据源配置列表
export function getDataSourceConfigListApi() {
  return defHttp.get({ url: '/infra/data-source-config/list' })
}

// 查询数据源配置详情
export function getDataSourceConfigApi(id: number) {
  return defHttp.get({ url: '/infra/data-source-config/get?id=' + id })
}

// 新增数据源配置
export function createDataSourceConfigApi(data: DataSourceConfigVO) {
  return defHttp.post({ url: '/infra/data-source-config/create', data })
}

// 修改数据源配置
export function updateDataSourceConfigApi(data: DataSourceConfigVO) {
  return defHttp.put({ url: '/infra/data-source-config/update', data })
}

// 删除数据源配置
export function deleteDataSourceConfigApi(id: number) {
  return defHttp.delete({ url: '/infra/data-source-config/delete?id=' + id })
}
