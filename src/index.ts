import picgo from 'picgo'


const pluginConfig = ctx => {
  let userConfig = ctx.getConfig('picgo-plugin-dir-prefix')
  if (!userConfig) {
    userConfig = {}
  }
  return [
    {
      name: 'directory',
      type: 'input',
      alias: '文件夹路径',
      default: userConfig.directory || '',
      message: '例如 C:\\blog_pics\\ 要带后缀斜杠',
      required: false
    }
  ]
}

export = (ctx: any) => {
  const register = () => {
    ctx.helper.beforeUploadPlugins.register('dir-prefix', {
      async handle (ctx) {
        let userConfig:any = ctx.getConfig('picgo-plugin-dir-prefix')
        if (!userConfig) {
          userConfig = {
            directory: '',
          }
        }


        for (let i = 0; i < ctx.output.length; i ++) {
          const file = ctx.output[i]
          let origin = ctx.input[i]

          const reg = "^" + userConfig.directory.replace(/\\/g, '\\\\');
          file.fileName = origin.replace(new RegExp(reg),'').replace(/\\/g, "/")
        }
      },
    })
  }
  return {
    register,
    config: pluginConfig,
  }
}
