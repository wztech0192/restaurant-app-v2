const OrderStatus = {
    Draft: 0,
    Pending: 1,
    Accepted: 2,
    Rejected: 3,
    Expired: 4
};

export const AllStatus = [0, 1, 2, 3, 4];
export const OnlyPending = [1];

const _statusMap = Object.entries(OrderStatus).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});

export default OrderStatus;

export const getOrderStatusDisplay = status => _statusMap[status];

export const getStatusChipProps = status => {
    switch (status) {
        case OrderStatus.Pending:
            return {
                color: "primary",
                variant: "outlined"
            };
        case OrderStatus.Accepted:
            return {
                color: "primary",
                variant: "default"
            };
        case OrderStatus.Rejected:
            return {
                color: "secondary",
                variant: "default"
            };
        default:
            return {
                variant: "outlined"
            };
    }
};
