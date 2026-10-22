import os from "node:os";

/**
 * Next.js blocks dev assets from hosts other than localhost. Allow the machine's
 * LAN addresses so a phone on the same Wi-Fi can load the dev server properly.
 */
const lanOrigins = Object.values(os.networkInterfaces())
  .flat()
  .filter((net) => net && net.family === "IPv4" && !net.internal)
  .map((net) => net.address);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [...lanOrigins, "*.local"],
};

export default nextConfig;
