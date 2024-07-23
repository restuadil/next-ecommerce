import { retrieveData } from "@/lib/firebase/service";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const users = await retrieveData("trip");
    const data = users.map((user) => {
      delete user.password;
      return user;
    });
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "success",
      data: data,
    });
  }
}
