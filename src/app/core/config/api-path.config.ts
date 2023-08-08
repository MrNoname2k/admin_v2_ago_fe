


export const ApiPathConfig = {

  auth: {
    login: 'v1/api/auth/login',
  },

  post: {
    createPost: '/v1/api/posts/create-post',
    getPostImage:'/v1/api/files/read-image'
  },

  page: {
    dashboard: "v1/api/ago/admin/",
    userManger: "v1/api/ago/admin/user-manager"
  },

  userManagerHttp:{
    getUser: "v1/api/ago/admin/info",
    update:"v1/api/ago/admin/update-user",
    softDelete: "v1/api/ago/admin/soft-delete",
    getUserDeleted: "v1/api/ago/admin/user-deleted",
    recoverUser:"v1/api/ago/admin/recover-user"
  }


}
