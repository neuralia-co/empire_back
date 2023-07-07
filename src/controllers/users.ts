import express from "express";
const router = express.Router();
import prisma from "../utils/prisma";


router.post("/", async (req, res) => {
    try {
        const { email,name } = req.body;

        const newUser = await prisma.user.create({
            data: {
                name,
                email
            },
        });

        res.json(newUser);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

router.get("/", async (_req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});


/*router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).end();
    }
});*/

export default router;
