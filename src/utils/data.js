/* eslint-disable no-unused-vars */
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

export const allProducts = [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    stocked: '21 jul, 2020',
    avatarUrl: '',
    name: faker.name.fullName(),
    fulfillment: sample(['Pending Reciept', 'Fulfilled', 'Unfulfilled']),
    totalUnits: faker.random.numeric(5),
    profit: faker.random.numeric(5),
    updated: '21 jul, 2020',
    status: sample(['paid', 'unfilled', 'canceled'])
}));

export const allOrders = [...Array(5)].map((_, index) => ({
    id: faker.datatype.uuid(),
    created: '21 jul, 2020',
    avatarUrl: '',
    name: faker.name.fullName(),
    deliverOrder: sample(['Pending Orders', 'Delivered', 'Order Returs']),
    totalUnits: faker.random.numeric(5),
    profit: faker.random.numeric(5),
    updated: '21 jul, 2020',
    reviewStatus: sample(['paid', 'unfilled', 'canceled', 'Returned'])
}));

export const allInvoices = [...Array(10)].map((_, index) => ({
    id: faker.datatype.uuid(),
    date: '21 jul, 2020',
    avatarUrl: '',
    name: faker.name.fullName(),
    total: faker.random.numeric(5),
    balanceDue: faker.random.numeric(5),
    dueDate: '21 jul, 2020',
    status: sample(['Sent', 'Pending Amount', 'Unfulfilled'])
}));

export const offersList = [...Array(15)].map((_, index) => ({
    id: faker.datatype.uuid(),
    staringDate: '21 jul, 2020',
    productName: faker.commerce.product(),
    endingDate: '21 jul, 2020',
    sellingPrice: faker.random.numeric(5),
    totalUnits: faker.random.numeric(5),
    discountPercentage: faker.random.numeric(2),
    discountedPrice: faker.random.numeric(5),
    updated: '21 jul, 2020'
}));

export const outletList = [...Array(5)].map((_, index) => ({
    id: faker.datatype.uuid(),
    outletName: faker.company.name(),
    stocked: '21 jul, 2020',
    avatarUrl: '',
    name: faker.name.fullName(),
    fulfillment: sample(['Pending Reciept', 'Fulfilled', 'Unfulfilled']),
    totalUnits: faker.random.numeric(5),
    paymentDues: faker.random.numeric(5),
    status: sample(['paid', 'unfilled', 'canceled']),
    updated: '21 jul, 2020'
}));

export const categoryList = [...Array(20)].map((_, index) => ({
    id: faker.datatype.uuid(),
    categoryName: faker.commerce.department(),
    subCategory: 'Butter,Milk',
    quantity: faker.random.numeric(2),
    totalUnits: faker.random.numeric(5),
    investment: faker.random.numeric(5),
    status: sample(['available', 'Unavailable', 'Partially Available']),
    updated: '21 jul, 2020'
}));

export const brandList = [...Array(10)].map((_, index) => ({
    id: faker.datatype.uuid(),
    brandName: faker.commerce.department(),
    totalItems: faker.random.numeric(2),
    avatarUrl: '',
    name: faker.name.fullName(),
    fulfillment: sample(['Pending Reciept', 'Fulfilled', 'Unfulfilled']),
    totalUnits: faker.random.numeric(5),
    hotSellingItem: faker.random.numeric(2),
    status: sample(['paid', 'unpaid', 'Partially paid']),
    updated: '21 jul, 2020'
}));

export const areasList = [...Array(20)].map((_, index) => ({
    id: faker.datatype.uuid(),
    totalCity: faker.address.cityName(),
    noOfAreas: faker.random.numeric(3),
    avatarUrl: '',
    name: faker.name.fullName(),
    activeAreas: sample(['Partially Active', 'Active', 'Inactive']),
    totalUnits: faker.random.numeric(5),
    PaymentsDue: faker.random.numeric(4),
    status: sample(['paid', 'unpaid', 'Partially paid']),
    updated: '21 jul, 2020'
}));
