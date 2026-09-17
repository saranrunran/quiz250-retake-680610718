import express, { type Request, type Response } from "express";

// import middlewares
import morgan from "morgan";

import users_route from "./routes/usersRoutes";
import items_cart from "./routes/itemsRoutes";

const app = express();
const port = 3000;

// body parser middleware
app.use(express.json());

// logger middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));

// Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Quiz #2 - API service");
});

app.get("/me", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Quiz #2 - API service",
  });
});

app.get("/student", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Student Information",
    data: {
      studentId: "680610718",
      firstName: "Saranporn",
      lastName: "Putsadee",
      section: "001"
    }
  });
});

app.use("/api/v718", users_route);
app.use("/api/v718/cart", items_cart);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// Export app for vercel deployment
export default app;
