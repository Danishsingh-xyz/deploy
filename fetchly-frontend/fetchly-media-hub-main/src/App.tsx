import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ToolsPage from "./pages/ToolsPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import YouTubeMp4 from "./pages/tools/YouTubeMp4";
import YouTubeMp3 from "./pages/tools/YouTubeMp3";
import YouTubeThumbnail from "./pages/tools/YouTubeThumbnail";
import InstagramReels from "./pages/tools/InstagramReels";
import TwitterVideo from "./pages/tools/TwitterVideo";
import PinterestVideo from "./pages/tools/PinterestVideo";
import FacebookVideo from "./pages/tools/FacebookVideo";
import RedditVideo from "./pages/tools/RedditVideo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/youtube-mp4" element={<YouTubeMp4 />} />
        <Route path="/tools/youtube-mp3" element={<YouTubeMp3 />} />
        <Route path="/tools/youtube-thumbnail" element={<YouTubeThumbnail />} />
        <Route path="/tools/instagram-reel" element={<InstagramReels />} />
        <Route path="/tools/twitter" element={<TwitterVideo />} />
        <Route path="/tools/pinterest" element={<PinterestVideo />} />
        <Route path="/tools/facebook" element={<FacebookVideo />} />
        <Route path="/tools/reddit" element={<RedditVideo />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;