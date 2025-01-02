import { Injectable } from "@nestjs/common";
import { ExampleRepository } from "../repository/example.repository";

@Injectable()
export class ExampleService {
  constructor(private readonly exampleRepository: ExampleRepository) {}
}
