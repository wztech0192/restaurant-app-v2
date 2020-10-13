const MANAGER = "MANAGER";
const CUSTOMER = "CUSTOMER";

export const isRoleMatch = (role, EXPECT) => {
    return Boolean(role && role.toUpperCase() === EXPECT);
};

export const isManager = role => isRoleMatch(role, MANAGER);
export const isCustomer = role => isRoleMatch(role, CUSTOMER);
