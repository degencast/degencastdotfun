import type { Metadata, ResolvingMetadata } from "next";
import { getMeme } from "@/services/meme/api";
import { ApiRespCode } from "@/services/types";
import TokenDetailsPage from "@/components/onchain-futures/trades/TokenDetailsPage";

type Props = {
  params: Promise<{ chain: string; addr: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const addr = (await params).addr;

//   // fetch data
//   try {
//     const resp = await getMeme({
//       address: addr,
//     });
//     const { code, data, msg } = resp.data || {};
//     if (code !== ApiRespCode.SUCCESS) {
//       throw new Error(msg);
//     }

//     const title = `${data.name}  ($${data.symbol})`;
//     const description = data.description || "";
//     const image = data.image || "";
//     return {
//       title: title,
//       description,
//       openGraph: {
//         images: [image],
//       },
//     };
//   } catch (error) {
//     return {
//       title: "Meme Not Found",
//     };
//   }
// }

export default async function MemePage({ params, searchParams }: Props) {
  const chain = (await params).chain;
  const addr = (await params).addr;
  return <TokenDetailsPage chain={chain} addr={addr} />;
}
