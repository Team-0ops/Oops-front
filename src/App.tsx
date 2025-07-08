import { useState } from "react";
import PostWrite from "./pages/PostWrite";
import type { OopsPost } from "./types/OopsList";
import { v4 as uuidv4 } from "uuid"; // uuid 설치 필요

function App() {
  const [posts, setPosts] = useState<OopsPost[]>([]);
  const [selectedStep, setSelectedStep] = useState<0 | 1 | 2>(0); // 0:웁스, 1:극복중, 2:극복완료
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  return (
    <PostWrite
      posts={posts}
      setPosts={setPosts}
      selectedStep={selectedStep}
      setSelectedStep={setSelectedStep}
      selectedPostId={selectedPostId}
      setSelectedPostId={setSelectedPostId}
    />
  );
}

export default App;
