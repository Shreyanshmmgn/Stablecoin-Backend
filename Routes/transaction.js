const User = require("../Models/userDetails");
const fetch = require("node-fetch");

exports.transaction = (req, res, next) => {
  {
    let interval;
    const { invoiceData, invoiceId } = req.body;
    console.log("ivnoice data : ", invoiceData);
    let url = "http://3.108.190.137:8000/api/v1/invoice/" + invoiceId;

    const checkStausOfPament = (url) => {
      fetch(url, {
        method: "GET",
      })
        .then(async (data) => {
          let invoiceData = await data.json();
          console.log(invoiceData);
          if (invoiceData.state == "paid") {
            clearInterval(interval);
            console.log("Payment Success");
            res.status(200).json({
              message: "Payment Sucessfull",
              status: "paid",
            });
          }
          return;
        })
        .catch((e) => {
          clearInterval(interval);
        });

      setTimeout(() => {
        clearInterval(interval);
        res.status(400).json({ message: "Payment Failed" });
      }, 600000); // 10 minutes
    };

    interval = setInterval(() => {
      checkStausOfPament(url);
    }, 5000);
  }
};
// {
//   invoiceData: {
//     currency: 'USDT',
//     items: [ [Object], [Object] ],
//     totalAmount: 2,
//     paidAmount: 0,
//     expires: 1636571800205,
//     created: 1636485400205,
//     wallet: {
//       _id: 'e15fea9f-decc-4f81-ac9e-ea4f8d63653b',
//       address: '0x885E63F6d3F42fF9FCD43D09884AA4393dAd4359',
//       key: '0x8ce3520064341d9e0097cd6671a42d0cd1d4a67f83583dfbf6eddc246eddc24709788e9',
//       created: 1636485400240
//     },
//     state: 'pending',
//     _id: '30f82758-82e8-44a0-99ff-108c8fa3b096',
//     _rev: '1-ea4ecfef7f449ecaa63b55caa2f5940f'
//   },
//   invoiceId: '30f82758-82e8-44a0-99ff-108c8fa3b096'
// }

//---------------------------
// let data = await res.json();
// console.log(data);
// let user = await User.findOne({
//   email: data.email,
// });
// console.log(user);
// if (user) {
//   let newUser = await User.findOneAndUpdate(
//     { email: data.email },
//     {
//       $push: {
//         transactions: {
//           invoiceId: invoiceId,
//           invoiceData: invoiceData,
//         },
//       },
//     }
//   );
//   console.log(newUser);
//   res.status(200).json({
//     message: "Transaction Successful",
//   });
// } else {
//   res.status(404).json({
//     message: "User not found",
//   });
// }
