
import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";


interface FetchNearByGymsServiceRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearByGymsServiceResponse {
    gyms: Gym[]
}

export class FetchNearByGymsService {
    private gymsRepository: GymsRepository

    constructor(gymsRepository: GymsRepository) {
        this.gymsRepository = gymsRepository
    }

    async execute({ userLatitude, userLongitude }: FetchNearByGymsServiceRequest): Promise<FetchNearByGymsServiceResponse > {

        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return {
            gyms,
        }
    }
}

