const Admin = require("../model/admi");
exports.getAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(403).json({ message: "Enter email and password" });
      }
  
      const mail = await Admin.query().where({ email }).first();
  
    //   if (user) {
    //     // Compare the provided password with the stored hashed password
    //     const passwordMatch = await bcrypt.compare(password, user.password);
    //     res.send(passwordMatch);
  
    //     if (passwordMatch) {
    //       return res.status(200).json(user);
    //     }
    //     console.log(passwordMatch);
    //   }
  
      return res.status(404).json({ message: "Invalid email or password" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };