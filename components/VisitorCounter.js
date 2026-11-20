"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let active = true;

    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => {
        if (active) setCount(data.count);
      })
      .catch(() => {
        if (active) setCount(null);
      });

    return () => {
      active = false;
    };
  }, []);

  return <span>오늘 방문자 {count ?? "-"}명</span>;
}
