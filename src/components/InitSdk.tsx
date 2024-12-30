"use client";

import dynamic from "next/dynamic";

const V2Sdk = dynamic(() => import("./FrameV2Sdk"), {
	ssr: false,
});

export default function InitSdk() {
	return (
		<>
			<V2Sdk />
		</>
	);
}
