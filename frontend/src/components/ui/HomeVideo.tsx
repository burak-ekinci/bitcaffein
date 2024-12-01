import { BackgroundVideo } from "./index";

interface SectionProps {
  videoSrc: string;
  children: React.ReactNode;
  className?: string;
}

const HomeVideo: React.FC<SectionProps> = ({
  videoSrc,
  children,
  className,
}) => {
  return (
    <section className={`video-section ${className || ""}`}>
      <BackgroundVideo videoSrc={videoSrc} />
      <div className="content">{children}</div>
    </section>
  );
};

export default HomeVideo;
