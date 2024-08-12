import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHistoryServiceRequest {
    userId: string
    page: number;
}

interface FetchUserCheckInsHistoryServiceResponse {
    checkIns: CheckIn []
}

export class FetchUserCheckInsHistoryService {
    private checkInsRepository: CheckInsRepository

    constructor(checkInsRepository: CheckInsRepository) {
        this.checkInsRepository = checkInsRepository
    }

    async execute({userId, page}:FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return {
            checkIns 
        }
    }
}