import { Body, Controller, Get, Param, Post, UsePipes } from "@nestjs/common";

import {
  apiFil001,
  ApiFil001RequestBody,
  ApiFil001ResponseCreated,
  apiFil002,
  ApiFil002RequestParam,
  ApiFil002ResponseOk,
} from "@sparcs-students/interface/api/file/index";

import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import logger from "@sparcs-students/api/common/util/logger";
import { GetUser } from "@sparcs-students/api/common/util/decorators/param-decorator";

import { FileService } from "../service/file.service";

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("files/upload")
  @UsePipes(new ZodPipe(apiFil001))
  async postUploadUrl(
    @GetUser() user: GetUser,
    @Body() body: ApiFil001RequestBody,
  ): Promise<ApiFil001ResponseCreated> {
    const userId = user.id;
    logger.debug(`[getUploadUrl] user id is ${userId}`);

    const files = await this.fileService.getUploadUrl(body.metadata, userId);

    return files;
  }

  @Get("files/:id")
  @UsePipes(new ZodPipe(apiFil002))
  async getDownloadUrl(
    @Param() param: ApiFil002RequestParam,
  ): Promise<ApiFil002ResponseOk> {
    logger.debug(`[getDownloadUrl] file id is ${param.id}`);

    return this.fileService.getDownloadUrl(param.id);
  }
}
