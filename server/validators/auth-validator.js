const {z}=require("zod");

const loginSchema=z.object({
    email: z
    .string({ required_error: "SCET Email is required" })
  .trim()
  .email({ message: "Invalid email format" })
  .regex(/^([a-z]+\.((it|co|ai)\d{2}(d\d+)?|[a-z]+))@scet\.ac\.in$/i, {
    message:
      "Enter a valid SCET email",
  }),
    
     password:z
    .string({required_error:"Password is required"})
   
    .min(6,{message:"Password must be at least 6 characters"})
    .max(1024,{message:"Password can not be greater than 1024  characters"})

    
})

const signupSchema=loginSchema.extend({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be at least 3 char"})
    .max(255,{message:"Name must not be more than 255 characters"}),

  

   
   

   
})

module.exports={signupSchema,loginSchema}