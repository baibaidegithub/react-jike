// 封装高阶组件
// 核心逻辑： 有token 正常跳转 无token 去登陆
import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"

//这个children是props，从route组件传下来的
export default function AuthRoute({children}){
    const token = getToken()
    if(token){
        return <>{children}</>
    }else{
        return <Navigate to={'/login'} replace/>
    }
}

// export function AuthRoute：这是一个命名导出。它允许您从模块导出多个命名实体。导入时，您可以使用花括号语法来导入特定的命名导出：
// 复制代码
// import { AuthRoute } from './AuthRoute';
// export default function AuthRoute：这是默认导出。每个模块只能有一个默认导出，导入时不需要使用大括号。您还可以重命名导入，而无需任何额外的语法：
// 复制代码
// import AuthRoute from './AuthRoute';
// 两者都是完全有效的，但是在其他模块中导入它们的方式不同。您可以根据项目的惯例或个人喜好选择使用哪一种。如果您与团队合作，最好遵循项目的编码标准和一致性。





