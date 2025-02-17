import { Button } from "@/components/ui/button";
import { PGF_CONTRACT_CHAIN, PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import useReferral from "@/hooks/app/useReferral";
import {
  useAcrossSDKBuy,
  useAcrossRouteInfo,
} from "@/hooks/contract/useAcrossSDK";
import { getTokenInfo } from "@/hooks/contract/useERC20Contract";
import { getNativeTokenInfo } from "@/hooks/contract/useNativeToken";
import {
  useOutTokenAmountAfterFee,
  usePGFFactoryContractBuy,
} from "@/hooks/contract/usePGFFactoryContract";
import { toast } from "@/hooks/use-toast";
import { PGFToken } from "@/services/contract/types";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import useSound from "use-sound";
import { Address, formatUnits } from "viem";
import { useAccount } from "wagmi";
import { ChainLogo, supportedChains } from "./SwitchChains";
import { TokenAmountInput } from "./TokenAmountInput";
import { CheckIcon } from "@radix-ui/react-icons";
import { TransactionProgress } from "@across-protocol/app-sdk";
import { getChain } from "@/lib/onchain";
import { Toaster } from "@/components/ui/toaster";

const MIN_IN_AMOUNT = 0.01;
export function BuyMemeForm({
  token,
  buyBtnText,
  onSuccess,
}: {
  token: PGFToken;
  buyBtnText?: string;
  onSuccess?: (transactionReceipt: any) => void;
}) {
  const account = useAccount();

  const [tokenInfo, setTokenInfo] = useState<PGFToken>();
  useEffect(() => {
    getTokenInfo({
      contractAddress: token.contractAddress,
      chainId: token.chainId,
      account: account?.address,
    }).then((info) => {
      // console.log("token info", info);
      setTokenInfo(info);
    });
  }, [account]);
  const { referral } = useReferral();

  const [nativeTokenInfo, setNativeTokenInfo] = useState<PGFToken>();
  useEffect(() => {
    getNativeTokenInfo({
      chainId: account?.chainId,
      account: account?.address,
    }).then((info) => {
      setNativeTokenInfo(info);
    });
  }, [account?.chainId, account?.address]);
  // console.log("tokens in buy", nativeTokenInfo, tokenInfo);
  const [inAmount, setInAmount] = useState(0n);
  const [debouncedInAmount] = useDebounce(inAmount, 500);
  const { outAmount } = useOutTokenAmountAfterFee(token, debouncedInAmount);
  const [progress, setProgress] = useState<TransactionProgress | undefined>(
    undefined
  );
  return (
    <div className="flex-col justify-start items-start gap-8 inline-flex w-full">
      <TokenAmountInput
        onChange={(value) => setInAmount(value)}
        minAmount={MIN_IN_AMOUNT}
      />
      <div className="w-full flex flex-col gap-2 justify-start items-start">
        {referral && (
          <div className="w-full text-primary text-center">
            <p>Buy now to receive a 5% reward in tokens!</p>
            <p>Don’t miss out!!!</p>
          </div>
        )}
        {tokenInfo &&
        nativeTokenInfo?.balance &&
        Number(nativeTokenInfo.balance) > MIN_IN_AMOUNT ? (
          account.chainId === PGF_CONTRACT_CHAIN_ID ? (
            <BuyButton
              token={tokenInfo}
              inAmount={inAmount}
              outAmount={outAmount}
              onSuccess={onSuccess}
              buyBtnText={buyBtnText}
              referral={referral}
            />
          ) : (
            <AcrossBuyButton
              token={tokenInfo}
              inAmount={inAmount}
              outAmount={outAmount}
              onSuccess={onSuccess}
              onProgress={(progress) => setProgress(progress)}
              buyBtnText={buyBtnText}
              referral={referral}
            />
          )
        ) : (
          <Button
            size="lg"
            className="w-full"
            onClick={() =>
              showNoticeToast(
                "Insufficient balance, click to switch transaction network"
              )
            }
          >
            {buyBtnText || "Buy"}
          </Button>
        )}
        {nativeTokenInfo?.decimals &&
          nativeTokenInfo?.symbol &&
          tokenInfo?.decimals &&
          tokenInfo?.symbol &&
          inAmount && (
            <div className="text-sm w-full text-center">
              {outAmount
                ? `Buy 
              ${new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(Number(formatUnits(outAmount, tokenInfo.decimals!)))} 
              ${tokenInfo?.symbol} with 
              ${new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(
                Number(formatUnits(inAmount, nativeTokenInfo.decimals))
              )} 
              ${nativeTokenInfo.symbol}`
                : "Fetching Price..."}
            </div>
          )}
        {progress && account.chainId ? (
          <TransactionState
            progress={progress}
            originChainId={account.chainId}
          />
        ) : (
          <div className="text-center">
            <p>
              Supports purchasing memes from Layer 2 networks (OP, Base,
              Arbitrum) and transacting to{" "}
              <span className="font-bold text-primary">mainnet</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const BuyButton = ({
  token,
  inAmount,
  outAmount,
  onSuccess,
  buyBtnText,
  referral,
}: {
  token: PGFToken;
  inAmount: bigint;
  outAmount: bigint | undefined;
  onSuccess?: (transactionReceipt: any) => void;
  buyBtnText?: string;
  referral?: Address;
}) => {
  const account = useAccount();
  const {
    buy,
    transactionReceipt,
    status,
    writeError,
    transationError,
    isPending,
    isSuccess,
  } = usePGFFactoryContractBuy(token);

  const [play] = useSound("/audio/V.mp3");
  const onSubmit = () => {
    if (inAmount && outAmount && account) {
      if (account.chainId === PGF_CONTRACT_CHAIN_ID) {
        buy(inAmount, outAmount, referral);
        play();
      } else {
        if (
          account.chain &&
          supportedChains?.find((chain) => chain.id === account.chain?.id)
        ) {
          console.log("use across to buy from ", account.chain.name);
        } else console.error(account.chain?.name, "is NOT supported yet!");
      }
    }
  };

  useEffect(() => {
    if (isSuccess && transactionReceipt && token) {
      onSuccess?.(transactionReceipt);
      toast({
        title: "Buy Token",
        description: (
          <pre className="m-2 w-80 p-4">
            <p>
              Buy{" "}
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(Number(formatUnits(outAmount!, token.decimals!)))}{" "}
              {token.symbol}
            </p>
            {PGF_CONTRACT_CHAIN?.blockExplorers && (
              <p>
                <a
                  href={`${PGF_CONTRACT_CHAIN.blockExplorers.default.url}/tx/${transactionReceipt.transactionHash}`}
                  target="_blank"
                >
                  View Details
                </a>
              </p>
            )}
          </pre>
        ),
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (writeError || transationError) {
      console.log("Buy token failed", writeError, transationError);
      toast({
        title: "Buy Token",
        variant: "destructive",
        description: (
          <pre className="m-2 w-80 p-4">
            <p>Buy token failed!</p>
            <p>{writeError?.message || transationError?.message}</p>
          </pre>
        ),
      });
    }
  }, [writeError, transationError]);

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={onSubmit}
      disabled={isPending || !inAmount || !outAmount || !account.address}
    >
      {isPending ? "Confirming ..." : buyBtnText || "Buy"}
    </Button>
  );
};

const AcrossBuyButton = ({
  token,
  inAmount,
  outAmount,
  onSuccess,
  onProgress,
  buyBtnText,
  referral,
}: {
  token: PGFToken;
  inAmount: bigint;
  outAmount: bigint | undefined;
  onSuccess?: (transactionReceipt: any) => void;
  onProgress?: (progress: TransactionProgress | undefined) => void;
  buyBtnText?: string;
  referral?: Address;
}) => {
  const account = useAccount();
  const { buy, reset, progress, isPending, isSuccess, transactionReceipt } =
    useAcrossSDKBuy(token);
  useEffect(() => {
    console.log("progress update", progress);
    onProgress?.(progress);
  }, [progress]);

  const { routeInfo, isSupported, limits } = useAcrossRouteInfo(
    account.chainId
  );
  const acrossEnabled =
    limits?.minDeposit &&
    limits?.maxDeposit &&
    inAmount > BigInt(limits.minDeposit) &&
    inAmount < BigInt(limits.maxDeposit);

  const [play] = useSound("/audio/V.mp3");
  const onSubmit = async () => {
    if (inAmount && outAmount && account?.chainId) {
      if (isSupported && routeInfo) {
        console.log("use across to buy from ", account.chain?.name);
        buy(routeInfo, inAmount, referral);
        play();
      } else
        showNoticeToast(
          `${account.chain?.name} is not supported, click to switch transaction network`
        );
    }
  };

  useEffect(() => {
    if (isSuccess && transactionReceipt && token) {
      onSuccess?.(transactionReceipt);
      setTimeout(() => {
        reset();
      }, 10000);
    }
  }, [isSuccess]);

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={onSubmit}
      disabled={
        isPending ||
        !inAmount ||
        !outAmount ||
        !account.address ||
        !acrossEnabled
      }
    >
      {isPending ? "Confirming ..." : buyBtnText || "Buy"}
    </Button>
  );
};

const showNoticeToast = (description: string) => {
  toast({
    title: "Notice",
    variant: "notice",
    description: (
      <div className="m-2 w-80 p-4 flex flex-col gap-6">
        <p className="w-full text-base">{description}</p>
        <img src="/images/switchChainGuide.png" alt="Switch Chain Guide" />
      </div>
    ),
  });
};

const TransactionState = ({
  progress,
  originChainId,
}: {
  progress: TransactionProgress | undefined;
  originChainId: number;
}) => {
  const [description, setDescription] = useState<string | React.ReactNode>();
  useEffect(() => {
    console.log("progress in TransactionState", progress, originChainId);
    let des;
    if (progress?.step && progress?.status) {
      switch (progress.step) {
        case "approve":
          des = "Confirming in your wallet...";
          break;
        case "deposit":
          if (progress.status === "txSuccess") {
            des = (
              <a
                href={`${
                  getChain(originChainId)?.blockExplorers?.default.url
                }/tx/${progress.txReceipt?.transactionHash}`}
              >
                Transaction Completed! Click to view
              </a>
            );
          } else des = "Depositing ...(1/2)";
          break;
        case "fill":
          des = `Filling on ${PGF_CONTRACT_CHAIN.name} ...(2/2)`;
          break;
      }
    } else {
      des = "Preparing transaction...";
    }
    setDescription(des);
  }, [progress]);

  return (
    <div className="w-72 flex flex-col items-center gap-6 font-bold m-6">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <ChainLogo chainId={originChainId} />
          <p>Start</p>
        </div>
        <div className="h-[2px] w-20 bg-primary self-center mb-8" />
        <div className="flex flex-col items-center gap-2">
          <div className="size-8 rounded-full border-2 border-primary flex items-center justify-center">
            {progress?.step === "fill" && <CheckIcon className="size-4" />}
          </div>
          <p>Deposit</p>
        </div>
        <div className="h-[2px] w-20 bg-primary self-center mb-8" />
        <div className="flex flex-col items-center gap-2">
          <ChainLogo chainId={PGF_CONTRACT_CHAIN_ID} />
          <p>Fill</p>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};
