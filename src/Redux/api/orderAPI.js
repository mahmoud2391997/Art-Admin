import axios from "axios";

// دالة لجلب جميع الطلبات
export const getOrders = async () => {
    try {
        const response = await axios.get("https://art-ecommerce-server.glitch.me/admin/orders", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNTI2OTE4NywiZXhwIjoxNzI1NTI4Mzg3fQ.AM-MKmkofBTOucmj-9ImCaSATnH0eBWwrgSdCuh_fzA'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

// دالة لجلب طلب محدد باستخدام معرّف الطلب
export const getOrder = async (orderId) => {
    try {
        const response = await axios.get(`https://art-ecommerce-server.glitch.me/admin/orders/${orderId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNTI2OTE4NywiZXhwIjoxNzI1NTI4Mzg3fQ.AM-MKmkofBTOucmj-9ImCaSATnH0eBWwrgSdCuh_fzA'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw error;
    }
};

// دالة لتحديث حالة الطلب
export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const response = await axios.put(
            `https://art-ecommerce-server.glitch.me/admin/orders/${orderId}`,
            newStatus,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNTI2OTE4NywiZXhwIjoxNzI1NTI4Mzg3fQ.AM-MKmkofBTOucmj-9ImCaSATnH0eBWwrgSdCuh_fzA'
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
