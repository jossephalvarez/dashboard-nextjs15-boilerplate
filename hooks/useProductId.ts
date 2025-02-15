import { useState } from 'react';

export function useProductId() {
  const [value, setValue] = useState<number>(0);

  return { value, setValue };
}
