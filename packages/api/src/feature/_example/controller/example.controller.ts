import { Controller } from "@nestjs/common";

import { ExampleService } from "../service/example.service";

@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}
}
