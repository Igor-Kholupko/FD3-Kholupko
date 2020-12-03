"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import ShopCatalog from './components/ShopCatalog';

const ShopName = "IShop";
const Products = require("../fixtures/products.json");
const Fields = ['id', 'itemName', 'price', 'photoUrl', 'storehouseQuantity'];
const FieldNames = {
    id: 'ID',
    itemName: 'Name',
    price: 'Price',
    photoUrl: 'Photo URL',
    storehouseQuantity: 'Quantity',
};

ReactDOM.render(
    <ShopCatalog
        shopName={ShopName}
        initialProducts={Products}
        fields={Fields}
        fieldNames={FieldNames}
        canDeleteProducts={true}
    />,
    document.getElementById('main')
);
