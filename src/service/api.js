export const apiurl = {
   userRoleslist:'user/roles/list',//获取角色列表
   deleteRoles:'user/roles/',//删除角色
   getUserAdminlist:'user/roles/user/',//获取管理员权限列表
   saveUserAdmin:'user/roles/user/',//保存权限配置
   getuserFeatures:'user/roles/user/features',//获取模块权限数据
   getFeatures:'user/roles/features',//获取角色功能点列表
   postFeatures:'user/roles/',//新增&编辑角色
   getSignatures:'message/signature/signatureRecord',//获取短信签名列表
   applySignature:'message/signature/add',//申请短信签名
   deleteSignature:'message/signature/delete',//删除短信签名
   application:'user/roles/application',//根据应用ID判断该用户是否有该应用后台权限
   
}