
import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";


interface SearchGymServiceRequest {
    query: string
    page: number
}

interface SearchGymServiceResponse {
    gyms: Gym[]
}

export class SearchGymService {
    private gymsRepository: GymsRepository

    constructor(gymsRepository: GymsRepository) {
        this.gymsRepository = gymsRepository
    }

    async execute({ query, page }: SearchGymServiceRequest): Promise<SearchGymServiceResponse> {

        const gyms = await this.gymsRepository.searchMany(query, page)

        return {
            gyms,
        }
    }
}

