export function shortPubKey(
  key: string,
  ops?: { len?: number; split?: string }
) {
  if (!key) return "";
  const split = ops?.split;
  const len = ops?.len || 4;

  if (split) {
    return key.slice(0, len) + split + key.slice(-len);
  }
  return key.slice(0, len + 2) + "..." + key.slice(-len);
}

export function shortPubKeyHash(hashKey: string) {
  const arr = hashKey.split(":");
  const pubkey = arr.pop();
  if (pubkey) {
    const shortKey = shortPubKey(pubkey);
    arr.push(shortKey);
    return arr.join(":");
  }
  return shortPubKey(hashKey);
}
