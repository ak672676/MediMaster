import medicineRoutes from "./api/medicine/medicines-routes";
import regRoutes from "./api/register/register-routes";
import userRoutes from "./api/user/user-routes";
import authRoutes from "./api/auth/auth-routes";

export function registerRoutes(app){
    app.use("/api",medicineRoutes);
    app.use("/api",regRoutes);
    app.use("/api",userRoutes);
    app.use("/api",authRoutes);
}