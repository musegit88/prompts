// import mongoose from "mongoose"

// let isConnected = false
// export const connectDB = async () => {
//     mongoose.set("strictQuery", true)
//     if (isConnected) {
//         console.log("not connected")
//         return;
//     }
//     try {
//         await mongoose.connect(process.env.MONGO_URL!, {
//             dbName: "prompts",
//         })
//         isConnected = true
//         console.log("connected")
//     } catch (error) {
//         console.log(error)
//     }
// }