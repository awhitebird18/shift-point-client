import { useCallback } from "react";

// Components
import { Drawer } from "antd";

const PostDetailed = ({ currentPost, setCurrentPost }) => {
  const onClose = () => {
    setCurrentPost(null);
  };

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = currentPost.article;
  }, []);

  return (
    <Drawer
      title={currentPost.title}
      placement="right"
      closable={true}
      onClose={onClose}
      visible={currentPost}
      key="right"
      size="large"
    >
      <div ref={wrapperRef}></div>
    </Drawer>
  );
};

export default PostDetailed;
