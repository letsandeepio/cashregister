interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: number): number;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler;
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  public message: string;
  public handle(request: number): number {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class BillHandler extends AbstractHandler {
  constructor(billSize: number) {
    super();
    this.billSize = billSize;
  }
  billSize: number;
  public handle(request: number): number {
    const numOfBills = Math.floor(request / this.billSize);
    if (numOfBills > 0) {
      this.ejectBill(numOfBills);
      request = request - this.billSize * numOfBills;
    }
    if (request > 0) return super.handle(request);
  }

  private ejectBill(numOfBills: number) {
    console.log(`${numOfBills} $${this.billSize} bill(s) has been ejected.\n`);
  }
}

const ATMWithdrawal = (handler: Handler, amount: number) => {
  handler.handle(amount);
};

const stackof100 = new BillHandler(100);
const stackof50 = new BillHandler(50);
const stackof20 = new BillHandler(20);
const stackof10 = new BillHandler(10);
const stackof5 = new BillHandler(5);
const stackof1 = new BillHandler(1);

stackof100
  .setNext(stackof50)
  .setNext(stackof20)
  .setNext(stackof10)
  .setNext(stackof5)
  .setNext(stackof1);

ATMWithdrawal(stackof100, 186);
