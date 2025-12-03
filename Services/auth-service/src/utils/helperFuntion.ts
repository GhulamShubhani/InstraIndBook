export async function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export const getUserAgent = async (meta: any) => {
  const userAgent =
    meta?.userAgent ?? meta?.req?.headers["user-agent"]?.toString() ?? null;
  return userAgent;
};
