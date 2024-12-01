interface BackgroundVideoProps {
  videoSrc: string; // Video kaynağı
  className?: string; // Ekstra stil sınıfları
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  videoSrc,
  className = "",
}) => {
  return (
    <div className={`background-video-container ${className}`}>
      <video className="background-video" loop muted autoPlay>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
