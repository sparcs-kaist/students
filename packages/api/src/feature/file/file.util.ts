export function getFileKey(file: {
  userId: number;
  signedAt: Date;
  name: string;
}) {
  return `file/${file.userId}.${file.signedAt.valueOf()}.${file.name}`;
}
