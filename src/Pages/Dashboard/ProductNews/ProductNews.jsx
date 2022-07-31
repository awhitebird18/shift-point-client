import { useState } from "react";

// Styles
import styles from "./ProductNews.module.css";

// Components
import { Divider } from "antd";

import TileLayout from "../TileLayout/TileLayout";
import { Image, Transformation } from "cloudinary-react";

// Functions
import { useFetch } from "../../../Hooks";
import PostDetailed from "./PostDetailed";

const ProductNews = () => {
  const [currentPost, setCurrentPost] = useState();
  const [posts] = useFetch("/productNews");

  return (
    <>
      <TileLayout
        title="Produce News Feed"
        containerStyles={{ maxHeight: "56rem" }}
      >
        <div className={styles.container}>
          {posts?.map((post, index) => {
            return (
              <div key={index}>
                <div
                  className={styles.post}
                  onClick={() => setCurrentPost(post)}
                >
                  <span className={styles.title}>{post.title}</span>

                  <div className={post.type}>
                    <div className={styles.textContainer}>
                      <h3 className={styles.bannerText}>Dev Update #1</h3>
                    </div>
                  </div>

                  <Image
                    cloudName="dwkvw91pm"
                    publicId={post.image}
                    className={styles.image}
                  >
                    <Transformation crop="scale" width="1000" />
                  </Image>
                  <div
                    className={styles.ribbon}
                    style={{ backgroundColor: "#1890ff" }}
                  >
                    NEW FEATURE!
                  </div>
                </div>

                {index !== posts.length - 1 && <Divider />}
              </div>
            );
          })}
        </div>
      </TileLayout>
      {currentPost && (
        <PostDetailed
          currentPost={currentPost}
          setCurrentPost={setCurrentPost}
        />
      )}
    </>
  );
};

export default ProductNews;
