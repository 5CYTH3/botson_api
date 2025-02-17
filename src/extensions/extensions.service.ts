import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExtensionsDto } from './dto/extensions.dto';

@Injectable({})
export class ExtensionsService {
  constructor(private prisma: PrismaService) {}

  async createExtension(createExtensionDto: ExtensionsDto) {
    try {
      const extensions = await this.prisma.extensions.create({
        data: {
          author: {
            create: {
              name: createExtensionDto.author.name,
              avatarUrl: createExtensionDto.author.avatarUrl,
            },
          },
          version: '1.0.0',
          downloads: 0,
          verified: createExtensionDto.data.verified,
          name: createExtensionDto.data.name,
          description: createExtensionDto.data.description,
          banner: {
            create: {
              name: createExtensionDto.data.banner.name,
              url: createExtensionDto.data.banner.url,
            },
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Returns a promise containing all rows from Extensions table.
   * @return {Promise<any[]>} array of rows from Extensions table.
   */
  async getAllExtensions(): Promise<any[]> {
    return await this.prisma.extensions.findMany({
      include: {
        author: true,
      },
    });
  }

  /**
   * Returns a promise containing the row with the id specified as parameter.
   * @param {string} id of the row
   * @return {Promise<any[]>} array of rows from Extensions table.
   */
  async getExtensionById(id: string): Promise<any> {
    return await this.prisma.extensions.findUnique({
      include: {
        author: true,
      },
      where: {
        id: Number(id),
      },
    });
  }

  async getExtensionCount(): Promise<any> {
    return await this.prisma.extensions.aggregate({
      _count: true,
    });
  }
  /*
    async addChanges(id: string, createChangesDto: ChangesDto) {
        try {
            const changes = await this.prisma.changes.update({
                where: {
                    id: Number(id),
                },
                data: {
                    title: createChangesDto.title,
                    content: createChangesDto.content,
                    version: createChangesDto.version,
                },
            });
        } catch (e) {
            console.log(e);
        }
    }*/
}
