import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { IUserModel } from "../3-models/user-model";
import { Role } from "../3-models/enums";

class Cyber {

    // Secret key: 
    private secretKey = "TheBestVacationSiteInSchool!!";

    private hashingSalt = "TheBestWayToHaveASafePassword!!!";

    public hash(plainText: string): string {
        // Hash with salt: 
        return crypto.createHmac("sha512", this.hashingSalt).update(plainText).digest("hex"); // Returns 128 chars string.
    }

    // Generate new JWT token:
    public generateNewToken(user: IUserModel): string {

        // Create a payload without the password:
        const payload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roleId: user.roleId
        };

        // Expires: 
        const options: SignOptions = { expiresIn: "3h" };

        // Generate: 
        const token = jwt.sign(payload, this.secretKey, options);

        // Return:
        return token;
    }

    // Is token valid: 
    public isTokenValid(token: string): boolean {
        try {
            // If no token: 
            if (!token) return false;

            // Verify token: 
            jwt.verify(token, this.secretKey);

            // Token valid: 
            return true;
        } catch (err: any) { // Token not valid
            return false;
        }
    }

    // Is user admin: 
    public isAdmin(token: string): boolean {
        try {
            // Extract payload from token: 
            const payload = jwt.decode(token) as { roleId: Role };

            // Return true if user is admin, or false if not:
            return payload.roleId === Role.Admin;
        } catch (err: any) {
            return false;
        }
    }

}

export const cyber = new Cyber();
