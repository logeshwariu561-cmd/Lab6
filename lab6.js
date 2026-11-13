// 1. Switch to the database
//use retail_db;

// 2. Insert sample sales data
db.sales.insertMany([
  { orderId: 101, product: "Laptop", category: "Electronics", price: 60000, quantity: 2, totalAmount: 120000, date: ISODate("2026-03-10") },
  { orderId: 102, product: "Smartphone", category: "Electronics", price: 25000, quantity: 4, totalAmount: 100000, date: ISODate("2026-03-12") },
  { orderId: 103, product: "T-Shirt", category: "Apparel", price: 800, quantity: 10, totalAmount: 8000, date: ISODate("2026-03-15") },
  { orderId: 104, product: "Jeans", category: "Apparel", price: 2000, quantity: 5, totalAmount: 10000, date: ISODate("2026-03-18") },
  { orderId: 105, product: "Headphones", category: "Electronics", price: 3000, quantity: 5, totalAmount: 15000, date: ISODate("2026-03-20") },
  { orderId: 106, product: "Jacket", category: "Apparel", price: 3500, quantity: 2, totalAmount: 7000, date: ISODate("2026-03-22") }
]);

// 3. Aggregation Pipeline for Business Analytics (Sales Performance by Category)
db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      totalRevenue: { $sum: "$totalAmount" },
      totalQuantitySold: { $sum: "$quantity" },
      avgOrderValue: { $avg: "$totalAmount" }
    }
  },
  {
    $sort: { totalRevenue: -1 }
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      totalRevenue: 1,
      totalQuantitySold: 1,
      avgOrderValue: { $round: ["$avgOrderValue", 2] }
    }
  }
]);