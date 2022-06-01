import { PrismaClient } from "@prisma/client";
import { decorate, injectable } from "inversify";

decorate(injectable(), PrismaClient)

@injectable()
export class PrismaService extends PrismaClient {

}