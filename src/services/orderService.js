import orders from "@/data/orders.json";

const orderService = {
  async getOrders() {
    // Simulate async fetch
    return Promise.resolve(orders);
  },
};

export default orderService;
