import { adminRoute } from "./adminRoutes";
import { sellerRoute } from "./sellerRoutes";

export const privateRoutes = [
    ...adminRoute,
    ...sellerRoute
];