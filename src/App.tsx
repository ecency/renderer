import React from "react";
import { EcencyRenderer } from "./lib";
import "./lib/ecency-renderer.scss";

export function App() {
  const demo = [
    [
      "Hive post",
      "Hello world!\n\nhttps://ecency.com/hive-125125/@ecency/ecency-year-in-rewiew-2024",
    ],
    [
      "Zoom image",
      "This is a test post(updated)(2x)\n\n\n![](https://images.ecency.com/DQmfMNicABD66eAmVM8E15v3z1C2Hw6pyzwHQ79imeLf5vd/img_0290.jpg)\n\nUpdate test(2x)",
    ],
    [
      "Author",
      "Hello!\n\nUsers: @ecency @demo.com @ecency.waves are top 3 users in a hive community",
    ],
    [
      "Tags",
      "Hello!\n\nTags: #hello #trending #hive #btc are the most popular tags",
    ],
    [
      "Youtube video",
      "Hello!\n\nhttps://www.youtube.com/watch?v=XN5Z88DLB8U\n",
    ],
  ];
  return (
    <div className="storybook">
      {demo.map(([title, post]) => (
        <div key={title}>
          {title}
          <EcencyRenderer pure={true} className="storybook-item" value={post} />
          <EcencyRenderer className="storybook-item" value={post} />
        </div>
      ))}
    </div>
  );
}
