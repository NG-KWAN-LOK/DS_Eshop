import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";

// const ArtistLink = ({ audioData, customClass = undefined, children }) => {
//   {
//     return audioData.artist.length === 1 ? (
//       <Link
//         to={PATH.getArtistLink(audioData.artist[0].id)}
//         className={customClass}
//       >
//         {children}
//       </Link>
//     ) : (
//         <AudioLink id={audioData.id} customClass={customClass}>
//           {children}
//         </AudioLink>
//       );
//   }
// };

const GoodsCommentCard = ({ commentData }) => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);
  console.log(commentData);
  return (
    <div className={styles.container}>
      <div className={styles.container_userData}>
        <div className={styles.container_userData_userName}>
          {commentData.userName}
        </div>
      </div>
      <div className={styles.container_commentContainer}>
        <div className={styles.container_commentContainer_content}>
          {commentData.content}
        </div>
      </div>
      <div className={styles.container_otherContainer}>
        <div className={styles.container_otherContainer_date}>
          {commentData.date}
        </div>
      </div>
    </div>
  );
};

export default GoodsCommentCard;
