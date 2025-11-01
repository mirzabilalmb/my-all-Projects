import React from "react";
import ReactDom from "react";

ReactDom.render (
    <div>

        <h1>My favorite Food</h1>
        <ul>
            <li>banana</li>
            <li>biryani</li>
        </ul>
</div>
document.getElementById("root")

);


class OrderProcessor {
  async processOrders() {
    const orders = await Order.findAll(); // ❌ Problem 1: Fetches all orders at once (high memory usage)

    for (const order of orders) {
      const customer = await Customer.findByPk(order.customer_id); // ❌ Problem 2: N+1 query problem (fetching in loop)
      const inventory = await Inventory.findByPk(order.product_id); // ❌ Problem 3: Another N+1 query inside loop

      if (inventory.stock > 0) {
        await inventory.update({ stock: inventory.stock - 1 }); // ❌ Problem 4: Sequential updates (slow)

        await this.sendConfirmationEmail(customer.email); // ❌ Problem 5: Email sending inside loop, blocking execution
      }
    }
  }

  async sendConfirmationEmail(email) {
    // Simulated email sending
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}






// ✅ Optimized Version (Pro Developer Approach)
class OrderProcessor {
  async processOrders() {
    // ✅ Solution 1: Fetch only pending orders and include related data to avoid N+1 queries
    const orders = await Order.findAll({
      where: { status: 'PENDING' },
      include: [Customer, Inventory],
    });

    // ✅ Solution 2: Process orders in parallel using Promise.all for better performance
    await Promise.all(
      orders.map(async (order) => {
        const { Customer: customer, Inventory: inventory } = order;

        if (inventory.stock > 0) {
          // ✅ Solution 3: Use atomic/decrement operation to prevent race conditions
          await inventory.decrement('stock', { by: 1 });

          // ✅ Solution 4: Queue email sending instead of waiting synchronously
          this.queueEmail(customer.email);
        }
      })
    );
  }

  // ✅ Solution 5: Offload email sending to background (non-blocking)
  async queueEmail(email) {
    // Push to message queue like RabbitMQ / BullJS
    console.log(`Queued email for: ${email}`);
  }
}