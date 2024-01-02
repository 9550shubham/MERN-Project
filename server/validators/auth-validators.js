const { z } = require('zod');

const signUpSchema = z.object({
    username: z
        .string({ required_error: "Username is Required" })
        .trim()
        .min(5, { message: "Username Atleast of 5 chars." })
        .max(15, { message: "Username Not more than 15 chars." }),
    email: z
        .string({ required_error: "Email is Required" })
        .trim()
        // .email()
        .refine(
            (value) => value.endsWith('@thapar.edu'),
            { message: "Enter thapar id" }
        ),
    password: z
        .string()
        .trim()
        .min(8, { message: "Password Atleast of 8 chars." })
        .refine(
            (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]+$/i.test(value),
            { message: 'Password must have capital letter, small letter, digit, special character', }
        ),
});

module.exports = signUpSchema;