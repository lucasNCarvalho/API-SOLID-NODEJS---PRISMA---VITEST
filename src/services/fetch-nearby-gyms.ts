
import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";


interface FetchNearByGymServiceRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearByGymServiceResponse {
    gyms: Gym[]
}

export class FetchNearByGymService {
    private gymsRepository: GymsRepository

    constructor(gymsRepository: GymsRepository) {
        this.gymsRepository = gymsRepository
    }

    async execute({ userLatitude, userLongitude }: FetchNearByGymServiceRequest): Promise<FetchNearByGymServiceResponse> {

        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return {
            gyms,
        }
    }
}

