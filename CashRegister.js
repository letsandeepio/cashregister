const DENOMINATIONS = {
  'ONE HUNDRED': 10000,
  TWENTY: 2000,
  TEN: 1000,
  FIVE: 500,
  ONE: 100,
  QUARTER: 50,
  DIME: 10,
  NICKEL: 5,
  PENNY: 1
};

function checkCashRegister(price, cash, cid) {
  let amountToReturn = Math.round((cash - price) * 100);
  let changeToReturn = [];

  let cidToObject = cid.reduce((accumumlator, [change, amount]) => {
    accumumlator[change] = Math.round(amount * 100);
    return accumumlator;
  }, {});

  for (let key in DENOMINATIONS) {
    if (amountToReturn >= DENOMINATIONS[key] && cidToObject[key]) {
      if (amountToReturn >= cidToObject[key]) {
        const takeOutAmount = cidToObject[key];
        amountToReturn -= takeOutAmount;
        changeToReturn.push([key, takeOutAmount / 100]);
        cidToObject[key] = 0;
      } else {
        const takeOutAmount =
          Math.floor(amountToReturn / DENOMINATIONS[key]) * DENOMINATIONS[key];
        amountToReturn -= takeOutAmount;
        changeToReturn.push([key, takeOutAmount / 100]);
        cidToObject[key] -= takeOutAmount;
      }
    }
  }

  if (amountToReturn > 0) {
    return {
      status: 'INSUFFICIENT_FUNDS',
      change: []
    };
  }

  let changeLeftInDrawer = Object.values(cidToObject).reduce(
    (a, b) => a + b,
    0
  );

  if (changeLeftInDrawer > 0) {
    return {
      status: 'OPEN',
      change: changeToReturn
    };
  }

  return { status: 'CLOSED', change: cid };
}
