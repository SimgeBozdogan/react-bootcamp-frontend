export function generateRandomUid(): number {
  const chars = "0123456789";
  const uidLength = 8;

  let randomUid = "";
  for (let i = 0; i < uidLength; i++) {
    randomUid += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return parseInt(randomUid, 10);
}
