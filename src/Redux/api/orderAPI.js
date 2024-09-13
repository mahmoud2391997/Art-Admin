import axios from "axios";


export const getOrders = async () => {
    try {
        const response = await axios.get("https://art-ecommerce-server.glitch.me/admin/orders", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};


export const getOrder = async (orderId) => {
    try {
        const response = await axios.get(`https://art-ecommerce-server.glitch.me/admin/orders/${orderId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw error;
    }
};


export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const response = await axios.put(
            `https://art-ecommerce-server.glitch.me/admin/orders/${orderId}`,
            newStatus,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};
