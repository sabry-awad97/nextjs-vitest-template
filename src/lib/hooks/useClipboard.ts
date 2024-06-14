import { useState } from 'react';

interface ClipboardResult {
  copied: boolean;
  error: Error | null;
  copy: (text: string) => void;
  reset: () => void;
}

interface UseClipboardOptions {
  timeout?: number;
}

const useClipboard = (options: UseClipboardOptions = {}): ClipboardResult => {
  const { timeout = 2000 } = options;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = (text: string) => {
    if (!navigator?.clipboard) {
      setError(new Error('Clipboard not supported'));
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, timeout);
      })
      .catch(err => {
        setError(err);
      });
  };

  const reset = () => {
    setCopied(false);
    setError(null);
  };

  return { copied, error, copy, reset };
};

export default useClipboard;
