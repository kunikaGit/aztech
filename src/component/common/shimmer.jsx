import { ShimmerCategoryItem, ShimmerPostList } from "react-shimmer-effects";

export const  CardShimmer = () => {
  return <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />
}

export const  CategoryShimmer = () => {
  return (
    <div style={{backgroundColor:'#fff',padding:'20px 20px 0 20px',margin:' 10px',borderRadius:'10px'}}>
    <ShimmerCategoryItem hasImage imageType="circular" imageWidth={100} imageHeight={100} title/>
    </div>
  )
}
