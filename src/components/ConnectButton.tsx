"use client";
import { ConnectButton as RainbowkitConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import DefaultUserAvatar from "./user/DefaultUserAvatar";
import { cn } from "@/lib/utils";

type ConnectButtonProps = React.ComponentProps<typeof RainbowkitConnectButton>;

export const ConnectButton = (props: ConnectButtonProps) => {
  return (
    <RainbowkitConnectButton.Custom {...props}>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    className={cn(
                      "bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary text-2xl font-bold px-6 h-[52px]",
                      " max-md:h-[38px] max-md:text-xs max-md:px-2"
                    )}
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    className={cn(
                      "bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary text-2xl font-bold px-6 h-[52px]",
                      " max-md:h-[38px] max-md:text-xs max-md:px-2"
                    )}
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    className={cn(
                      "bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary text-2xl font-bold px-6 h-[52px]",
                      " max-md:h-[38px] max-md:text-xs max-md:px-2"
                    )}
                    onClick={openAccountModal}
                  >
                    {account.ensAvatar ? (
                      <img
                        alt={account.ensAvatar ?? "Ens Avatar"}
                        src={account.ensAvatar}
                        className="size-6 rounded-full"
                      />
                    ) : (
                      <DefaultUserAvatar
                        address={account.address!}
                        className="size-6 rounded-full"
                      />
                    )}
                    {account.displayName}

                    {/* {account.displayBalance ? (
                      <span className="max-md:hidden">
                        ({account.displayBalance})
                      </span>
                    ) : (
                      ""
                    )} */}

                    <ChevronDown />
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowkitConnectButton.Custom>
  );
};
