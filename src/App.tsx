import React from "react";
import { EcencyRenderer } from "./lib";
import "./lib/ecency-renderer.scss";

export function App() {
  const demo = [
    [
      "Hive post",
      "Hello world!\n\nhttps://ecency.com/hive/@demo.com/test-post-99405e0b7961e",
    ],
    [
      "Zoom image",
      "This is a test post(updated)(2x)\n\n\n![](https://images.ecency.com/DQmfMNicABD66eAmVM8E15v3z1C2Hw6pyzwHQ79imeLf5vd/img_0290.jpg)\n\nUpdate test(2x)",
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
