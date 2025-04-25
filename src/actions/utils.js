import * as Crypto from "crypto-js";
import bcrypt from "bcryptjs-react";
import { getAllISOCodes } from "iso-country-currency";

export const hash = async (email, password) => {
  const salt = await bcrypt.genSalt(12);
  const hashDetails = Crypto.AES.encrypt(
    JSON.stringify({
      email,
      password,
    }),
    salt
  );
  localStorage.setItem("_user", hashDetails);
  localStorage.setItem("__user", salt);
};

export const unHash = async () => {
  const _user = localStorage.getItem("_user") ?? "_";
  const __user = localStorage.getItem("__user") ?? "_";
  const cred = Crypto.AES.decrypt(_user, __user);

  if (!Object.is(__user, '_'), !Object.is(_user, '_')) {
    return JSON.parse(cred.toString(Crypto.enc.Utf8) ?? "");
  }
};

function getUserCurrencyCode() {
  try {
    const locale = navigator.language || navigator.languages[0];

    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      currencyDisplay: "symbol"
    });

    const currency = formatter.resolvedOptions().currency;

    return currency;
  } catch (e) {
    console.error("Could not detect currency from locale", e);
    return null;
  }
}


export function convertCurrency(amount) {
  const fromCurrency = "USD"
  const toCurrency = localStorage.getItem("userCurrency");
  const ratesJSON = localStorage.getItem("exchangeRates");

  if (!ratesJSON) {
    console.error("Exchange rates not found in localStorage.");
    return amount;
  }

  let rates;

  try {
    rates = JSON.parse(ratesJSON);
  } catch (e) {
    console.error("Failed to parse exchange rates JSON.", e);
    return amount;
  }

  const fromRateObj = rates.find(rate => rate.code === fromCurrency);
  const toRateObj = rates.find(rate => rate.code === toCurrency);

  if (!fromRateObj || !toRateObj) {
    console.error("Invalid currency code(s).");
    return null;
  }

  const usdAmount = amount / fromRateObj.value;
  const convertedAmount = usdAmount * toRateObj.value;

  return formatCurrency(convertedAmount);
}

function formatCurrency(amount) {
  const defaultCurrency = "USD";
  const fromCurrency = localStorage.getItem("userCurrency") || defaultCurrency;
  const customSymbol = localStorage.getItem("userCurrencySymbol");

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: fromCurrency,
    currencyDisplay: "narrowSymbol",
  });

  const formatted = formatter.format(amount);

  if (customSymbol) {
    const symbol = formatted.replace(/\d|[.,\s]/g, "").trim();
    return formatted.replace(symbol, customSymbol);
  }

  return formatted;
}

export const clear = () => {
  localStorage.setItem("_user", "_");
  localStorage.setItem("__user", "_");
};
