import { useEffect, useCallback, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";

export default function FrameV2Sdk() {
	const [isSDKLoaded, setIsSDKLoaded] = useState(false);

	useEffect(() => {
		const load = async () => {
			sdk.actions.ready();
		};
		if (sdk && !isSDKLoaded) {
			setIsSDKLoaded(true);
			load();
		}
	}, [isSDKLoaded]);

	return <div id="framev2sdk" />;
}
