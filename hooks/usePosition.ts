"use client";

import { useState, useEffect } from "react";
import { Position } from "@/types/Position";

export default () => {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    const geolocation = navigator.geolocation;

    if (!geolocation) {
      setPosition(null);

      return;
    }

    const watcher = geolocation.watchPosition((position) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });

    return () => geolocation.clearWatch(watcher);
  }, []);

  return position;
};
