"use client";

import { useState } from "react";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Calculator } from "lucide-react";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [result, setResult] = useState<{
    totalSavings: number;
    yearsToRetirement: number;
    totalContributions: number;
    investmentGrowth: number;
  } | null>(null);

  const calculateRetirement = (e: React.FormEvent) => {
    e.preventDefault();

    const age = parseFloat(currentAge);
    const retAge = parseFloat(retirementAge);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(annualReturn) / 100;

    if (retAge <= age) {
      alert("Retirement age must be greater than current age");
      return;
    }

    const years = retAge - age;
    const months = years * 12;
    const monthlyRate = rate / 12;

    // Future value of current savings
    const futureValueOfSavings = savings * Math.pow(1 + monthlyRate, months);

    // Future value of monthly contributions (annuity)
    const futureValueOfContributions =
      monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const totalSavings = futureValueOfSavings + futureValueOfContributions;
    const totalContributions = savings + monthly * months;
    const investmentGrowth = totalSavings - totalContributions;

    setResult({
      totalSavings,
      yearsToRetirement: years,
      totalContributions,
      investmentGrowth,
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
        <Calculator className="w-6 h-6 text-bitcoin-500" />
        <h2 className="text-2xl font-heading font-bold">Retirement Planning Calculator</h2>
      </div>

      <form onSubmit={calculateRetirement} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="currentAge" className="block text-sm font-medium text-neutral-700 mb-2">
              Current Age
            </label>
            <Input
              id="currentAge"
              type="number"
              placeholder="35"
              value={currentAge}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentAge(e.target.value)}
              required
              min="18"
              max="100"
            />
          </div>

          <div>
            <label htmlFor="retirementAge" className="block text-sm font-medium text-neutral-700 mb-2">
              Retirement Age
            </label>
            <Input
              id="retirementAge"
              type="number"
              placeholder="65"
              value={retirementAge}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRetirementAge(e.target.value)}
              required
              min="18"
              max="100"
            />
          </div>

          <div>
            <label htmlFor="currentSavings" className="block text-sm font-medium text-neutral-700 mb-2">
              Current Savings ($)
            </label>
            <Input
              id="currentSavings"
              type="number"
              placeholder="50000"
              value={currentSavings}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentSavings(e.target.value)}
              required
              min="0"
            />
          </div>

          <div>
            <label htmlFor="monthlyContribution" className="block text-sm font-medium text-neutral-700 mb-2">
              Monthly Contribution ($)
            </label>
            <Input
              id="monthlyContribution"
              type="number"
              placeholder="1000"
              value={monthlyContribution}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonthlyContribution(e.target.value)}
              required
              min="0"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="annualReturn" className="block text-sm font-medium text-neutral-700 mb-2">
              Expected Annual Return (%)
            </label>
            <Input
              id="annualReturn"
              type="number"
              step="0.1"
              placeholder="7"
              value={annualReturn}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnnualReturn(e.target.value)}
              required
              min="0"
              max="30"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Historical stock market average: ~10%, Conservative estimate: 7%
            </p>
          </div>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Calculate
        </Button>
      </form>

      {result && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-heading font-semibold text-bitcoin-600">
            Your Retirement Projection
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-bitcoin-50 border border-bitcoin-200 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-1">Total at Retirement</p>
              <p className="text-3xl font-bold text-bitcoin-600">
                {formatCurrency(result.totalSavings)}
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-1">Years to Retirement</p>
              <p className="text-3xl font-bold text-neutral-900">
                {result.yearsToRetirement} years
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-1">Total Contributions</p>
              <p className="text-2xl font-bold text-neutral-900">
                {formatCurrency(result.totalContributions)}
              </p>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-1">Investment Growth</p>
              <p className="text-2xl font-bold text-success">
                {formatCurrency(result.investmentGrowth)}
              </p>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4 text-sm text-neutral-600">
            <p className="font-semibold mb-2">Important Notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>This is a simplified calculation and doesn't account for inflation</li>
              <li>Actual returns will vary and are not guaranteed</li>
              <li>Consider consulting with a financial advisor for personalized advice</li>
              <li>This is not financial advice</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
