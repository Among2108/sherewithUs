import { useCallback, useState } from "react";
import { getErrorMessage } from "../service/api";

export function useAsync(asyncFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null); // ✅ เพิ่ม

  const run = useCallback(
    async (...args) => {
      setLoading(true);
      setError("");
      try {
        const result = await asyncFn(...args);
        setData(result);    // ✅ เก็บ data
        return result;
      } catch (e) {
        const msg = getErrorMessage(e);
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [asyncFn]
  );

  return { run, data, loading, error, setError };
}
