

import React from 'react'
import classNames from "classnames/bind";
import styles from "./blogList.module.scss";
import HeadBlogList from './HeadBlogList';
import Container from '@/components/Container';
import BodyBlogList from './BodyBlogList';
import BigBlog from '@/components/BigBlog';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const   BlogList = () => {
  return (
     <Container>
        <HeadBlogList/>
        <BodyBlogList/>
        
     </Container>
  )
}

export default BlogList