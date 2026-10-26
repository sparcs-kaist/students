import { Injectable } from "@nestjs/common";

import {
  ApiNot001ResponseOk,
  ApiNot002ResponseOk,
  ApiNot003ResponseCreated,
  ApiNot004ResponseOk,
  ApiNot005ResponseOk,
  INoticeRequestCreate,
  INoticeRequestUpdate,
} from "@sparcs-students/interface/api/notice/index";

import { NoticeRepository } from "../repository/notice.repository";

@Injectable()
export class NoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  async getNotices(): Promise<ApiNot001ResponseOk> {
    const notices = await this.noticeRepository.findAll();
    return { notices };
  }

  async getNotice(id: number): Promise<ApiNot002ResponseOk> {
    const notice = await this.noticeRepository.findById(id);
    return { notice };
  }

  async createNotice(
    data: INoticeRequestCreate,
  ): Promise<ApiNot003ResponseCreated> {
    const notice = await this.noticeRepository.create(data);
    return { notice };
  }

  async updateNotice(
    id: number,
    data: INoticeRequestUpdate,
  ): Promise<ApiNot004ResponseOk> {
    const notice = await this.noticeRepository.update(id, data);
    return { notice };
  }

  async deleteNotice(id: number): Promise<ApiNot005ResponseOk> {
    await this.noticeRepository.delete(id);
    return {};
  }
}
