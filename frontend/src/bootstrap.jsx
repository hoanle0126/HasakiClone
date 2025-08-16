Array.prototype.sumPrice = function () {
  return this.reduce((sumValue, item) => {
    return sumValue + item.total_price * item.quantity_cart;
  }, 0);
};

Array.prototype.toObject = function () {
  return this.reduce((newObject, item) => {
    newObject[item.label] = item.value;
    return newObject;
  }, {});
};

Number.prototype.formatCurrency = function () {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(this);
};
