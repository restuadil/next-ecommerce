import { retrieveData, updateData } from "@/lib/firebase/service";

export default async function handler(req, res) {

    if (req.method === "GET") {
        const users = await retrieveData('users');
        const data = users.map((user) => {
            delete user.password
            return user
        });
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "success",
            data: data
        })
    } else if (req.method === "PUT") {
        const { id, data } = req.body
        await updateData("users", id, data, (result) => {
            if (result) {
                res.status(200).json({
                    status: true,
                    statusCode: 200,
                    message: "success",

                })
            } else {
                res.status(400).json({
                    status: false,
                    statusCode: 400,
                    message: "failed",
                })
            }
        })
    }
}