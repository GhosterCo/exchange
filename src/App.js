import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import s from "./App.module.css";
import SwitchButton from "./switcher/Switcher";
import Header from "./header/Header";
function App() {
  const [rates, setRates] = useState({});
  const [ratesFetched, setRatesFetched] = useState(false);
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [output, setOutput] = useState("");

  const getRates = async () => {
    try {
      const response = await fetch(
        "https://v6.exchangerate-api.com/v6/141de7581bb0e68c7546984d/latest/USD"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }

      const data = await response.json();
      if (data.result === "success") {
        setRates(data.conversion_rates);
        setRatesFetched(true);
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  const calculateOutput = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/141de7581bb0e68c7546984d/latest/${fromCurrency}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }

      const fetchedRates = await response.json();
      const CurrencyRate = fetchedRates.conversion_rates[toCurrency];
      const calculatedOutput = amount * CurrencyRate;
      setOutput(calculatedOutput.toFixed(2));
    } catch (error) {
      console.error("Error calculating output:", error);

      setOutput("");
    }
  };

  const switchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className={s.container}>
      <Header rates={rates} />
      <div className={s.inputAmount}>
        <label>Amount:</label>
        <CurrencyInput
          value={amount}
          onValueChange={(amount) => setAmount(amount)}
          intlConfig={{ locale: "en-US", currency: fromCurrency }}
          allowDecimals={true}
          allowNegativeValue={false}
        />
      </div>

      <div className={s.inputFrom}>
        <label>From:</label>
        <select
          id="from"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option defaultValue>USD</option>
          )}
        </select>
      </div>

      <SwitchButton onClick={switchCurrencies} />
      <div className={s.inputTo}>
        <label>To:</label>
        <select
          id="to"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option defaultValue>EUR</option>
          )}
        </select>
      </div>

      <button className={s.btn} onClick={calculateOutput}>
        Calculate
      </button>

      <div className={s.output}>
        <label>Output: {output}</label>
      </div>
    </div>
  );
}

export default App;
