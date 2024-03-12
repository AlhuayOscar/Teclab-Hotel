import mercadopage from "mercadopago";

export const payment = async (req: any, res: any) => {
  try {
    const payment = req.query;
    console.log(payment, req);
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
