var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AbstractHandler = /** @class */ (function () {
    function AbstractHandler() {
    }
    AbstractHandler.prototype.setNext = function (handler) {
        this.nextHandler = handler;
        return handler;
    };
    AbstractHandler.prototype.handle = function (request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    };
    return AbstractHandler;
}());
var BillHandler = /** @class */ (function (_super) {
    __extends(BillHandler, _super);
    function BillHandler(billSize) {
        var _this = _super.call(this) || this;
        _this.billSize = billSize;
        return _this;
    }
    BillHandler.prototype.handle = function (request) {
        var numOfBills = Math.floor(request / this.billSize);
        if (numOfBills > 0) {
            this.ejectBill(numOfBills);
            request = request - this.billSize * numOfBills;
        }
        if (request > 0)
            return _super.prototype.handle.call(this, request);
    };
    BillHandler.prototype.ejectBill = function (numOfBills) {
        console.log(numOfBills + " $" + this.billSize + " bill(s) has been ejected.\n");
    };
    return BillHandler;
}(AbstractHandler));
var ATMWithdrawal = function (handler, amount) {
    handler.handle(amount);
};
var stackof100 = new BillHandler(100);
var stackof50 = new BillHandler(50);
var stackof20 = new BillHandler(20);
var stackof10 = new BillHandler(10);
var stackof5 = new BillHandler(5);
var stackof1 = new BillHandler(1);
stackof100
    .setNext(stackof50)
    .setNext(stackof20)
    .setNext(stackof10)
    .setNext(stackof5)
    .setNext(stackof1);
ATMWithdrawal(stackof100, 186);
