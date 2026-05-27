import { client } from "@/tina/__generated__/client";
import HomePageContent from "@/components/home-page-content";

export default async function Home() {
  const [homeData, globalData] = await Promise.all([
    client.queries.home({ relativePath: "home.md" }),
    client.queries.global({ relativePath: "global.md" }),
  ]);
  return <HomePageContent homeData={homeData} globalData={globalData} />;
}
