export type Purchase = {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}

export type Customer = {
  id: number
  name: string
  purchases: Purchase[]
}

export const customers: Customer[] = [
  {
    id: 1,
    name: 'Kim Hana',
    purchases: [
      {
        date: '2024-12-28',
        quantity: 1,
        product: 'Noise Cancelling Headphones',
        price: 129000,
        imgSrc: '/images/products/headphones.png',
      },
      {
        date: '2025-01-05',
        quantity: 2,
        product: 'Smart Watch',
        price: 89000,
        imgSrc: '/images/products/watch.png',
      },
      {
        date: '2025-02-14',
        quantity: 1,
        product: 'Bluetooth Speaker',
        price: 59000,
        imgSrc: '/images/products/speaker.png',
      },
    ],
  },
  {
    id: 2,
    name: 'Park Jisu',
    purchases: [
      {
        date: '2024-11-11',
        quantity: 3,
        product: 'Ergonomic Chair',
        price: 149000,
        imgSrc: '/images/products/chair.png',
      },
      {
        date: '2025-03-08',
        quantity: 1,
        product: 'Standing Desk',
        price: 249000,
        imgSrc: '/images/products/desk.png',
      },
      {
        date: '2025-04-01',
        quantity: 2,
        product: 'Desk Lamp',
        price: 39000,
        imgSrc: '/images/products/lamp.png',
      },
    ],
  },
  {
    id: 3,
    name: 'Lee Minho',
    purchases: [
      {
        date: '2025-01-15',
        quantity: 1,
        product: 'Gaming Keyboard',
        price: 99000,
        imgSrc: '/images/products/keyboard.png',
      },
      {
        date: '2025-02-20',
        quantity: 1,
        product: 'Gaming Mouse',
        price: 49000,
        imgSrc: '/images/products/mouse.png',
      },
      {
        date: '2025-05-30',
        quantity: 1,
        product: 'Monitor 27-inch',
        price: 279000,
        imgSrc: '/images/products/monitor.png',
      },
    ],
  },
  {
    id: 4,
    name: 'Choi Yuna',
    purchases: [
      {
        date: '2024-10-02',
        quantity: 2,
        product: 'Coffee Grinder',
        price: 69000,
        imgSrc: '/images/products/grinder.png',
      },
      {
        date: '2025-01-01',
        quantity: 4,
        product: 'Coffee Beans',
        price: 19000,
        imgSrc: '/images/products/beans.png',
      },
      {
        date: '2025-07-18',
        quantity: 1,
        product: 'Espresso Machine',
        price: 399000,
        imgSrc: '/images/products/espresso.png',
      },
    ],
  },
]
