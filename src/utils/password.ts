import bcrypt from "bcryptjs"

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}

export const comparePasswords = async (unhashedPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(unhashedPassword, hashedPassword)
}