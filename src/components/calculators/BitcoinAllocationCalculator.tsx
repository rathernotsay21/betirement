"use client";

import { useState } from "react";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Bitcoin } from "lucide-react";

export default function BitcoinAllocationCalculator() {
  const [portfolioValue, setPortfolioValue] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("moderate");
  const [investmentHorizon, setInvestmentHorizon] = useState("long");
  const [result, setResult] = useState<{
    recommendedAllocation: number;
    bitcoinAmount: number;
    traditionalAmount: number;
    rationale: string;
  } | null>(null);

  const calculateAllocation = (e: React.FormEvent) => {
    e.preventDefault();

    const portfolio = parseFloat(portfolioValue);
    
    // Allocation logic based on risk tolerance and investment horizon
    let allocationPercentage = 0;
    let rationale = "";

    if (riskTolerance === "conservative") {
      allocationPercentage = investmentHorizon === "short" ? 2 : investmentHorizon === "medium" ? 3 : 5;
      rationale = "Conservative investors should maintain a small Bitcoin allocation to limit volatility while still gaining exposure to potential upside.";
    } else if (riskTolerance === "moderate") {
      allocationPercentage = investmentHorizon === "short" ? 5 : investmentHorizon === "medium" ? 10 : 15;
      rationale = "Moderate risk tolerance allows for meaningful Bitcoin exposure while maintaining portfolio stability through diversification.";
    } else {
      allocationPercentage = investmentHorizon === "short" ? 10 : investmentHorizon === "medium" ? 20 : 30;
      rationale = "Aggressive investors with long time horizons can allocate more to Bitcoin, potentially benefiting from its growth while weathering volatility.";
    }

    const bitcoinAmount = portfolio * (allocationPercentage / 100);
    const traditionalAmount = portfolio - bitcoinAmount;

    setResult({
      recommendedAllocation: allocationPercentage,
      bitcoinAmount,
      traditionalAmount,
      rationale,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bitcoin className="w-6 h-6 text-bitcoin-500" />
        <h2 className="text-2xl font-heading font-bold">Bitcoin Allocation Calculator</h2>
      </div>

      <form onSubmit={calculateAllocation} className="space-y-6">
        <div>
          <label htmlFor="portfolioValue" className="block text-sm font-medium text-neutral-700 mb-2">
            Total Portfolio Value ($)
          </label>
          <Input
            id="portfolioValue"
            type="number"
            placeholder="100000"
            value={portfolioValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPortfolioValue(e.target.value)}
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Risk Tolerance
          </label>
          <div className="space-y-2">
            {[
              { value: "conservative", label: "Conservative", desc: "Prefer stability over growth" },
              { value: "moderate", label: "Moderate", desc: "Balance between growth and stability" },
              { value: "aggressive", label: "Aggressive", desc: "Prioritize growth potential" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  riskTolerance === option.value
                    ? "border-bitcoin-500 bg-bitcoin-50"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <input
                  type="radio"
                  name="riskTolerance"
                  value={option.value}
                  checked={riskTolerance === option.value}
                  onChange={(e) => setRiskTolerance(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-neutral-900">{option.label}</p>
                  <p className="text-sm text-neutral-600">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Investment Horizon
          </label>
          <div className="space-y-2">
            {[
              { value: "short", label: "Short-term (1-3 years)", desc: "Need funds relatively soon" },
              { value: "medium", label: "Medium-term (3-7 years)", desc: "Moderate time horizon" },
              { value: "long", label: "Long-term (7+ years)", desc: "Can weather volatility" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  investmentHorizon === option.value
                    ? "border-bitcoin-500 bg-bitcoin-50"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <input
                  type="radio"
                  name="investmentHorizon"
                  value={option.value}
                  checked={investmentHorizon === option.value}
                  onChange={(e) => setInvestmentHorizon(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-neutral-900">{option.label}</p>
                  <p className="text-sm text-neutral-600">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Calculate Allocation
        </Button>
      </form>

      {result && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-heading font-semibold text-bitcoin-600">
            Recommended Allocation
          </h3>

          <div className="bg-bitcoin-50 border-2 border-bitcoin-500 rounded-lg p-6 text-center">
            <p className="text-sm text-neutral-600 mb-2">Bitcoin Allocation</p>
            <p className="text-5xl font-bold text-bitcoin-600 mb-2">
              {result.recommendedAllocation}%
            </p>
            <p className="text-xl font-semibold text-neutral-900">
              {formatCurrency(result.bitcoinAmount)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-1">Bitcoin</p>
              <p className="text-2xl font-bold text-bitcoin-600">
                {formatCurrency(result.bitcoinAmount)}
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                {result.recommendedAllocation}% of portfolio
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-1">Traditional Assets</p>
              <p className="text-2xl font-bold text-neutral-900">
                {formatCurrency(result.traditionalAmount)}
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                {100 - result.recommendedAllocation}% of portfolio
              </p>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="font-semibold text-neutral-900 mb-2">Rationale:</p>
            <p className="text-sm text-neutral-600">{result.rationale}</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-neutral-600">
            <p className="font-semibold mb-2">⚠️ Important Disclaimer:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>This is educational guidance, not financial advice</li>
              <li>Bitcoin is highly volatile and speculative</li>
              <li>Only invest what you can afford to lose</li>
              <li>Consider consulting with a financial advisor</li>
              <li>Past performance doesn't guarantee future results</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
