import { useEffect, useState } from "react";

export default ({
  value,
  delay,
}: {
  value: string | number;
  delay?: number;
}) => {
  const [debouncedValue, setDebouncedValue] = useState<typeof value>(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};
