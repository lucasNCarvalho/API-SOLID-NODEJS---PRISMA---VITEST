import { UsersRepository } from "@/repositories/users-respository";
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { User } from "@prisma/client";


interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
}

interface ServiceResponse {
    user: User
}

export class RegisterService {
    private usersRepository: UsersRepository

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }

    // to avoid the code above, its possivel to use just like below
    // constructor(private usersRepository:any) {}  

    async execute({ name, email, password }: RegisterServiceRequest): Promise<ServiceResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return {
            user,
        }
    }
}

