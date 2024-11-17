import React from 'react';
import ReactPlayer from 'react-player';
import './videoComponent.scss';  // Import file SCSS

const VideoComponent = () => {
  return (
    <div className="video-wrapper">
      <ReactPlayer 
        url="https://www.youtube.com/watch?v=gpl26Fg50zE&list=RDgpl26Fg50zE&start_radio=1"  
        controls={true}  
      />
    </div>
  );
};

export default VideoComponent;
