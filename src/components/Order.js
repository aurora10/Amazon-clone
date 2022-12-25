import React from "react";
import moment from "moment";
import Currency from "react-currency-formatter";

function Order({ id, amount, amountShipping, items, timestamp, images }) {
  return (
    <div className="relative border rounded-md">
      <div
        className="flex items-center space-x-10 p-5 bg-gray-100
      text-sm text-gray-600"
      >
        <p className="font-bold text-xs">ORDER PLACED </p>
        <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        <div>
          <p className="font-bold text-xs">TOTAL</p>
          <p>
            {" "}
            <Currency quantity={amount} /> - Delivery{" "}
            <Currency quantity={amountShipping} />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.data.length} Items
        </p>

        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-sm whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10 ovrtflow-x-auto">
        <div className="flex space-x-6">
          {images.map((image) => (
            <img src={image} alt="" className="h-20 object-contain sm:h-32" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
