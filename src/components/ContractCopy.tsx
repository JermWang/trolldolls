"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "COMING_SOON";

export default function ContractCopy() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (CONTRACT_ADDRESS === "COMING_SOON") return;
    
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      disabled={CONTRACT_ADDRESS === "COMING_SOON"}
      className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-purple/20 border-2 border-purple text-purple font-bold text-sm rounded-lg hover:bg-purple/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {CONTRACT_ADDRESS === "COMING_SOON" ? "CA coming soon" : `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`}
        </>
      )}
    </button>
  );
}
