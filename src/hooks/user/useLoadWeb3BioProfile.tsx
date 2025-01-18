import { AsyncRequestStatus } from "@/services/types";
import { getWeb3BioProfile } from "@/services/user/api";
import { Web3BioProfile } from "@/services/user/types";
import { useRef, useState } from "react";

export default function useLoadWeb3BioProfile({
  address,
}: {
  address: string;
}) {
  const [profiles, setProfiles] = useState<Web3BioProfile[]>([]);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const addressRef = useRef(address);

  const idle = status === AsyncRequestStatus.IDLE;
  const pending = status === AsyncRequestStatus.PENDING;

  const loadProfiles = async () => {
    const address = addressRef.current;

    if (!address) {
      setProfiles([]);
      return;
    }
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const resp = await getWeb3BioProfile({
        address,
      });
      const profiles = resp?.data || [];
      // const findAvatarProfile = profiles.find((p) => !!p.avatar);
      // const profile = findAvatarProfile || profiles[0];
      setProfiles(profiles);
      setStatus(AsyncRequestStatus.FULFILLED);
    } catch (err) {
      console.error(err);
      setStatus(AsyncRequestStatus.REJECTED);
    }
  };

  return {
    idle,
    pending,
    profiles,
    loadProfiles,
  };
}
