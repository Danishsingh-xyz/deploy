import ToolPage from "@/components/ToolPage";

const RedditVideo = () => (
  <ToolPage
    title="Reddit Video Downloader"
    description="Download Reddit videos (including hosted clips) in MP4"
    platform="Reddit"
    apiPath="/reddit/video"
  />
);

export default RedditVideo;