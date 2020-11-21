const OrderStatus = {
    Draft: 0,
    Pending: 1,
    Approved: 2,
    Rejected: 3,
    Expired: 4
};

const _statusMap = Object.entries(OrderStatus).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});

OrderStatus.getDisplay = status => _statusMap[status];

export default OrderStatus;

export const getStatusChipProps = status => {
    switch (status) {
        case OrderStatus.Pending:
            return {
                color: "primary",
                variant: "outlined"
            };
        case OrderStatus.Approved:
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
