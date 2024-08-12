
import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";


interface CreateGymRequest {
    title: string
    description?: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymServiceResponse {
    gym: Gym
}

export class CreateGymService {
    private gymsRepository: GymsRepository

    constructor(gymsRepository: GymsRepository) {
        this.gymsRepository = gymsRepository
    }

    async execute({ latitude, longitude, phone, title, description }: CreateGymRequest): Promise<CreateGymServiceResponse> {

        const gym = await this.gymsRepository.create({
            latitude, 
            longitude, 
            phone, 
            title, 
            description
        })

        return {
            gym,
        }
    }
}

