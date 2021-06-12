import jwt from "jsonwebtoken"

///generating token for signedin users
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  )
}

////checking authintication before completing the request

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.slice(7, authorization.length) // getting only the token part from Bearer xxxxxx
    jwt.verify(token, process.env.JWT_SECRET || "somethingsecret", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).send({ message: "No Token" })
  }
}

///checking if an admin before accepting admin requests

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send({ message: "Invalid Admin Token" })
  }
}
