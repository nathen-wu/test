import routesContainer from '@/common/components/routesContainer'

//模块part 声明导入
import modulePart1 from "../modulePart/modulePart1/routes"
import modulePart2 from "../modulePart/modulePart2/routes"
import modulePart3 from "../modulePart/modulePart3/routes"
import modulePart4 from "../modulePart/modulePart4/routes"
import modulePart5 from "../modulePart/modulePart5/routes"

const innerRoutes = [
  ...modulePart1,
  ...modulePart2,
  ...modulePart3,
  ...modulePart4,
  ...modulePart5,
];
//导入路由声明
export default [
  {
    path: '/',
    component: routesContainer,
    children: innerRoutes.map((item) => ({
      ...item,
    })
),
},
]
