import type { VxeGridProps } from '#/adapter/vxe-table';
import type { CodegenApi } from '#/api/infra/codegen';

import { type VbenFormProps, z } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { getDataSourceConfigList } from '#/api/infra/data-source-config';
import { $t } from '#/locales';
import { DICT_TYPE } from '#/utils/dict';

export namespace CodegenDefaultData {
  /**
   * 代码生成字段定义 表格配置
   */
  export const tableColumns: VxeGridProps<CodegenApi.CodegenTableRespVO>['columns'] =
    [
      {
        fixed: 'left',
        type: 'checkbox',
        width: 50,
      },
      {
        fixed: 'left',
        type: 'seq',
        width: 50,
      },
      { field: 'id', title: '编号', width: 100 },
      { field: 'tableName', title: '表名' },
      { field: 'tableComment', title: '表描述' },
      { field: 'className', title: '实体类名' },
      { field: 'createTime', title: '创建时间', formatter: 'formatDateTime' },
      { field: 'updateTime', title: '更新时间', formatter: 'formatDateTime' },
      {
        field: 'action',
        fixed: 'right',
        width: 'auto',
        slots: { default: 'action' },
        title: $t('page.action.action'),
      },
    ];
  /**
   * 代码生成表定义 表格查询表单配置
   */
  export const formSchema: VbenFormProps['schema'] = [
    {
      label: '表名称',
      fieldName: 'tableName',
      component: 'Input',
    },
    {
      label: '表描述',
      fieldName: 'tableComment',
      component: 'Input',
    },
    {
      label: '创建时间',
      fieldName: 'createTime',
      component: 'DatePicker',
      componentProps: {
        type: 'daterange',
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
      },
    },
  ];
}

//* ****************************** ImportTableModal.vue *******************************//

export namespace CodegenImportTableModalData {
  /**
   * 导入表 表格配置
   */
  export const tableColumns: VxeGridProps<CodegenApi.DatabaseTableRespVO>['columns'] =
    [
      { type: 'checkbox', width: 50 },
      { type: 'seq', title: '序号', width: 50 },
      { field: 'name', title: '表名' },
      { field: 'comment', title: '表描述' },
    ];

  /**
   * 导入表 表格查询表单配置
   */
  export const formSchema: VbenFormProps['schema'] = [
    {
      label: '数据源',
      fieldName: 'dataSourceConfigId',
      component: 'ApiSelect',
      componentProps: {
        defaultSelectedFirst: true,
        allowClear: true,
        placeholder: '请选择数据源',
        api: getDataSourceConfigList,
        labelField: 'name',
        valueField: 'id',
      },
      componentEvents: (events, formApi) => {
        return {
          optionsChange: (value: any) => {
            // 设置默认选中第一个
            formApi.setFieldValue('dataSourceConfigId', value[0].id);
          },
        };
      },
    },
    {
      label: '表名称',
      fieldName: 'name',
      component: 'Input',
    },
    {
      label: '表描述',
      fieldName: 'comment',
      component: 'Input',
    },
  ];
}

//* ****************************** CodegenOptionsModal.vue *******************************//
export namespace CodegenOptionsModalData {
  export const formSchema: VbenFormProps['schema'] = [
    {
      label: '表名称',
      fieldName: 'tableName',
      component: 'Input',
      componentProps: {
        placeholder: '请输入表名称',
      },
      rules: z.string().min(1, { message: '表名称不能为空' }),
    },
    {
      label: '表描述',
      fieldName: 'tableComment',
      component: 'Input',
      componentProps: {
        placeholder: '请输入表描述',
      },
      rules: z.string().min(1, { message: '表描述不能为空' }),
    },
    {
      label: '实体类名',
      fieldName: 'className',
      component: 'Input',
      rules: z.string().min(1, { message: '实体类名不能为空' }),
      componentProps: {
        tooltip:
          '默认去除表名的前缀。如果存在重复，则需要手动添加前缀，避免 MyBatis 报 Alias 重复的问题。',
        placeholder: '请输入实体类名',
      },
    },
    {
      label: '作者',
      fieldName: 'author',
      component: 'Input',
      rules: z.string().min(1, { message: '作者不能为空' }),
      componentProps: {
        placeholder: '请输入作者',
      },
    },
    {
      label: '备注',
      fieldName: 'remark',
      component: 'Input',
      componentProps: {
        placeholder: '请输入备注',
      },
    },
    {
      label: '生成模版',
      fieldName: 'template',
      component: 'ApiDict',
      componentProps: {
        code: DICT_TYPE.INFRA_CODEGEN_TEMPLATE_TYPE,
        class: 'w-full',
        placeholder: '请选择生成模版',
      },
      rules: z.string().min(1, { message: '生成模版不能为空' }),
      defaultValue: '1',
    },
    {
      label: '前端类型',
      fieldName: 'frontType',
      component: 'ApiDict',
      componentProps: {
        code: DICT_TYPE.INFRA_CODEGEN_FRONT_TYPE,
        class: 'w-full',
        placeholder: '请选择前端类型',
      },
      rules: z.string().min(1, { message: '前端类型不能为空' }),
      defaultValue: '31',
    },
    {
      label: '生成场景',
      fieldName: 'scene',
      component: 'ApiDict',
      componentProps: {
        code: DICT_TYPE.INFRA_CODEGEN_SCENE,
        class: 'w-full',
        placeholder: '请选择生成场景',
      },
      rules: z.string().min(1, { message: '生成场景不能为空' }),
      defaultValue: '1',
    },
    {
      label: '上级菜单',
      fieldName: 'parentMenuId',
      component: 'ApiTreeSelect',
      componentProps: {
        class: 'w-full',
        api: () => {
          const { accessMenus } = useUserStore();
          return accessMenus;
        },
        labelField: 'name',
        valueField: 'id',
        placeholder: '请选择上级菜单',
      },
      rules: z.number().min(1, { message: '上级菜单不能为空' }),
      defaultValue: null,
    },
    {
      label: '模块名',
      fieldName: 'moduleName',
      component: 'Input',
      rules: z.string().min(1, { message: '模块名不能为空' }),
      componentProps: {
        placeholder: '请输入模块名',
      },
    },
    {
      label: '业务名',
      fieldName: 'businessName',
      component: 'Input',
      rules: z.string().min(1, { message: '业务名不能为空' }),
      componentProps: {
        placeholder: '请输入业务名',
      },
    },
    {
      label: '类名',
      fieldName: 'className',
      component: 'Input',
      rules: z.string().min(1, { message: '类名不能为空' }),
    },
    {
      label: '类描述',
      fieldName: 'classComment',
      component: 'Input',
      rules: z.string().min(1, { message: '类描述不能为空' }),
    },
  ];
}
