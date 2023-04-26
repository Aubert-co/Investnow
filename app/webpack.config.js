const path =require('path')
const HTMLWEBPACK =require('html-webpack-plugin')

module.exports=   {
    //soucemap mapeamento de todos os arquivos
    devtool:'source-map',
    mode: 'development',
    entry :{
        index:'/View/src/',
    },
    performance:{
        hints:false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    output:{
        path:path.resolve('./View/dist'),
        filename:'bundle.js',
        publicPath: '/',
        
    },
      devServer: {
        port:'7000',
        host:'localhost',
        historyApiFallback:true,
  },
module:{
    rules:[
        {
            test:/\.(js|jsx)$/,
            exclude:/node_modules/,
            use:{
                loader:"babel-loader"
            }
        }
    ]
},
plugins:[
    new HTMLWEBPACK({
        template:path.resolve("./view/public/index.html"),
        filename:"./index.html"
    })
]
}