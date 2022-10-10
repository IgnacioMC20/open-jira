// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// console.log(process.env);

export default function handler(req, res) {
  res.status(200).json({
    name: 'John Doe',
    secret: process.env.secret_key,
    noSecret: process.env.nosecret || "No existe",
  })
}
